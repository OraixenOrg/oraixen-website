export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'oraixen_theme';

export function getStoredTheme(): Theme | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'light' || v === 'dark' ? v : null;
}

export function getInitialTheme(): Theme {
  // Default to light on first visit; only an explicit choice (stored) overrides it.
  return getStoredTheme() ?? 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

// Apply immediately on import (before React renders) to avoid a flash.
applyTheme(getInitialTheme());
