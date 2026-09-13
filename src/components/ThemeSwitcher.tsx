import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getInitialTheme, setTheme, type Theme } from '../theme';

interface ThemeSwitcherProps {
  className?: string;
}

/** Toggles the whole site between light and dark mode (persisted to localStorage). */
export function ThemeSwitcher({ className = '' }: ThemeSwitcherProps) {
  const { t } = useTranslation('common');
  const [theme, setLocalTheme] = useState<Theme>(getInitialTheme());

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setLocalTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('theme.toggleAria')}
      title={t('theme.toggleAria')}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-ink/70 border border-line hover:text-teal hover:border-teal/40 hover:bg-surface-subtle transition-colors ${className}`}
    >
      {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
