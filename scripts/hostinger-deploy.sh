#!/usr/bin/env bash
#
# Oraixen production deployment, executed ON the Hostinger server.
#
# The repository is never checked out on Hostinger. The GitHub runner streams
# this file to SSH stdin:
#
#   ssh ... bash -s -- <mode> <sha> <run-id> <run-attempt> < scripts/hostinger-deploy.sh
#
# TWO boundaries must hold at all times:
#
#   A. DOMAIN boundary. The SSH account hosts several domains under
#      /home/u396801667/domains/ (georgesalama.com, ghirasalusrah.com,
#      oraixen.com, and possibly more later). Nothing here may read, write or
#      even enumerate outside /home/u396801667/domains/oraixen.com.
#
#   B. PROJECT boundary. oraixen.com/public_html hosts many independent
#      projects (chiaka-api, the-box, naseh-api, elsaad-pharmacies, sho5lapp
#      and others). Production writes may touch only the oraixen-website
#      directory inside it.
#
# Everything under /home/u396801667/domains/ is treated as non-disposable.
# There is no broad synchronization, no recursive delete, no wildcard that can
# expand across a domain or a sibling project, and no `rm -rf` anywhere.
#
# Modes: preflight | verify-stage | promote | rollback
#
set -Eeuo pipefail

# ---------------------------------------------------------------------------
# Fixed production constants.
#
# These are NOT configurable. No secret, variable, workflow input, environment
# variable, command-line path or current working directory can change where
# this script writes. That is the single most important property of the file.
# ---------------------------------------------------------------------------
readonly DOMAIN_ROOT='/home/u396801667/domains/oraixen.com'
readonly PUBLIC_ROOT='/home/u396801667/domains/oraixen.com/public_html'
readonly TARGET='/home/u396801667/domains/oraixen.com/public_html/oraixen-website'
readonly DEPLOY_ROOT='/home/u396801667/domains/oraixen.com/.oraixen-deploy'

# Trailing slash, used to prove derived release paths stay inside DEPLOY_ROOT.
readonly DEPLOY_PREFIX="${DEPLOY_ROOT}/"

readonly PARENT_HTACCESS="${PUBLIC_ROOT}/.htaccess"

# Proof that TARGET really is the Oraixen application root. Bootstrapped once
# by hand; Actions deliberately never creates it, so a mistyped or recreated
# directory fails closed instead of being silently deployed into.
readonly SENTINEL_NAME='.oraixen-deploy-target'
readonly SENTINEL_CONTENT='oraixen-production-target-v1'
readonly SENTINEL_PATH="${TARGET}/${SENTINEL_NAME}"

# A backup directory existing is NOT proof that it is a usable restore source:
# an rsync that died halfway leaves a partial tree behind. This marker is
# written only after the backup has been checksum-verified against production,
# and it lives in the state directory, never inside the backup tree.
readonly BACKUP_MARKER_CONTENT='oraixen-backup-complete-v1'

# The generator emits 10 routes x 3 markets.
readonly EXPECTED_SHELLS=30
readonly EXPECTED_SHELLS_PER_MARKET=10

