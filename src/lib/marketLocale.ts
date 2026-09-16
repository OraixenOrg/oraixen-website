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
 * Each market owns a complete, independent content tree — `en`, `ar-eg` and
 * `ar-sa` are three separate locales, not one Arabic set shown under two URLs.
 * Egypt and Saudi Arabia are addressed in their own commercial voice, so the
 * market id in the URL is also the i18next language id.
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
  /**
   * i18next language id, identical to the market id: each market resolves to
   * its own locale tree under src/i18n/locales/<language>/.
   */
  language: MarketLocale;
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

/** localStorage key and cookie name for the current/general market choice. */
export const MARKET_PREFERENCE_KEY = 'oraixen_market';

/**
 * Which country the visitor is browsing from, as reported by the server. The
 * URL cannot tell us this — someone on /en may be sitting in Cairo or Riyadh.
 */
export type CountryContext = 'sa' | 'eg' | 'other';

export const DEFAULT_COUNTRY_CONTEXT: CountryContext = 'other';

/**
 * Country-scoped preference keys. A single global preference is not enough: a
 * device that saved ar-eg in Egypt must not be sent to Egyptian Arabic after it
 * travels to Saudi Arabia, so each country remembers its own answer.
 */
export const COUNTRY_PREFERENCE_KEYS: Record<CountryContext, string> = {
  sa: 'oraixen_market_sa',
  eg: 'oraixen_market_eg',
  other: 'oraixen_market_other',
};

/**
 * Markets each country context may resolve to. The server whitelists against
 * the same table, so a value outside it is ignored rather than trusted.
 */
export const COUNTRY_MARKETS: Record<CountryContext, readonly MarketLocale[]> = {
  sa: ['en', 'ar-sa'],
  eg: ['en', 'ar-eg'],
  other: ['en', 'ar-eg', 'ar-sa'],
};

export function isCountryContext(value: unknown): value is CountryContext {
  return value === 'sa' || value === 'eg' || value === 'other';
}

/**
 * Markets the selector should offer. The active market is always included, so
 * a Saudi visitor who opened /ar-eg/about directly can still see and keep it.
 *
 * While the country is still unknown (null) only the active market is listed —
 * showing all three would flash Egyptian and Saudi options at each other's
 * visitors before the real context arrives.
 */
export function visibleMarkets(
  context: CountryContext | null,
  active: MarketLocale
): MarketLocale[] {
  if (context === null) return [active];
  const allowed = COUNTRY_MARKETS[context];
  return MARKET_LOCALES.filter((locale) => allowed.includes(locale) || locale === active);
}

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
    language: 'ar-eg',
    htmlLang: 'ar-EG',
    dir: 'rtl',
    hreflang: 'ar-EG',
    ogLocale: 'ar_EG',
    label: 'العربية · مصر',
  },
  'ar-sa': {
    locale: 'ar-sa',
    prefix: '/ar-sa',
    language: 'ar-sa',
    htmlLang: 'ar-SA',
    dir: 'rtl',
    hreflang: 'ar-SA',
    ogLocale: 'ar_SA',
    label: 'العربية · السعودية',
  },
};

export function getMarketConfig(locale: MarketLocale): MarketConfig {
  return MARKETS[locale];
}

/**
 * The active market for a live i18next language id.
 *
 * MarketConfig.language IS the market id, so this is a validating narrow rather
 * than a guess. Anything unrecognised falls back to the default market instead
 * of throwing, because this runs during render.
 *
 * Use this instead of inspecting the language string (`startsWith('ar')`) when
 * selecting MARKET CONTENT: that test cannot tell ar-eg from ar-sa and silently
 * collapses the two Arabic markets back into one.
 */
export function marketFromLanguage(language: string | undefined | null): MarketLocale {
  return isMarketLocale(language) ? language : DEFAULT_MARKET;
}

/**
 * Writing system a market reads in.
 *
 * ONLY for factual values that exist in one form per script and carry no market
 * positioning: the Cairo street address reads identically in Egypt and Saudi
 * Arabia, so storing it twice would be duplication, not localization. Never use
 * this to pick marketing copy.
 */
export type ContentScript = 'en' | 'ar';

export function getContentScript(locale: MarketLocale): ContentScript {
  return MARKETS[locale].dir === 'rtl' ? 'ar' : 'en';
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

/** Writes one functional preference to localStorage and a first-party cookie. */
function writePreference(key: string, value: MarketLocale): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private mode or storage disabled — the cookie below is still attempted.
  }

  try {
    const oneYearSeconds = 60 * 60 * 24 * 365;
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${key}=${value}; Path=/; Max-Age=${oneYearSeconds}; SameSite=Lax${secure}`;
  } catch {
    // Cookies unavailable; the localStorage value above is still useful.
  }
}

/**
 * Persists an explicit market choice.
 *
 * Writes the general current-market value and, when the server told us which
 * country the visitor is in, the preference scoped to that country. The server
 * reads the country-scoped COOKIE on later locale-less visits — localStorage is
 * for client state only.
 *
 * Stores just the chosen market id: no identifier, no IP, no city, no
 * coordinates, no country history.
 */
export function persistMarketPreference(
  locale: MarketLocale,
  context: CountryContext | null
): void {
  if (typeof window === 'undefined') return;

  // A null context means the country is still unknown. Writing a bucket now
  // would guess wrong — a Saudi visitor would get oraixen_market_other and
  // never oraixen_market_sa — so callers must wait for it to resolve. The
  // selector enforces that by staying disabled until then.
  if (context === null) return;

  writePreference(MARKET_PREFERENCE_KEY, locale);

  // Only record the country-scoped answer when the market is actually valid
  // there, so the server never has to second-guess its own whitelist.
  if (COUNTRY_MARKETS[context].includes(locale)) {
    writePreference(COUNTRY_PREFERENCE_KEYS[context], locale);
  }
}

/**
 * Asks the server which country the visitor is in. Country comes only from the
 * server's GeoIP lookup; the browser never geolocates and no third-party
 * service is contacted. Any failure resolves to 'other', which shows all three
 * markets rather than hiding one.
 */
export async function fetchCountryContext(signal?: AbortSignal): Promise<CountryContext> {
  try {
    const response = await fetch('/market-context.php', {
      signal,
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return DEFAULT_COUNTRY_CONTEXT;

    const data: unknown = await response.json();
    const value = (data as { context?: unknown } | null)?.context;
    return isCountryContext(value) ? value : DEFAULT_COUNTRY_CONTEXT;
  } catch {
    return DEFAULT_COUNTRY_CONTEXT;
  }
}

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}
