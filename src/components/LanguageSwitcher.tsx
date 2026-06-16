import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  /** 'pill' for the navbar icon button, 'plain' for the mobile overlay (icon + text) */
  variant?: 'pill' | 'plain';
}

/**
 * Toggles the whole site between English (LTR) and Arabic (RTL).
 * The 'pill' variant is an icon-only round button matching the ThemeSwitcher;
 * the tooltip/aria announces the language you'll switch TO.
 */
export function LanguageSwitcher({ className = '', variant = 'pill' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation('common');
  const isAr = i18n.language?.startsWith('ar');

  const toggle = () => {
    i18n.changeLanguage(isAr ? 'en' : 'ar');
  };

  if (variant === 'plain') {
    return (
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex items-center gap-2 text-lg font-semibold text-ink/80 hover:text-teal transition-colors ${className}`}
        aria-label={t('lang.switchAria')}
      >
        <Languages size={18} aria-hidden="true" />
        <span>{t('lang.label')}</span>
      </button>
    );
  }

  // Icon-only round button — mirrors ThemeSwitcher so the two sit together cleanly.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('lang.switchAria')}
      title={t('lang.label')}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-ink/70 border border-line hover:text-teal hover:border-teal/40 hover:bg-surface-subtle transition-colors ${className}`}
    >
      <Languages size={17} aria-hidden="true" />
    </button>
  );
}
