#!/usr/bin/env bash
#
# Oraixen production deployment guards, executed ON the Hostinger server.
#
# The repository is never checked out on Hostinger. The GitHub runner streams
# this file to SSH stdin:
#
#   ssh ... bash -s -- <mode> < scripts/hostinger-deploy.sh
#
# This script NEVER writes to production. It only proves that the target is
# exactly what it claims to be (preflight), reports the shared router's hash
# (parent-hash), and checks the result afterwards (verify). The single write is
# an rsync issued by the GitHub runner straight into the fixed target.
#
# There is no server-side staging directory, no backup directory, no state
# directory and no automatic rollback. A failed deployment fails the workflow;
# recovery is redeploying a corrected commit.
#
# TWO boundaries must hold at all times:
#
#   A. DOMAIN boundary. The SSH account hosts several domains under
#      /home/u396801667/domains/ (georgesalama.com, ghirasalusrah.com,
#      oraixen.com, and possibly more later). Nothing here may read, write or
#      enumerate outside /home/u396801667/domains/oraixen.com.
#
#   B. PROJECT boundary. oraixen.com/public_html hosts many independent
#      projects (chiaka-api, the-box, naseh-api, elsaad-pharmacies, sho5lapp
#      and others). Deployment writes may touch only the oraixen-website
#      directory inside it.
#
# Everything under /home/u396801667/domains/ is treated as non-disposable.
# There is no recursive delete, no broad synchronization, and no wildcard that
# can expand across a domain or a sibling project.
#
# Modes: preflight | parent-hash | verify
#
set -Eeuo pipefail

# ---------------------------------------------------------------------------
# Fixed production constants.
#
# NOT configurable. No secret, variable, workflow input, environment variable,
# command-line argument or current working directory can change these. That is
# the single most important property of this file.
# ---------------------------------------------------------------------------
readonly DOMAIN_ROOT='/home/u396801667/domains/oraixen.com'
readonly PUBLIC_ROOT='/home/u396801667/domains/oraixen.com/public_html'
readonly TARGET='/home/u396801667/domains/oraixen.com/public_html/oraixen-website'

readonly PARENT_HTACCESS="${PUBLIC_ROOT}/.htaccess"

# Proof that TARGET really is the Oraixen application root. Bootstrapped once
# by hand; Actions deliberately never creates it, so a mistyped or recreated
# directory fails closed instead of being silently deployed into.
readonly SENTINEL_NAME='.oraixen-deploy-target'
readonly SENTINEL_CONTENT='oraixen-production-target-v1'
readonly SENTINEL_PATH="${TARGET}/${SENTINEL_NAME}"

# The generator emits 10 routes x 3 markets.
readonly EXPECTED_SHELLS=30
readonly EXPECTED_SHELLS_PER_MARKET=10

log()  { printf '[deploy] %s\n' "$*"; }
fail() { printf '[deploy] ERROR: %s\n' "$*" >&2; exit 1; }

MODE="${1:-}"

