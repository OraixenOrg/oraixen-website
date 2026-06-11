import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  /** 'pill' for the navbar chip, 'plain' for the mobile overlay */
  variant?: 'pill' | 'plain';
}

/**
 * Toggles the whole site between English (LTR) and Arabic (RTL).
 * The label always shows the language you'll switch TO.
 */
export function LanguageSwitcher({ className = '', variant = 'pill' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation('common');
  const isAr = i18n.language?.startsWith('ar');

  const toggle = () => {
    i18n.changeLanguage(isAr ? 'en' : 'ar');
  };

  const base =
    variant === 'pill'
      ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-ink/70 border border-line hover:text-teal hover:border-teal/40 hover:bg-surface-subtle transition-colors'
      : 'inline-flex items-center gap-2 text-lg font-semibold text-ink/80 hover:text-teal transition-colors';

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${base} ${className}`}
      aria-label={t('lang.switchAria')}
    >
      <Languages size={16} aria-hidden="true" />
      <span>{t('lang.label')}</span>
    </button>
  );
}
