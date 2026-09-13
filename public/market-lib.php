<?php
/**
 * Shared market-selection logic for market-router.php and market-context.php.
 *
 * Country comes from ONE input only: GEOIP_COUNTRY_CODE, set by Hostinger's
 * mod_geoip at the origin from the connecting address. It is derived by the
 * server, not supplied by the client, so unlike X-Forwarded-For / X-Real-IP /
 * CF-IPCountry it cannot be spoofed by sending a header. Those three are never
 * read here.
 *
 * No IP, city, coordinates, ISP or country history is stored or logged.
 */

// Shared include, not a public endpoint. Requesting it directly returns 404
// rather than an empty 200.
if (isset($_SERVER['SCRIPT_FILENAME'])
    && @realpath($_SERVER['SCRIPT_FILENAME']) === @realpath(__FILE__)) {
    http_response_code(404);
    exit;
}

/** The only markets that may ever appear in a redirect destination. */
const MARKETS = ['en', 'ar-eg', 'ar-sa'];

/** Which markets each country context may resolve to. */
const CONTEXT_MARKETS = [
    'sa'    => ['en', 'ar-sa'],
    'eg'    => ['en', 'ar-eg'],
    'other' => ['en', 'ar-eg', 'ar-sa'],
];

/** Country-scoped preference cookie per context. */
const CONTEXT_COOKIE = [
    'sa'    => 'oraixen_market_sa',
    'eg'    => 'oraixen_market_eg',
    'other' => 'oraixen_market_other',
];

/** The Arabic market for each context, or null where Arabic is not regional. */
const CONTEXT_ARABIC = [
    'sa'    => 'ar-sa',
    'eg'    => 'ar-eg',
    'other' => null,
];

/**
 * Country context from GeoIP. Anything that is not Saudi Arabia or Egypt —
 * including a missing, empty or unexpected value — is 'other'.
 */
function market_country_context(): string
{
    $code = null;
    if (isset($_SERVER['GEOIP_COUNTRY_CODE']) && is_string($_SERVER['GEOIP_COUNTRY_CODE'])) {
        $code = $_SERVER['GEOIP_COUNTRY_CODE'];
    } else {
        $env = getenv('GEOIP_COUNTRY_CODE');
        if (is_string($env) && $env !== '') {
            $code = $env;
        }
    }

    if ($code === null) {
        return 'other';
    }

    $code = strtoupper(trim($code));
    if ($code === 'SA') {
        return 'sa';
    }
    if ($code === 'EG') {
        return 'eg';
    }

    return 'other';
}

/**
 * Does the visitor prefer Arabic over English?
 *
 * Proper RFC 7231 Accept-Language handling: each comma-separated range is split
 * from its q value, q defaults to 1, and q=0 means "not acceptable". Only the
 * two families the site publishes are considered; anything else (fr-FR, de, …)
 * is ignored so it cannot outrank them. Ties fall to the earlier entry, which
 * preserves header order. Arabic wins only when it strictly outranks English.
 *
 * A missing, empty or malformed header yields false — English.
 */
function market_prefers_arabic(?string $header): bool
{
    if ($header === null || trim($header) === '') {
        return false;
    }

    $best = ['ar' => null, 'en' => null];
    $position = 0;

    foreach (explode(',', $header) as $part) {
        $position++;
        $part = trim($part);
        if ($part === '') {
            continue;
        }

        $bits = explode(';', $part);
        $tag = strtolower(trim(array_shift($bits)));
        if ($tag === '') {
            continue;
        }

        // Primary subtag only: 'ar-SA' -> 'ar', 'en-GB' -> 'en'.
        $primary = explode('-', $tag)[0];
        if ($primary !== 'ar' && $primary !== 'en') {
            continue; // A language the site does not publish.
        }

        $q = 1.0;
        foreach ($bits as $bit) {
            $bit = trim($bit);
            if (stripos($bit, 'q=') !== 0) {
                continue;
            }
            $raw = trim(substr($bit, 2));
            // A malformed q is treated as unusable rather than as 1.0.
            if ($raw === '' || !is_numeric($raw)) {
                $q = 0.0;
                break;
            }
            $q = (float) $raw;
        }

        if ($q <= 0) {
            continue; // q=0 means unacceptable.
        }
        if ($q > 1) {
            $q = 1.0;
        }

        // Keep the highest q; on a tie keep the one that appeared first.
        if ($best[$primary] === null || $q > $best[$primary]['q']) {
            $best[$primary] = ['q' => $q, 'pos' => $position];
        }
    }

    if ($best['ar'] === null) {
        return false;
    }
    if ($best['en'] === null) {
        return true;
    }
    if ($best['ar']['q'] === $best['en']['q']) {
        return $best['ar']['pos'] < $best['en']['pos'];
    }

    return $best['ar']['q'] > $best['en']['q'];
}

/**
 * A saved preference for this context, or null.
 *
 * Strictly whitelisted: the value must be one of the markets valid for THIS
 * country, so an Egyptian preference cannot follow a device into Saudi Arabia
 * and nothing arbitrary from a cookie can reach the redirect target.
 */
function market_saved_preference(string $context): ?string
{
    $cookie = CONTEXT_COOKIE[$context];
    if (!isset($_COOKIE[$cookie]) || !is_string($_COOKIE[$cookie])) {
        return null;
    }

    $value = $_COOKIE[$cookie];
    return in_array($value, CONTEXT_MARKETS[$context], true) ? $value : null;
}

/**
 * Market for a locale-less request.
 *
 * Precedence: valid country-scoped preference, then Accept-Language within the
 * markets this country allows, then English.
 */
function market_select(string $context, ?string $acceptLanguage): string
{
    $saved = market_saved_preference($context);
    if ($saved !== null) {
        return $saved;
    }

    $arabic = CONTEXT_ARABIC[$context];
    if ($arabic !== null && market_prefers_arabic($acceptLanguage)) {
        return $arabic;
    }

    return 'en';
}
