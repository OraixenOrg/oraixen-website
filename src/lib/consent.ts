/**
 * First-party analytics consent, using Google Basic Consent Mode.
 *
 * "Basic" means the Google tag is NOT present until the visitor allows
 * analytics: no gtag.js request, no cookieless ping, nothing. That is the whole
 * point of this module, and it is why index.html carries no Google snippet.
 *
 * Only ONE optional category exists: analytics. Advertising signals are always
 * denied because there is no Google Ads tag on this site; a toggle for
 * technology that is not running would be asking consent for nothing.
 *
 * Deliberately framework-free (no React, no i18next) so the loading rules can
 * be reasoned about on their own, mirroring src/lib/marketLocale.ts.
 */

import { GA_MEASUREMENT_ID, resetPageViewDedupe, setAnalyticsEnabled, trackPageView } from './analytics';

/** Versioned so a schema or policy change can invalidate old records cleanly. */
const CONSENT_KEY = 'oraixen_consent_v1';
const CONSENT_VERSION = 1;

/**
 * Fired on the window when analytics transitions disabled -> enabled.
 *
 * Scroll-depth tracking listens for it to re-baseline: thresholds already
 * behind the visitor at that moment are marked passed WITHOUT being sent, so
 * granting consent never back-fills scroll history.
 */
export const ANALYTICS_ENABLED_EVENT = 'oraixen:analytics-enabled';

/** Fired on the window when the footer control asks for the settings dialog. */
export const OPEN_SETTINGS_EVENT = 'oraixen:open-privacy-settings';

export interface ConsentRecord {
  v: number;
  analytics: boolean;
  ts: number;
}

/**
 * Google Consent Mode v2 signals. All four are always declared: Google expects
 * the complete set, and a future Ads issue then flips values rather than
 * introducing new keys.
 */
type ConsentSignals = Record<
  'analytics_storage' | 'ad_storage' | 'ad_user_data' | 'ad_personalization',
  'granted' | 'denied'
>;

const ALL_DENIED: ConsentSignals = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

/** Advertising stays denied even here: analytics consent is not ad consent. */
const ANALYTICS_GRANTED: ConsentSignals = { ...ALL_DENIED, analytics_storage: 'granted' };

/**
 * Reads the stored decision.
 *
 * EVERY field must be exactly right. Anything else (absent, unparsable, wrong
 * version, non-boolean flag, missing or non-finite timestamp) returns null,
 * which means "no decision" and shows the banner.
 *
 * Deliberately never repairs a malformed record. Substituting a default for a
 * bad field would turn an unexpected schema into a valid consent grant, which
 * is the one mistake this module must not make: a permission the visitor did
 * not give would be inferred from corrupt data.
 */
export function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_KEY);
  } catch {
    // Private mode or storage disabled: treat as no decision.
    return null;
  }
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;

    const record = parsed as Record<string, unknown>;
    if (record.v !== CONSENT_VERSION) return null;
    if (typeof record.analytics !== 'boolean') return null;
    // Number.isFinite also rejects NaN and both infinities. The positive check
    // matches writeConsent(), which only ever stores Date.now().
    if (typeof record.ts !== 'number' || !Number.isFinite(record.ts) || record.ts <= 0) return null;

    return { v: CONSENT_VERSION, analytics: record.analytics, ts: record.ts };
  } catch {
    return null;
  }
}

/**
 * Persists the decision. Storing "the visitor said no" is what makes no stick,
 * so this write is never itself gated on analytics consent.
 *
 * @returns true only when the value actually reached localStorage. Callers need
 * this: a revocation that silently failed to persist would be undone by the
 * reload that follows it.
 */
export function writeConsent(analytics: boolean): boolean {
  if (typeof window === 'undefined') return false;
  const record: ConsentRecord = { v: CONSENT_VERSION, analytics, ts: Date.now() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    return true;
  } catch {
    // Storage unavailable or full. The caller keeps the in-memory state for
    // this document and must not act as though the choice was saved.
    return false;
  }
}

/**
 * Removes the stored decision, and only that key.
 *
 * Used to fail closed when revoking: clearing the old "allowed" record first
 * means that even if writing the new "denied" record fails, the next full load
 * finds no decision, shows the banner, and leaves Google unloaded. Market
 * preferences, theme and every other key are untouched.
 */
