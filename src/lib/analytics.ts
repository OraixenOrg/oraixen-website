export const GA_MEASUREMENT_ID = 'G-JT8H9HJ01C';

/**
 * Mirror of ANALYTICS_ENABLED_EVENT in src/lib/consent.ts. Declared locally so
 * this module stays dependency-free: consent.ts imports analytics.ts, and
 * importing back would create a cycle.
 */
const ANALYTICS_ENABLED_EVENT = 'oraixen:analytics-enabled';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Values GA4 accepts as event parameters.
 *
 * PRIVACY RULE for every call site in this app: parameters describe *what*
 * happened using stable, predefined metadata. Never pass anything a visitor
 * typed — no names, emails, phone numbers, company names, message bodies,
 * FormData, or server error text.
 */
export type AnalyticsParams = Record<string, string | number | boolean>;

/**
 * Last pathname we actually sent a page_view for. Guards against the duplicate
 * effect run that <React.StrictMode> performs in development, and against any
 * other immediately repeated call for the same route. Revisiting a path after
 * a different one has been viewed still tracks, because this only ever holds
 * the most recent path.
 */
let lastTrackedPath: string | null = null;

/**
 * Whether the visitor has allowed analytics. Starts false: nothing is sent
 * until src/lib/consent.ts turns it on, and the Google tag is not even loaded
 * before then (Basic Consent Mode).
 *
 * This must be checked in addition to `window.gtag`, not instead of it. Once
 * gtag.js has loaded it stays a function for the life of the document, so after
 * a revocation the gtag check alone would no longer suppress anything.
 */
let analyticsEnabled = false;

/** Consent-controlled switch. Called only by src/lib/consent.ts. */
export function setAnalyticsEnabled(enabled: boolean) {
  analyticsEnabled = enabled;
  // Leaving a stale path would make the next grant skip the current route's
  // pageview as an apparent duplicate.
  if (!enabled) lastTrackedPath = null;
}

/** Clears the pageview dedupe so a later grant can report the current route. */
export function resetPageViewDedupe() {
  lastTrackedPath = null;
}

/** Sends a GA4 event, or does nothing when analytics is off or unavailable. */
export function trackEvent(eventName: string, parameters: AnalyticsParams = {}) {
  if (!analyticsEnabled) return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, parameters);
}

/**
 * Sends one manual GA4 pageview for an SPA route change.
 *
 * The Google tag in index.html is configured with `send_page_view: false`, so
 * this is the single source of pageviews for the app.
 *
 * IMPORTANT — GA4 property setting, not something code can control:
 * the web data stream must have Enhanced Measurement → Page views →
 * "Page changes based on browser history events" DISABLED. Even with
 * `send_page_view: false`, Enhanced Measurement will otherwise emit its own
 * pageview on every History API change and double-count every route.
 */
export function trackPageView(path: string) {
  // Checked before the dedupe: recording a path while analytics is off would
  // make the post-consent pageview look like a duplicate and be dropped.
  if (!analyticsEnabled) return;
  if (path === lastTrackedPath) return;
  // No gtag yet (blocked, still loading, SSR-like context): leave the path
  // untracked so a later call for it can still succeed.
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  });

  lastTrackedPath = path;
}

/**
 * A business-significant call-to-action click.
 *
 * `ctaId` and `ctaLocation` must be machine-stable English identifiers defined
 * at the call site — never translated button copy, which would split one CTA
 * into separate rows per language.
 */
export function trackCtaClick(ctaId: string, ctaLocation: string, destination: string) {
  trackEvent('cta_click', {
    cta_id: ctaId,
    cta_location: ctaLocation,
    destination,
  });
}

/**
 * A click on a direct contact channel. Only the *method* is recorded — never
 * the address or number behind the link.
 */
export function trackContactMethodClick(method: 'email' | 'phone', location: string) {
  trackEvent('contact_method_click', {
    contact_method: method,
    contact_location: location,
  });
}

/** Scroll-progress milestones, in percent. */
const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;

/**
 * Reports how far down a route the visitor gets, as at most four low-cardinality
 * `scroll_depth` events (25/50/75/90 percent), each fired once per call.
 *
 * One passive listener; returns its own cleanup. Call it per route visit so a
 * later return to the same path can report thresholds again.
 */
export function startScrollDepthTracking(path: string): () => void {
  const reached = new Set<number>();

  const currentPercent = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    // Page fits the viewport: there is no depth to report, and dividing by this
    // would be a divide-by-zero.
    if (scrollable <= 0) return null;
    return (window.scrollY / scrollable) * 100;
  };

  /**
   * Marks every threshold already behind the visitor as passed WITHOUT sending
   * it. Run when analytics turns on, so granting consent after scrolling half
   * the page reports the milestones that follow rather than back-filling the
   * ones that came before.
   */
  const baseline = () => {
    const percent = currentPercent();
    if (percent === null) return;
    for (const threshold of SCROLL_THRESHOLDS) {
      if (percent >= threshold) reached.add(threshold);
    }
  };

  const evaluate = () => {
    const percent = currentPercent();
    if (percent === null) return;

    for (const threshold of SCROLL_THRESHOLDS) {
      if (percent < threshold || reached.has(threshold)) continue;
      reached.add(threshold);
      trackEvent('scroll_depth', {
        scroll_threshold: `${threshold}_percent`,
        page_path: path,
      });
    }
  };

  // A route mounted while analytics is off has no history worth reporting, so
  // establish the baseline the moment consent arrives.
  if (!analyticsEnabled) baseline();

  window.addEventListener(ANALYTICS_ENABLED_EVENT, baseline);
  window.addEventListener('scroll', evaluate, { passive: true });
  return () => {
    window.removeEventListener(ANALYTICS_ENABLED_EVENT, baseline);
    window.removeEventListener('scroll', evaluate);
  };
}
