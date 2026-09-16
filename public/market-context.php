<?php
/**
 * Country context for the market selector.
 *
 * The selector cannot infer country from the URL — a visitor on /en may be
 * sitting in Cairo or Riyadh — so it asks here once on mount.
 *
 * Returns exactly one field: {"context":"sa"|"eg"|"other"}. No IP, no city, no
 * coordinates, no ISP, no Accept-Language, no identifier. Nothing is stored,
 * logged, or sent anywhere.
 */

require __DIR__ . '/market-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: private, no-store, max-age=0');
header('Pragma: no-cache');

echo json_encode(['context' => market_country_context()]);
