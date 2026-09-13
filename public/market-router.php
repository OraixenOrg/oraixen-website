<?php
/**
 * Market router for locale-less application URLs.
 *
 * Apache/LiteSpeed invokes this internally for paths with no /en, /ar-eg or
 * /ar-sa prefix. It picks the market from country + saved preference +
 * Accept-Language, then issues a 302 to the same page inside that market.
 *
 * Already-localized URLs never reach here — the URL stays authoritative.
 *
 * 302 (never 301/308): the destination legitimately differs per visitor and
 * changes the moment they pick a market, so it must never be cached as
 * permanent by a browser or an intermediary.
 */

require __DIR__ . '/market-lib.php';

// Per-visitor and cookie-dependent, so never shared-cacheable. Vary is declared
// as well for correctness, but no-store is what actually guarantees safety.
header('Cache-Control: private, no-store, max-age=0');
header('Pragma: no-cache');
header('Vary: Accept-Language, Cookie');

/**
 * The originally requested path, taken from REQUEST_URI so the internal rewrite
 * to this script never leaks into the destination.
 */
function router_requested_path(): string
{
    $uri = isset($_SERVER['REQUEST_URI']) && is_string($_SERVER['REQUEST_URI'])
        ? $_SERVER['REQUEST_URI']
        : '/';

    // Drop the query string; it is re-attached from QUERY_STRING below.
    $path = explode('?', $uri, 2)[0];

    // Defensive: strip CR/LF so nothing can be injected into the Location
    // header, and reject a path that somehow names this script.
    $path = str_replace(["\r", "\n", "\0"], '', $path);

    if ($path === '' || $path[0] !== '/') {
        $path = '/';
    }

    return $path;
}

$path = router_requested_path();

// If a localized or internal path reaches this script, send it to the safe
// default rather than building a doubled prefix.
foreach (MARKETS as $market) {
    if ($path === '/' . $market || strpos($path, '/' . $market . '/') === 0) {
        $path = '/';
        break;
    }
}
if (strpos($path, '/market-') === 0 || strpos($path, '/__seo') === 0) {
    $path = '/';
}

$context = market_country_context();
$market = market_select($context, isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) && is_string($_SERVER['HTTP_ACCEPT_LANGUAGE'])
    ? $_SERVER['HTTP_ACCEPT_LANGUAGE']
    : null);

// Belt and braces: the destination prefix can only ever be a known market id.
if (!in_array($market, MARKETS, true)) {
    $market = 'en';
}

// '/' becomes '/en'; '/about' becomes '/en/about'. No trailing slash is added.
$destination = ($path === '/') ? '/' . $market : '/' . $market . rtrim($path, '/');

$query = isset($_SERVER['QUERY_STRING']) && is_string($_SERVER['QUERY_STRING'])
    ? str_replace(["\r", "\n", "\0"], '', $_SERVER['QUERY_STRING'])
    : '';
if ($query !== '') {
    $destination .= '?' . $query;
}

header('Location: ' . $destination, true, 302);
exit;