if [[ $# -gt 1 ]]; then
  fail 'too many arguments; expected: <mode>'
fi
[[ -n "$MODE" ]] || fail 'mode is required (preflight|parent-hash|verify)'

# ---------------------------------------------------------------------------
# Path guards
# ---------------------------------------------------------------------------

# Resolves a directory physically and prints the result. Symlinks are refused
# outright: a symlinked DOMAIN_ROOT, PUBLIC_ROOT or TARGET could redirect the
# runner's rsync into another domain or another team's project.
resolve_dir() {
  local path="$1" label="$2" resolved
  if [[ ! -e "$path" ]]; then fail "${label} does not exist: ${path}"; fi
  if [[ -L "$path" ]]; then fail "${label} is a symlink, refusing: ${path}"; fi
  if [[ ! -d "$path" ]]; then fail "${label} is not a directory: ${path}"; fi
  resolved="$(cd "$path" 2>/dev/null && pwd -P)" || fail "${label} is not traversable: ${path}"
  printf '%s' "$resolved"
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

# Refuses any symlink anywhere inside TARGET.
#
# TARGET itself is already proven non-symlinked, but a link *inside* it could
# still point at another project or another domain, and rsync writing through
# it would escape the boundary. Nothing in this application needs a symlink, so
# finding one means something unexpected happened: fail closed, report the path,
# and let a human decide. Never follow, delete or repair it automatically.
#
# -P keeps find from following links, so the scan cannot traverse outside
# TARGET. -print -quit stops at the first hit, keeping it cheap.
assert_no_symlinks_in_target() {
  local found
  found="$(find -P "$TARGET" -type l -print -quit)"
  [[ -z "$found" ]] || fail "symlink found inside the production target: ${found}"
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
  # that moved any of them elsewhere fails here, before the runner uploads.
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
  assert_no_symlinks_in_target
}

# ---------------------------------------------------------------------------
# preflight: prove the target, change nothing
# ---------------------------------------------------------------------------
mode_preflight() {
  assert_boundaries
  log "domain root : ${DOMAIN_ROOT}"
  log "public root : ${PUBLIC_ROOT}"
  log "target      : ${TARGET}"
  log 'sentinel    : valid'
  log 'symlinks    : none inside target'
  log 'preflight OK (production untouched)'
}

# ---------------------------------------------------------------------------
# parent-hash: print ONLY the hash, for capture into a workflow step output.
#
# Deliberately the sole stdout line, and deliberately not written to any file on
# the server: no deployment state is stored on Hostinger.
# ---------------------------------------------------------------------------
mode_parent_hash() {
  assert_boundaries >/dev/null
  sha256sum "$PARENT_HTACCESS" | awk '{print $1}'
}

# ---------------------------------------------------------------------------
# verify: structural check of what was just deployed
# ---------------------------------------------------------------------------
mode_verify() {
  assert_boundaries

  local f d
  for f in index.html .htaccess contact.php market-context.php market-lib.php \
           market-router.php sitemap.xml robots.txt; do
    [[ -f "${TARGET}/${f}" ]] || fail "deployed release missing required file: ${f}"
  done

  for d in assets __seo flags; do
    [[ -d "${TARGET}/${d}" ]] || fail "deployed release missing required directory: ${d}"
  done

  [[ -s "${TARGET}/index.html" ]] || fail 'deployed index.html is empty'
  [[ -s "${TARGET}/.htaccess" ]]  || fail 'deployed .htaccess is empty'

  # Third symlink checkpoint: preflight, the inline rsync guard, and here.
  assert_no_symlinks_in_target

  local total
  total="$(find -P "${TARGET}/__seo" -type f -name '*.html' | wc -l | tr -d ' ')"
  [[ "$total" -eq "$EXPECTED_SHELLS" ]] \
    || fail "expected ${EXPECTED_SHELLS} SEO shells, found ${total}"

  local market count
  for market in en ar-eg ar-sa; do
    [[ -d "${TARGET}/__seo/${market}" ]] || fail "missing SEO shell directory: __seo/${market}"
    count="$(find -P "${TARGET}/__seo/${market}" -type f -name '*.html' | wc -l | tr -d ' ')"
    [[ "$count" -eq "$EXPECTED_SHELLS_PER_MARKET" ]] \
      || fail "expected ${EXPECTED_SHELLS_PER_MARKET} shells in __seo/${market}, found ${count}"
    log "__seo/${market}: ${count} shells"
  done

  log "deployed release verified: ${total} localized SEO shells"
  log 'verify OK'
}

case "$MODE" in
  preflight)   mode_preflight ;;
  parent-hash) mode_parent_hash ;;
  verify)      mode_verify ;;
  *) fail "unknown mode: ${MODE} (expected preflight|parent-hash|verify)" ;;
esac
