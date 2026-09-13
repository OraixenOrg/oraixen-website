import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { EgyptFlag, SaudiFlag } from './MarketFlags';
import {
  DEFAULT_COUNTRY_CONTEXT,
  DEFAULT_MARKET,
  applyLocalePrefix,
  fetchCountryContext,
  parseMarketFromPath,
  persistMarketPreference,
  visibleMarkets,
  type CountryContext,
  type MarketLocale,
} from '../lib/marketLocale';

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * How each market presents itself. Written in its own language — these are
 * endonyms, not translated UI copy, so they read identically in every version.
 * English uses a globe rather than a country flag: it is the international
 * default version, not a country-specific market.
 */
const MARKET_UI: Record<MarketLocale, { label: string; short: string; Mark: () => JSX.Element }> = {
  en: {
    label: 'English',
    short: 'English',
    Mark: () => <Globe size={16} aria-hidden="true" className="shrink-0" />,
  },
  'ar-eg': {
    label: 'مصر — العربية',
    short: 'مصر',
    Mark: () => <EgyptFlag />,
  },
  'ar-sa': {
    label: 'السعودية — العربية',
    short: 'السعودية',
    Mark: () => <SaudiFlag />,
  },
};

const MENU_ID = 'market-menu';

/**
 * Site-version selector for the three public markets.
 *
 * Each market is its own URL space, so choosing a different one is a real
 * navigation to the equivalent page — a full-page assign(), because the router's
 * basename is fixed for the life of the document. Choosing the market you are
 * already on still records the preference, which is what server-side market
 * selection will read later.
 *
 * A custom menu rather than a native <select> so it matches the navbar controls;
 * the ARIA menu/menuitemradio pattern and full keyboard support are implemented
 * by hand. It is a dropdown, not a modal, so focus is never trapped.
 */
export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { t } = useTranslation('common');
  const current: MarketLocale = parseMarketFromPath(window.location.pathname) ?? DEFAULT_MARKET;

  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<CountryContext>(DEFAULT_COUNTRY_CONTEXT);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Country comes from the server's GeoIP lookup, asked for once on mount.
  // Never blocks rendering: until it answers — or if it fails — the context
  // stays 'other', which offers all three markets rather than hiding one.
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    fetchCountryContext(controller.signal).then((value) => {
      if (active) setContext(value);
    });
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  // Only the markets relevant to this country, plus whatever is active now.
  const options = visibleMarkets(context, current);
  const currentIndex = Math.max(options.indexOf(current), 0);

  const closeAndRestoreFocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Open with the active option focused, so arrow keys start from where you are.
  useEffect(() => {
    if (!open) return;
    itemRefs.current[currentIndex]?.focus();
  }, [open, currentIndex]);

  // Clicking anywhere outside dismisses the menu, leaving focus where it landed.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const select = (next: MarketLocale) => {
    // Recorded even when the market is unchanged: an explicit confirmation is
    // still a preference the next visit should honour. Saved against the
    // current country so the server can honour it on later locale-less visits.
    persistMarketPreference(next, context);

    if (next === current) {
      closeAndRestoreFocus();
      return;
    }

    // Same page in the new market, query string and hash intact.
    const { pathname, search, hash } = window.location;
    window.location.assign(`${applyLocalePrefix(pathname, next)}${search}${hash}`);
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onItemKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        const next = (index + delta + options.length) % options.length;
        itemRefs.current[next]?.focus();
        break;
      }
      case 'Home':
        event.preventDefault();
        itemRefs.current[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        itemRefs.current[options.length - 1]?.focus();
        break;
      case 'Escape':
        event.preventDefault();
        closeAndRestoreFocus();
        break;
      case 'Tab':
        // Let focus move on naturally; just don't leave the menu open behind it.
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const CurrentMark = MARKET_UI[current].Mark;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={MENU_ID}
        aria-label={t('lang.selectAria')}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-2.5 text-xs font-medium text-ink/80 transition-colors hover:border-teal/40 hover:bg-surface-subtle hover:text-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 md:gap-0 md:px-2 lg:gap-1.5 lg:px-2.5"
      >
        <CurrentMark />
        {/* The md-lg band is the tightest in the bar: the full desktop nav and
            the Contact CTA already fill it, so between those breakpoints the
            trigger collapses to just its mark, matching the ThemeSwitcher next
            to it. Label and chevron return below md (hamburger layout) and at
            lg and up. aria-label still names the control at every width. */}
        <span className="inline max-w-[6.5rem] truncate md:hidden lg:inline">
          {MARKET_UI[current].short}
        </span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`inline shrink-0 transition-transform duration-200 md:hidden lg:inline ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          id={MENU_ID}
          role="menu"
          aria-label={t('lang.selectAria')}
          className="absolute top-full end-0 z-50 mt-2 min-w-[14rem] rounded-xl border border-line bg-card p-1.5 shadow-card"
        >
          {options.map((locale, index) => {
            const { label, Mark } = MARKET_UI[locale];
            const isActive = locale === current;
            return (
              <button
                key={locale}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => select(locale)}
                onKeyDown={(event) => onItemKeyDown(event, index)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-start text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 ${
                  isActive
                    ? 'bg-teal/10 font-semibold text-teal'
                    : 'text-ink/80 hover:bg-surface-subtle hover:text-ink'
                }`}
              >
                <Mark />
                <span className="flex-1 truncate">{label}</span>
                {isActive && <Check size={15} aria-hidden="true" className="shrink-0 text-teal" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