export function clearConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.removeItem(CONSENT_KEY);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Google tag loading
// ---------------------------------------------------------------------------

/** Guards against a re-render adding a second script tag or config. */
let googleTagInitialized = false;

function pushGtag(...args: unknown[]): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Initializes Google Analytics after an analytics grant.
 *
 * Order matters and is the core of Basic Consent Mode: every command, including
 * the consent default, is queued into dataLayer BEFORE the external script is
 * appended, so gtag.js can never act ahead of the consent state it must respect.
 */
export function initializeAnalytics(): void {
  if (typeof window === 'undefined' || googleTagInitialized) return;
  googleTagInitialized = true;

  // 1. Stub, so queued commands survive until gtag.js arrives.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }

  // 2 + 3. Consent default (all denied), then the analytics-only update.
  pushGtag('consent', 'default', ALL_DENIED);
  pushGtag('consent', 'update', ANALYTICS_GRANTED);

  // 4 + 5. Standard bootstrap. Pageviews stay owned by React Router.
  pushGtag('js', new Date());
  pushGtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  // 6. Let Oraixen's own helpers through from here on.
  setAnalyticsEnabled(true);

  // 7. The current route's pageview would otherwise be lost forever: App.tsx's
  //    effect already ran and was suppressed, and it will not re-run for this
  //    path. Routed through trackPageView so the lastTrackedPath dedupe applies
  //    and page_location still carries any query string on the current URL.
  trackPageView(window.location.pathname);

  // Scroll tracking re-baselines here rather than replaying past thresholds.
  window.dispatchEvent(new Event(ANALYTICS_ENABLED_EVENT));

  // 8. Only now does anything leave the browser for Google.
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

/**
 * Tells an already-loaded Google tag that analytics is no longer allowed.
 *
 * gtag.js cannot be unloaded, so this is only half the job: the caller also
 * disables Oraixen's own helpers and reloads the document.
 */
export function signalAnalyticsDenied(): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', ALL_DENIED);
  }
  setAnalyticsEnabled(false);
  resetPageViewDedupe();
}

// ---------------------------------------------------------------------------
// Legacy Google Analytics cookie cleanup
// ---------------------------------------------------------------------------

/**
 * Exact GA cookie names, and prefixes for the ones GA suffixes with a container
 * or property id.
 *
 * This is a strict allowlist, never an iterate-and-delete. Oraixen's own
 * oraixen_market*, oraixen_theme and oraixen_consent_v1 can therefore not be
 * matched: none of them starts with an underscore.
 */
const GA_COOKIE_EXACT = ['_ga', '_gid', '_gat'] as const;
const GA_COOKIE_PREFIXES = ['_ga_', '_gat_', '_gac_'] as const;

function isGoogleAnalyticsCookie(name: string): boolean {
  if ((GA_COOKIE_EXACT as readonly string[]).includes(name)) return true;
  return GA_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix));
}

/**
 * Best-effort removal of this site's known Google Analytics cookies.
 *
 * Deliberately not presented as a guarantee: document.cookie cannot see
 * HttpOnly cookies, and deletion only works when domain and path match how the
 * cookie was set, so the host/apex variants below are attempts rather than
 * certainties. The reliable guarantee is that no further data is sent.
 */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;

  let names: string[];
  try {
    names = document.cookie
      .split(';')
      .map((pair) => pair.split('=')[0]?.trim() ?? '')
      .filter((name) => name !== '' && isGoogleAnalyticsCookie(name));
  } catch {
    return;
  }
  if (names.length === 0) return;

  const host = window.location.hostname;
  // undefined = "no Domain attribute", which is how host-only cookies are set.
  const domains: Array<string | undefined> = [undefined, host];
  if (host.startsWith('www.')) domains.push(host.slice(4), `.${host.slice(4)}`);
  else domains.push(`.${host}`);

  const expired = 'Thu, 01 Jan 1970 00:00:00 GMT';
  for (const name of names) {
    for (const domain of domains) {
      const attributes = `expires=${expired}; path=/${domain ? `; domain=${domain}` : ''}`;
      try {
        document.cookie = `${name}=; ${attributes}`;
      } catch {
        // Ignore: a rejected variant simply means that combination was wrong.
      }
    }
  }
}
