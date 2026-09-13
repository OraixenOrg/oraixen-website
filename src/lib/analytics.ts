export const GA_MEASUREMENT_ID = 'G-JT8H9HJ01C';

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

/** Sends a GA4 event, or does nothing when the Google tag is unavailable. */
export function trackEvent(eventName: string, parameters: AnalyticsParams = {}) {
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

  const evaluate = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    // Page fits the viewport — there is no depth to report, and dividing by
    // this would be a divide-by-zero.
    if (scrollable <= 0) return;

    const percent = (window.scrollY / scrollable) * 100;
    for (const threshold of SCROLL_THRESHOLDS) {
      if (percent < threshold || reached.has(threshold)) continue;
      reached.add(threshold);
      trackEvent('scroll_depth', {
        scroll_threshold: `${threshold}_percent`,
        page_path: path,
      });
    }
  };

  window.addEventListener('scroll', evaluate, { passive: true });
  return () => window.removeEventListener('scroll', evaluate);
}
