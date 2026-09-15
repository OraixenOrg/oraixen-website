#!/usr/bin/env bash
#
# Public production smoke tests for oraixen.com.
#
# Read-only: every request is a GET or HEAD against public URLs. Nothing here
# writes, deploys or mutates server state, so it is safe to run at any time.
#
# Usage:
#   scripts/production-smoke-test.sh <neighbor-url> [base-url]
#   NEIGHBOR_SMOKE_URL=https://... scripts/production-smoke-test.sh
#
# The neighbor URL belongs to a DIFFERENT project in the shared public_html.
# It is never guessed: an Oraixen deployment that broke the parent router would
# still pass every Oraixen route while taking a sibling project offline, so the
# neighbour check is what actually proves the shared routing survived.
#
# Scope note: this verifies that the origin serves the expected routes. It does
# NOT prove Hostinger CDN edge caches have been invalidated; content freshness
# through the CDN is a separate concern.
#
set -Eeuo pipefail

BASE_URL="${2:-${BASE_URL:-https://oraixen.com}}"
NEIGHBOR_URL="${1:-${NEIGHBOR_SMOKE_URL:-}}"

readonly CONNECT_TIMEOUT=10
readonly MAX_TIME=30
readonly MAX_REDIRS=5

failures=0

pass() { printf '  PASS  %s\n' "$*"; }
bad()  { printf '  FAIL  %s\n' "$*" >&2; failures=$((failures + 1)); }

# Final status code after following redirects.
http_status() {
  curl -sS -o /dev/null -w '%{http_code}' \
    -L --max-redirs "$MAX_REDIRS" \
    --connect-timeout "$CONNECT_TIMEOUT" --max-time "$MAX_TIME" \
    "$1" 2>/dev/null || printf '000'
}

# Status of the FIRST response, without following it.
http_status_no_follow() {
  curl -sS -o /dev/null -w '%{http_code}' \
    --connect-timeout "$CONNECT_TIMEOUT" --max-time "$MAX_TIME" \
    "$1" 2>/dev/null || printf '000'
}

# Location header of the first response.
http_location() {
  curl -sS -o /dev/null -D - \
    --connect-timeout "$CONNECT_TIMEOUT" --max-time "$MAX_TIME" \
    "$1" 2>/dev/null \
    | awk 'BEGIN{IGNORECASE=1} /^location:/ {sub(/^[Ll]ocation:[ \t]*/, ""); gsub(/\r/, ""); print; exit}'
}

expect_200() {
  local url="$1" code
  code="$(http_status "$url")"
  if [[ "$code" == '200' ]]; then pass "200  ${url}"
  else bad "expected 200, got ${code}  ${url}"; fi
}

# Market routing: a locale-less URL must 302 into one of the three markets.
# Which market depends on the caller's GeoIP, so any of the three is accepted.
expect_market_redirect() {
  local url="$1" suffix="$2" code location ok=0 market
  code="$(http_status_no_follow "$url")"
  if [[ "$code" != '302' ]]; then
    bad "expected 302, got ${code}  ${url}"
    return
  fi
  location="$(http_location "$url")"
  for market in en ar-eg ar-sa; do
    # Absolute or relative Location, with an optional trailing slash.
    if [[ "$location" == "/${market}${suffix}" || "$location" == "/${market}${suffix}/" \
       || "$location" == *"/${market}${suffix}" || "$location" == *"/${market}${suffix}/" ]]; then
      ok=1
      break
    fi
  done
  if [[ "$ok" == '1' ]]; then pass "302 -> ${location}  ${url}"
  else bad "302 Location did not target a known market: '${location}'  ${url}"; fi
}

printf 'Oraixen production smoke tests\n'
printf 'base: %s\n\n' "$BASE_URL"

if [[ -z "$NEIGHBOR_URL" ]]; then
  printf 'ERROR: neighbor URL is required (argument 1 or NEIGHBOR_SMOKE_URL).\n' >&2
  printf 'It must be a public URL of another project in the shared public_html.\n' >&2
  exit 2
fi

printf 'Localized market roots\n'
expect_200 "${BASE_URL}/en"
expect_200 "${BASE_URL}/ar-eg"
expect_200 "${BASE_URL}/ar-sa"

printf '\nSolution landing pages\n'
for market in en ar-eg ar-sa; do
  expect_200 "${BASE_URL}/${market}/solutions/custom-business-systems"
  expect_200 "${BASE_URL}/${market}/solutions/real-estate-systems"
done

printf '\nMarket routing redirects\n'
expect_market_redirect "${BASE_URL}/" ''
expect_market_redirect "${BASE_URL}/about" '/about'

printf '\nMarket context endpoint\n'
context_url="${BASE_URL}/market-context.php"
context_code="$(http_status "$context_url")"
if [[ "$context_code" != '200' ]]; then
  bad "expected 200, got ${context_code}  ${context_url}"
else
  context_body="$(curl -sS -L --max-redirs "$MAX_REDIRS" \
    --connect-timeout "$CONNECT_TIMEOUT" --max-time "$MAX_TIME" \
    "$context_url" 2>/dev/null || printf '')"
  # Contract: {"context":"sa"|"eg"|"other"}. Whitespace tolerant; the runner's
  # own country is irrelevant, so no specific market is required.
  if printf '%s' "$context_body" \
     | tr -d ' \t\r\n' \
     | grep -Eq '^\{"context":"(sa|eg|other)"\}$'; then
    pass "200  ${context_url}  ${context_body}"
  else
    bad "unexpected body from ${context_url}: ${context_body}"
  fi
fi

printf '\nNeighboring project (shared public_html routing)\n'
neighbor_code="$(http_status "$NEIGHBOR_URL")"
if [[ "$neighbor_code" =~ ^(2|3)[0-9][0-9]$ ]]; then
  pass "${neighbor_code}  ${NEIGHBOR_URL}"
else
  bad "neighbor unreachable or erroring (HTTP ${neighbor_code})  ${NEIGHBOR_URL}"
fi

printf '\n'
if [[ "$failures" -gt 0 ]]; then
  printf 'SMOKE TESTS FAILED: %s check(s)\n' "$failures" >&2
  exit 1
fi
printf 'All smoke tests passed.\n'
