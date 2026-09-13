export const GA_MEASUREMENT_ID = 'G-JT8H9HJ01C';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Last pathname we actually sent a page_view for. Guards against the duplicate
 * effect run that <React.StrictMode> performs in development, and against any
 * other immediately repeated call for the same route. Revisiting a path after
 * a different one has been viewed still tracks, because this only ever holds
 * the most recent path.
 */
let lastTrackedPath: string | null = null;

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
