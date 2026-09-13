import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_MARKET,
  MARKETS,
  MARKET_LOCALES,
  SITE_URL,
  applyLocalePrefix,
  buildAbsoluteUrl,
  getMarketConfig,
  parseMarketFromPath,
  type MarketLocale,
} from '../lib/marketLocale';

interface SeoProps {
  /** Full, already-localized <title> string. */
  title: string;
  /** Meta description / og:description / twitter:description. */
  description?: string;
  /** In-app route override (no market prefix); defaults to the current route. */
  path?: string;
  /** Absolute og:image URL override. */
  image?: string;
}

/**
 * Active market for this page load. The router basename never changes without a
 * full navigation, so this is stable for the lifetime of the document.
 */
const ACTIVE_MARKET: MarketLocale =
  parseMarketFromPath(typeof window === 'undefined' ? '/' : window.location.pathname) ?? DEFAULT_MARKET;

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * There are four alternate links, so they must be matched on rel AND hreflang —
 * selecting on rel alone would keep overwriting the same one.
 */
function upsertAlternate(hreflang: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  );
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** og:locale:alternate legitimately repeats, so this reconciles the exact set. */
function syncLocaleAlternates(values: string[]): void {
  const existing = Array.from(
    document.head.querySelectorAll<HTMLMetaElement>('meta[property="og:locale:alternate"]')
  );

  values.forEach((value, i) => {
    let el = existing[i];
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', 'og:locale:alternate');
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  });

  // Drop any leftovers from a previous render with more alternates.
  existing.slice(values.length).forEach((el) => el.remove());
}

/**
 * Per-route, per-market SEO. This is a single-page app, so the static tags in the
 * served shell never change as you navigate — this component keeps the title,
 * description, canonical, hreflang set and Open Graph / Twitter tags in sync with
 * the active route AND the active market (/en, /ar-eg, /ar-sa). Renders nothing.
 */
export function Seo({ title, description, path, image }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    // useLocation() is relative to the router basename, so re-apply the prefix
    // to get the real public path (e.g. /ar-sa/projects/order-fs).
    const route = path ?? pathname;
    const url = buildAbsoluteUrl(applyLocalePrefix(route, ACTIVE_MARKET));
    const { ogLocale } = getMarketConfig(ACTIVE_MARKET);

    document.title = title;
    upsertMeta('name', 'title', title);
    upsertMeta('property', 'og:title', title);
    upsertMeta('name', 'twitter:title', title);

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }

    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:url', url);
    upsertMeta('property', 'og:locale', ogLocale);
    syncLocaleAlternates(
      MARKET_LOCALES.filter((l) => l !== ACTIVE_MARKET).map((l) => MARKETS[l].ogLocale)
    );

    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }

    upsertLink('canonical', url);

    // Equivalent URLs in every market, plus x-default. The homepage's x-default
    // is the bare origin, which becomes the market-selecting entry point.
    const isHome = applyLocalePrefix(route, 'en') === MARKETS.en.prefix;
    for (const locale of MARKET_LOCALES) {
      upsertAlternate(
        MARKETS[locale].hreflang,
        buildAbsoluteUrl(applyLocalePrefix(route, locale))
      );
    }
    upsertAlternate(
      'x-default',
      isHome ? `${SITE_URL}/` : buildAbsoluteUrl(applyLocalePrefix(route, DEFAULT_MARKET))
    );
  }, [title, description, path, pathname, image]);

  return null;
}
