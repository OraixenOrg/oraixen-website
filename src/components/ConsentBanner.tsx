import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import {
  OPEN_SETTINGS_EVENT,
  clearAnalyticsCookies,
  clearConsent,
  initializeAnalytics,
  readConsent,
  signalAnalyticsDenied,
  writeConsent,
} from '../lib/consent';

/** Controls the settings dialog can hand keyboard focus to, in DOM order. */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

/**
 * Analytics consent UI: the first-visit banner and the privacy settings dialog.
 *
 * Mounted once by App.tsx. There is deliberately no app-wide context: only this
 * component and the footer control need consent state, and the footer reaches it
 * through a namespaced CustomEvent rather than by wrapping the whole tree.
 *
 * Only analytics is optional. Site preferences (market/language and theme) are
 * shown for transparency but are never gated here, and advertising has no
 * category because no Google Ads tag exists on this site.
 */
export function ConsentBanner() {
  const { t } = useTranslation('consent');

  // null = no stored decision, so the banner is still unresolved.
  const [decision, setDecision] = useState<boolean | null>(null);
  const [resolved, setResolved] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const analyticsId = useId();

  /**
   * Startup: apply any stored decision, and when analytics is not granted make
   * a best-effort sweep of Google Analytics cookies. That matters because this
   * site previously loaded GA before consent existed, so returning visitors can
   * still be carrying cookies from the old deployment.
   */
  useEffect(() => {
    const stored = readConsent();
    if (stored?.analytics === true) {
      setDecision(true);
      initializeAnalytics();
    } else {
      if (stored) setDecision(false);
      clearAnalyticsCookies();
    }
    setResolved(true);
  }, []);

  const openDialog = useCallback(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDraftAnalytics(readConsent()?.analytics === true);
    setDialogOpen(true);
  }, []);

  /** The footer control asks for the dialog without any shared React state. */
  useEffect(() => {
    window.addEventListener(OPEN_SETTINGS_EVENT, openDialog);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openDialog);
  }, [openDialog]);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);

  // Modal focus management: initial focus, a Tab/Shift+Tab trap, and Escape.
  // Escape closes without saving, so it never counts as a decision.
  useEffect(() => {
    if (!dialogOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    getFocusableElements(dialog)[0]?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDialog();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = getFocusableElements(dialog);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!(active instanceof Node) || !dialog.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dialogOpen, closeDialog]);

  const allowAnalytics = useCallback(() => {
    writeConsent(true);
    setDecision(true);
    initializeAnalytics();
  }, []);

  const rejectAnalytics = useCallback(() => {
    writeConsent(false);
    setDecision(false);
    clearAnalyticsCookies();
  }, []);

  /**
   * Turning analytics off after it was on needs a reload: gtag.js cannot be
   * unloaded, so the consent update and the disabled flag only stop new events
   * in this document.
   *
   * The reload is the dangerous part. Reloading on a write that silently failed
   * would restore the old "allowed" record and start Google again, turning a
   * revocation into a re-grant. So the reload is conditional on the new record
   * actually reaching storage, and the old record is cleared first: if the write
   * then fails, the next load finds no decision, shows the banner and leaves
   * Google unloaded rather than falling back to the stale grant.
   */
  const saveSettings = useCallback(() => {
    const previous = readConsent()?.analytics === true;

    if (previous && !draftAnalytics) {
      // Fail closed: drop the stale grant before attempting the new record.
      clearConsent();
      const persisted = writeConsent(false);

      // Applied regardless of persistence, so this document stops measuring
      // immediately either way.
      signalAnalyticsDenied();
      clearAnalyticsCookies();
      setDecision(false);

      if (persisted) {
        window.location.reload();
        return;
      }

      // Not saved. Do not reload, and leave the dialog open rather than
      // implying the choice was stored; Save stays available for a retry.
      return;
    }

    if (draftAnalytics) allowAnalytics();
    else rejectAnalytics();
    closeDialog();
  }, [draftAnalytics, allowAnalytics, rejectAnalytics, closeDialog]);

  const showBanner = resolved && decision === null && !dialogOpen;
  const revoking = decision === true && !draftAnalytics;

  return (
    <>
      {showBanner && (
        <section
          aria-label={t('banner.title')}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-card/95 backdrop-blur-sm shadow-card"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
              <div className="flex-1">
                <h2 className="text-base font-bold text-ink mb-1.5">{t('banner.title')}</h2>
                <p className="text-sm text-body leading-relaxed">
                  {t('banner.body')}{' '}
                  <Link to="/privacy" className="text-teal underline underline-offset-2 hover:text-ink transition-colors">
                    {t('banner.privacyLink')}
                  </Link>
                </p>
              </div>
              {/* Allow and Reject are the same element, size and variant on
                  purpose: rejecting must never be the harder path. */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button variant="primary" size="md" onClick={allowAnalytics}>
                  {t('banner.accept')}
                </Button>
                <Button variant="primary" size="md" onClick={rejectAnalytics}>
                  {t('banner.reject')}
                </Button>
                <Button variant="outline" size="md" onClick={openDialog}>
                  {t('banner.manage')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-inkblack/50" aria-hidden="true" onClick={closeDialog} />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full sm:max-w-lg max-h-[85vh] overflow-y-auto bg-card border border-line rounded-t-2xl sm:rounded-2xl shadow-hover p-6 sm:p-8"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
          >
            <h2 id={titleId} className="text-xl font-bold text-ink mb-3">
              {t('dialog.title')}
            </h2>
            <p className="text-sm text-body leading-relaxed mb-6">{t('dialog.intro')}</p>

            <div className="space-y-4">
              <div className="rounded-xl border border-line p-4">
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <h3 className="text-sm font-bold text-ink">{t('categories.sitePreferences.title')}</h3>
                  <span className="text-xs font-semibold text-teal shrink-0">
                    {t('categories.sitePreferences.alwaysOnLabel')}
                  </span>
                </div>
                <p className="text-sm text-body leading-relaxed">
                  {t('categories.sitePreferences.description')}
                </p>
              </div>

              <div className="rounded-xl border border-line p-4">
                <div className="flex items-start gap-3">
                  <input
                    id={analyticsId}
                    type="checkbox"
                    checked={draftAnalytics}
                    onChange={(e) => setDraftAnalytics(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
                  />
                  <div>
                    <label htmlFor={analyticsId} className="block text-sm font-bold text-ink mb-1.5 cursor-pointer">
                      {t('categories.analytics.title')}
                    </label>
                    <p className="text-sm text-body leading-relaxed">
                      {t('categories.analytics.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Only shown when this save would actually turn analytics off. */}
            {revoking && (
              <p className="mt-5 text-sm text-muted leading-relaxed">{t('dialog.reloadNote')}</p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="md" onClick={saveSettings}>
                {t('dialog.save')}
              </Button>
              <Button variant="outline" size="md" onClick={closeDialog}>
                {t('dialog.close')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
