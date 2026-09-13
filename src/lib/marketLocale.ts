/**
 * Three-market URL architecture.
 *
 * Oraixen publishes the same site under three stable, prefixed URL spaces:
 *
 *   /en/*      English
 *   /ar-eg/*   Arabic — Egypt
 *   /ar-sa/*   Arabic — Saudi Arabia
 *
 * The URL is authoritative: it decides the language, the document direction and
 * the SEO metadata. Nothing stored in the browser may override it.
 *
 * Both Arabic markets deliberately share the single `ar` translation set — the
 * market is carried by the URL, not by a duplicated locale tree. Future
 * Egypt/Saudi differences belong in small market-scoped overrides, never in a
 * second copy of the Arabic site.
 *
 * Deliberately dependency-free (no i18next, no router, no React) so it can be
 * reasoned about and tested in isolation.
 */

export type MarketLocale = 'en' | 'ar-eg' | 'ar-sa';

export interface MarketConfig {
  /** Canonical market id, as it appears in the URL. */
  locale: MarketLocale;
  /** Public URL prefix, no trailing slash. */
  prefix: string;
  /** i18next language. Both Arabic markets share one translation set. */
  language: 'en' | 'ar';
  /** Value for <html lang>. */
  htmlLang: string;
  /** Value for <html dir>. */
  dir: 'ltr' | 'rtl';
  /** Value for <link rel="alternate" hreflang>. */
  hreflang: string;
  /** Value for <meta property="og:locale">. */
  ogLocale: string;
  /**
   * Name shown in the market selector, written in that market's own language.
   * An endonym, not translated UI copy — it reads the same in every version.
   */
  label: string;
}

export const SITE_URL = 'https://oraixen.com';

/** Used for legacy/unprefixed paths and as the x-default target. */
export const DEFAULT_MARKET: MarketLocale = 'en';

/** localStorage key and cookie name for an explicit user choice. */
export const MARKET_PREFERENCE_KEY = 'oraixen_market';

export const MARKET_LOCALES: readonly MarketLocale[] = ['en', 'ar-eg', 'ar-sa'];

export const MARKETS: Record<MarketLocale, MarketConfig> = {
  en: {
    locale: 'en',
    prefix: '/en',
    language: 'en',
    htmlLang: 'en',
    dir: 'ltr',
    hreflang: 'en',
    ogLocale: 'en_US',
    label: 'English',
  },
  'ar-eg': {
    locale: 'ar-eg',
    prefix: '/ar-eg',
    language: 'ar',
    htmlLang: 'ar-EG',
    dir: 'rtl',
    hreflang: 'ar-EG',
    ogLocale: 'ar_EG',
    label: 'العربية — مصر',
  },
  'ar-sa': {
    locale: 'ar-sa',
    prefix: '/ar-sa',
    language: 'ar',
    htmlLang: 'ar-SA',
    dir: 'rtl',
    hreflang: 'ar-SA',
    ogLocale: 'ar_SA',
    label: 'العربية — السعودية',
  },
};

export function getMarketConfig(locale: MarketLocale): MarketConfig {
  return MARKETS[locale];
}

export function isMarketLocale(value: unknown): value is MarketLocale {
  return typeof value === 'string' && (MARKET_LOCALES as readonly string[]).includes(value);
}

/**
 * Reads the market from a real browser pathname.
 *
 * Matching is exact on a whole path segment, so `/ar-sa` and `/ar-sa/about`
 * resolve to ar-sa while `/ar-sample`, `/enough` and `/archive` do not resolve
 * to anything. Returns null for legacy/unprefixed paths.
 */
export function parseMarketFromPath(pathname: string): MarketLocale | null {
  const path = normalizePath(pathname);

  for (const locale of MARKET_LOCALES) {
    const { prefix } = MARKETS[locale];
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      return locale;
    }
  }

  return null;
}

/**
 * BrowserRouter basename for a pathname: the market prefix when the URL has
 * one, otherwise undefined so unprefixed local development still works.
 */
export function getBasename(pathname: string): string | undefined {
  const market = parseMarketFromPath(pathname);
  return market ? MARKETS[market].prefix : undefined;
}

/**
 * Removes a market prefix, returning the in-app route.
 *   '/ar-sa/about' -> '/about'
 *   '/ar-sa'       -> '/'
 *   '/about'       -> '/about'
 */
export function stripLocalePrefix(pathname: string): string {
  const path = normalizePath(pathname);
  const market = parseMarketFromPath(path);
  if (!market) return path;

  const rest = path.slice(MARKETS[market].prefix.length);
  return rest === '' ? '/' : rest;
}

/**
 * Adds a market prefix to an in-app route. Any existing prefix is replaced, so
 * this can never produce '/ar-sa/ar-sa/about'.
 *   ('/about', 'ar-sa') -> '/ar-sa/about'
 *   ('/',      'en')    -> '/en'
 */
export function applyLocalePrefix(pathname: string, locale: MarketLocale): string {
  const route = stripLocalePrefix(pathname);
  const { prefix } = MARKETS[locale];
  return route === '/' ? prefix : `${prefix}${route}`;
}

/** Absolute https://oraixen.com URL for an already-prefixed public path. */
export function buildAbsoluteUrl(publicPath: string): string {
  const path = normalizePath(publicPath);
  // Keep the bare origin form for '/', and never emit a trailing slash elsewhere.
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.replace(/\/+$/, '')}`;
}

/** The same route in all three markets, as absolute URLs. */
export function buildMarketUrls(routePath: string): Record<MarketLocale, string> {
  const route = stripLocalePrefix(routePath);
  return {
    en: buildAbsoluteUrl(applyLocalePrefix(route, 'en')),
    'ar-eg': buildAbsoluteUrl(applyLocalePrefix(route, 'ar-eg')),
    'ar-sa': buildAbsoluteUrl(applyLocalePrefix(route, 'ar-sa')),
  };
}

/**
 * Persists an explicit market choice.
 *
 * Written to localStorage for the client and to a first-party cookie so the
 * planned server-side market routing can read it before React runs. Stores only
 * the chosen market id — no identifiers, no geography, no IP.
 */
export function persistMarketPreference(locale: MarketLocale): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(MARKET_PREFERENCE_KEY, locale);
  } catch {
    // Private mode or storage disabled — the cookie below is still attempted.
  }

  try {
    const oneYearSeconds = 60 * 60 * 24 * 365;
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie =
      `${MARKET_PREFERENCE_KEY}=${locale}; Path=/; Max-Age=${oneYearSeconds}; SameSite=Lax${secure}`;
  } catch {
    // Cookies unavailable; the localStorage value above is still useful.
  }
}

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}