log()  { printf '[deploy] %s\n' "$*"; }
fail() { printf '[deploy] ERROR: %s\n' "$*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Argument validation. Only a mode and three release identifiers are accepted.
# No path may ever be passed in.
# ---------------------------------------------------------------------------

MODE="${1:-}"
SHA="${2:-}"
RUN_ID="${3:-}"
RUN_ATTEMPT="${4:-}"

if [[ $# -gt 4 ]]; then
  fail 'too many arguments; expected: <mode> <sha> <run-id> <run-attempt>'
fi

[[ -n "$MODE" ]] || fail 'mode is required (preflight|verify-stage|promote|rollback)'

# Strict formats, enforced BEFORE any path is derived. These character classes
# exclude "/" and ".." by construction, so a release id cannot traverse.
[[ "$SHA" =~ ^[0-9a-f]{40}$ ]]   || fail 'SHA must be exactly 40 lowercase hex characters'
[[ "$RUN_ID" =~ ^[0-9]+$ ]]      || fail 'run id must be digits only'
[[ "$RUN_ATTEMPT" =~ ^[0-9]+$ ]] || fail 'run attempt must be digits only'

readonly RELEASE_ID="${SHA}-${RUN_ID}-${RUN_ATTEMPT}"
readonly STAGE_DIR="${DEPLOY_ROOT}/staging/${RELEASE_ID}"
readonly BACKUP_DIR="${DEPLOY_ROOT}/backups/${RELEASE_ID}"
readonly STATE_DIR="${DEPLOY_ROOT}/state/${RELEASE_ID}"
readonly PARENT_HASH_FILE="${STATE_DIR}/parent-htaccess.sha256"
readonly BACKUP_MARKER_FILE="${STATE_DIR}/backup-complete"

# ---------------------------------------------------------------------------
# Path guards
# ---------------------------------------------------------------------------

# Resolves a directory physically and prints the result. Symlinks are refused
# outright: a symlinked DOMAIN_ROOT, PUBLIC_ROOT or TARGET could redirect a
# --delete into another domain or another team's project.
resolve_dir() {
  local path="$1" label="$2" resolved
  if [[ ! -e "$path" ]]; then fail "${label} does not exist: ${path}"; fi
  if [[ -L "$path" ]]; then fail "${label} is a symlink, refusing: ${path}"; fi
  if [[ ! -d "$path" ]]; then fail "${label} is not a directory: ${path}"; fi
  resolved="$(cd "$path" 2>/dev/null && pwd -P)" || fail "${label} is not traversable: ${path}"
  printf '%s' "$resolved"
}

# Domain and project containment, re-verified at the start of every mode.
assert_boundaries() {
  command -v rsync     >/dev/null 2>&1 || fail 'rsync not found on the server'
  command -v sha256sum >/dev/null 2>&1 || fail 'sha256sum not found on the server'

  local domain_real public_real target_real
  domain_real="$(resolve_dir "$DOMAIN_ROOT" 'domain root')" || exit 1
  public_real="$(resolve_dir "$PUBLIC_ROOT" 'public root')" || exit 1
  target_real="$(resolve_dir "$TARGET" 'production target')" || exit 1

  # Physical paths must equal the constants exactly. A mount, bind or symlink
  # that moved any of them elsewhere fails here, before any write.
  [[ "$domain_real" == "$DOMAIN_ROOT" ]] || fail "domain root resolves elsewhere: ${domain_real}"
  [[ "$public_real" == "$PUBLIC_ROOT" ]] || fail "public root resolves elsewhere: ${public_real}"
  [[ "$target_real" == "$TARGET" ]]      || fail "production target resolves elsewhere: ${target_real}"

  # DOMAIN containment: the public root must sit directly inside the Oraixen
  # domain, so nothing can reach a sibling domain.
  [[ "$(dirname "$public_real")" == "$domain_real" ]] \
    || fail 'public root is not directly inside the Oraixen domain'

  # PROJECT containment: the target must be the oraixen-website directory
  # directly inside that public root, and never the root itself.
  [[ "$(dirname "$target_real")" == "$public_real" ]] \
    || fail 'production target is not directly inside public_html'
  [[ "$(basename "$target_real")" == 'oraixen-website' ]] \
    || fail 'production target basename is not oraixen-website'
  [[ "$target_real" != "$public_real" ]] || fail 'target equals public_html, refusing'
  [[ "$target_real" != "$domain_real" ]] || fail 'target equals domain root, refusing'

  [[ -w "$TARGET" ]] || fail "production target is not writable: ${TARGET}"

  if [[ -L "$PARENT_HTACCESS" ]]; then fail 'parent router is a symlink, refusing'; fi
  [[ -f "$PARENT_HTACCESS" ]] || fail "parent router missing or not a regular file: ${PARENT_HTACCESS}"

  assert_sentinel
}

# DEPLOY_ROOT must be a direct child of the Oraixen domain, never under $HOME,
# never under /home/u396801667/domains, never inside public_html or a sibling.
assert_deploy_root_location() {
  [[ "$(dirname "$DEPLOY_ROOT")" == "$DOMAIN_ROOT" ]] \
    || fail 'deploy root is not directly inside the Oraixen domain'
  [[ "$DEPLOY_ROOT" != "$PUBLIC_ROOT" ]] || fail 'deploy root equals public_html, refusing'
  [[ "$DEPLOY_ROOT" != "$DOMAIN_ROOT" ]] || fail 'deploy root equals domain root, refusing'
}

# Called once DEPLOY_ROOT is expected to exist.
assert_deploy_root_real() {
  local real
  real="$(resolve_dir "$DEPLOY_ROOT" 'deploy root')" || exit 1
  [[ "$real" == "$DEPLOY_ROOT" ]] || fail "deploy root resolves elsewhere: ${real}"
}

# Every derived release path must live strictly under DEPLOY_ROOT and must not
# collide with any production constant. Belt and braces: the release id format
# already forbids "/" and "..", but concatenation alone is not trusted.
assert_release_paths_contained() {
  local p
  for p in "$STAGE_DIR" "$BACKUP_DIR" "$STATE_DIR"; do
    [[ "$p" == "${DEPLOY_PREFIX}"* ]] || fail "derived path escapes the deploy root: ${p}"
    [[ "$p" != *'..'* ]]              || fail "derived path contains '..': ${p}"
    [[ "$p" != "$DEPLOY_ROOT" ]]      || fail "derived path equals the deploy root: ${p}"
    [[ "$p" != "$DOMAIN_ROOT" ]]      || fail "derived path equals the domain root: ${p}"
    [[ "$p" != "$PUBLIC_ROOT" ]]      || fail "derived path equals public_html: ${p}"
    [[ "$p" != "$TARGET" ]]           || fail "derived path equals the production target: ${p}"
  done
}

assert_sentinel() {
  [[ -e "$SENTINEL_PATH" ]] \
    || fail "deployment sentinel missing: ${SENTINEL_PATH} (one-time manual bootstrap required)"
  if [[ -L "$SENTINEL_PATH" ]]; then fail "deployment sentinel is a symlink: ${SENTINEL_PATH}"; fi
  [[ -f "$SENTINEL_PATH" ]] || fail "deployment sentinel is not a regular file: ${SENTINEL_PATH}"
  local actual
  actual="$(cat "$SENTINEL_PATH")" || fail "cannot read deployment sentinel: ${SENTINEL_PATH}"
  [[ "$actual" == "$SENTINEL_CONTENT" ]] \
    || fail 'deployment sentinel content does not match the expected value'
}

# Guards shared by every mode, in a fixed order.
common_guards() {
  assert_boundaries
  assert_deploy_root_location
  assert_release_paths_contained
}

# ---------------------------------------------------------------------------
# Parent router protection
# ---------------------------------------------------------------------------

parent_hash() {
  sha256sum "$PARENT_HTACCESS" | awk '{print $1}'
}

# Compares the live shared router against the hash captured at preflight.
# Detects a concurrent or accidental edit by an administrator or another
# project's deployment.
assert_parent_unchanged() {
  local when="$1" expected actual
  [[ -f "$PARENT_HASH_FILE" ]] \
    || fail "parent router hash snapshot missing (preflight did not run for ${RELEASE_ID})"
  expected="$(cat "$PARENT_HASH_FILE")"
  actual="$(parent_hash)"
  [[ "$actual" == "$expected" ]] \
    || fail "parent router changed since preflight (${when}); aborting without further writes"
  log "parent router unchanged (${when})"
}

# ---------------------------------------------------------------------------
# Tree comparison and backup marker
# ---------------------------------------------------------------------------

# Read-only checksum dry run. Any itemized line means the trees diverge.
# -n makes this incapable of modifying anything despite --delete.
assert_trees_match() {
  local src="$1" dst="$2" label="$3" diff_out
  diff_out="$(rsync -rlpogtcn --delete --itemize-changes \
    --exclude="${SENTINEL_NAME}" "${src}/" "${dst}/")" \
    || fail "${label}: comparison command failed"
  if [[ -n "$diff_out" ]]; then
    printf '%s\n' "$diff_out" | head -n 20 >&2
    fail "${label}: trees do not match"
  fi
  log "${label}: trees match (checksum comparison clean)"
}

# Returns 0 only for a present, regular, non-symlink marker with exact content.
backup_marker_valid() {
  [[ -e "$BACKUP_MARKER_FILE" ]] || return 1
  if [[ -L "$BACKUP_MARKER_FILE" ]]; then return 1; fi
  [[ -f "$BACKUP_MARKER_FILE" ]] || return 1
  local actual
  actual="$(cat "$BACKUP_MARKER_FILE" 2>/dev/null)" || return 1
  [[ "$actual" == "$BACKUP_MARKER_CONTENT" ]] || return 1
  return 0
}

# ---------------------------------------------------------------------------
# preflight
# ---------------------------------------------------------------------------
mode_preflight() {
  common_guards

  # DEPLOY_ROOT may not exist yet; its location was already proven safe.
  mkdir -p "$DEPLOY_ROOT"
  assert_deploy_root_real

  mkdir -p "${DEPLOY_ROOT}/staging" "${DEPLOY_ROOT}/backups" "${DEPLOY_ROOT}/state"

  # A rerun must not reuse a half-finished stage or clobber an existing backup.
  # Written as `if` rather than `[[ ... ]] && fail`, which returns 1 when the
  # test is false and would abort under `set -e` if it ever became the last
  # statement in a function.
  if [[ -e "$STAGE_DIR" ]]; then fail "stage already exists for this release: ${STAGE_DIR}"; fi
  if [[ -e "$BACKUP_DIR" ]]; then fail "backup already exists for this release: ${BACKUP_DIR}"; fi
  if [[ -e "$BACKUP_MARKER_FILE" ]]; then fail "backup marker already exists for this release: ${BACKUP_MARKER_FILE}"; fi

  mkdir -p "$STAGE_DIR" "$STATE_DIR"

  parent_hash > "$PARENT_HASH_FILE"

  log "release id     : ${RELEASE_ID}"
  log "domain root    : ${DOMAIN_ROOT}"
  log "target         : ${TARGET}"
  log "stage          : ${STAGE_DIR}"
  log "backup (later) : ${BACKUP_DIR}"
  log "state          : ${STATE_DIR}"
  log "parent hash    : $(cat "$PARENT_HASH_FILE")"
  log 'preflight OK (production untouched)'
}

# ---------------------------------------------------------------------------
# verify-stage
# ---------------------------------------------------------------------------
mode_verify_stage() {
  common_guards
  assert_deploy_root_real

  [[ -d "$STAGE_DIR" ]] || fail "stage directory missing: ${STAGE_DIR}"

  local f d
  for f in index.html .htaccess contact.php market-context.php market-lib.php \
           market-router.php sitemap.xml robots.txt; do
    [[ -f "${STAGE_DIR}/${f}" ]] || fail "staged release missing required file: ${f}"
  done

  for d in assets __seo flags; do
    [[ -d "${STAGE_DIR}/${d}" ]] || fail "staged release missing required directory: ${d}"
  done

  [[ -s "${STAGE_DIR}/index.html" ]] || fail 'staged index.html is empty'
  [[ -s "${STAGE_DIR}/.htaccess" ]]  || fail 'staged .htaccess is empty'

  # A symlink in the staged tree could escape the target during promotion.
  local links
  links="$(find "$STAGE_DIR" -type l | head -n 5)"
  [[ -z "$links" ]] || fail "staged release contains symlinks: ${links}"

  local total
  total="$(find "${STAGE_DIR}/__seo" -type f -name '*.html' | wc -l | tr -d ' ')"
  [[ "$total" -eq "$EXPECTED_SHELLS" ]] \
    || fail "expected ${EXPECTED_SHELLS} SEO shells, found ${total}"

  local market count
  for market in en ar-eg ar-sa; do
    [[ -d "${STAGE_DIR}/__seo/${market}" ]] || fail "missing SEO shell directory: __seo/${market}"
    count="$(find "${STAGE_DIR}/__seo/${market}" -type f -name '*.html' | wc -l | tr -d ' ')"
    [[ "$count" -eq "$EXPECTED_SHELLS_PER_MARKET" ]] \
      || fail "expected ${EXPECTED_SHELLS_PER_MARKET} shells in __seo/${market}, found ${count}"
    log "__seo/${market}: ${count} shells"
  done

  log "staged release verified: ${total} localized SEO shells"
  log 'verify-stage OK (production untouched)'
}

# ---------------------------------------------------------------------------
# promote
# ---------------------------------------------------------------------------
mode_promote() {
  common_guards
  assert_deploy_root_real

  [[ -d "$STAGE_DIR" ]] || fail "stage directory missing: ${STAGE_DIR}"
  [[ -d "$STATE_DIR" ]] || fail "state directory missing: ${STATE_DIR}"

  # CHECK 1: before the backup, so a changed shared router aborts while
  # production is still completely untouched.
  assert_parent_unchanged 'before backup'

  if [[ -e "$BACKUP_DIR" ]]; then fail "backup already exists: ${BACKUP_DIR}"; fi
  if [[ -e "$BACKUP_MARKER_FILE" ]]; then fail "backup marker already exists: ${BACKUP_MARKER_FILE}"; fi

  mkdir -p "$BACKUP_DIR" || fail 'could not create backup directory; not promoting'

  # No --delete: the backup directory was just created empty. The sentinel is
  # excluded so a later restore can never rewrite it.
  log "backing up current target -> ${BACKUP_DIR}"
  rsync -a --exclude="${SENTINEL_NAME}" "${TARGET}/" "${BACKUP_DIR}/" \
    || fail 'backup rsync failed; not promoting (partial backup kept for inspection)'

  # A backup is only a restore source once it provably matches production.
  assert_trees_match "$TARGET" "$BACKUP_DIR" 'backup verification'

  # Marker written ONLY after verification, and outside the backup tree.
  printf '%s\n' "$BACKUP_MARKER_CONTENT" > "$BACKUP_MARKER_FILE" \
    || fail 'could not write backup-complete marker; not promoting'
  log "backup verified and marked complete: ${BACKUP_MARKER_FILE}"

  # CHECK 2: the backup takes time, during which an administrator could have
  # edited the shared router. Re-check immediately before the only destructive
  # production write.
  assert_parent_unchanged 'after backup, before promotion'

  # The single destructive production write in this script.
  #
  # --delete-delay is safe here because TARGET is a hardcoded constant proven
  # to be a real, non-symlinked directory named oraixen-website sitting
  # directly inside the verified public root of the verified Oraixen domain.
  # Both operands are exact paths with trailing slashes, so rsync cannot ascend
  # to public_html, reach a sibling project, or cross into another domain.
  log "promoting ${STAGE_DIR} -> ${TARGET}"
  rsync -a --delete-delay --exclude="${SENTINEL_NAME}" "${STAGE_DIR}/" "${TARGET}/" \
    || fail 'promotion rsync failed'

  assert_sentinel

  # CHECK 3: after promotion.
  assert_parent_unchanged 'after promotion'

  local f
  for f in index.html .htaccess contact.php market-context.php market-lib.php \
           market-router.php sitemap.xml robots.txt; do
    [[ -f "${TARGET}/${f}" ]] || fail "post-promotion check failed, missing: ${f}"
  done

  assert_trees_match "$STAGE_DIR" "$TARGET" 'promotion verification'
  log 'promotion OK'
}

# ---------------------------------------------------------------------------
# rollback
# ---------------------------------------------------------------------------
mode_rollback() {
  common_guards
  assert_deploy_root_real

  # CASE A: promotion failed before the backup existed. Production was never
  # modified, so there is nothing to restore and nothing to report as an error.
  if [[ ! -d "$BACKUP_DIR" ]]; then
    log "no rollback backup available for ${RELEASE_ID}; production was not modified"
    log 'rollback not required'
    return 0
  fi

  # CASE B: a directory exists but was never verified. It may hold a partial
  # copy of production, so restoring it could destroy live files. Refuse, keep
  # it for inspection, and fail loudly.
  if ! backup_marker_valid; then
    printf '[deploy] ERROR: rollback backup is incomplete or unverified: %s\n' "$BACKUP_DIR" >&2
    printf '[deploy] ERROR: missing or invalid marker: %s\n' "$BACKUP_MARKER_FILE" >&2
    printf '[deploy] ERROR: refusing to restore; production target left untouched\n' >&2
    exit 1
  fi

  # CASE C: verified backup. Confirm the shared router has not changed before
  # touching anything, so automation never runs while routing is being edited.
  assert_parent_unchanged 'before rollback'

  log "restoring ${BACKUP_DIR} -> ${TARGET}"
  # Same constraints as promotion: deletion confined to the verified TARGET,
  # sentinel excluded so it survives the restore.
  rsync -a --delete-delay --exclude="${SENTINEL_NAME}" "${BACKUP_DIR}/" "${TARGET}/" \
    || fail 'rollback rsync failed'

  assert_sentinel
  assert_parent_unchanged 'after rollback'
  assert_trees_match "$BACKUP_DIR" "$TARGET" 'rollback verification'
  log 'rollback OK'
}

case "$MODE" in
  preflight)    mode_preflight ;;
  verify-stage) mode_verify_stage ;;
  promote)      mode_promote ;;
  rollback)     mode_rollback ;;
  *) fail "unknown mode: ${MODE} (expected preflight|verify-stage|promote|rollback)" ;;
esac
