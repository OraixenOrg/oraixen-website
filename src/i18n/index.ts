import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  DEFAULT_MARKET,
  getMarketConfig,
  parseMarketFromPath,
  type MarketLocale,
} from '../lib/marketLocale';

import enCommon from './locales/en/common.json';
import arCommon from './locales/ar/common.json';
import enHome from './locales/en/home.json';
import arHome from './locales/ar/home.json';
import enAbout from './locales/en/about.json';
import arAbout from './locales/ar/about.json';
import enServices from './locales/en/services.json';
import arServices from './locales/ar/services.json';
import enProjects from './locales/en/projects.json';
import arProjects from './locales/ar/projects.json';
import enProjectDetail from './locales/en/projectDetail.json';
import arProjectDetail from './locales/ar/projectDetail.json';
import enProcess from './locales/en/process.json';
import arProcess from './locales/ar/process.json';
import enContact from './locales/en/contact.json';
import arContact from './locales/ar/contact.json';
import enLegal from './locales/en/legal.json';
import arLegal from './locales/ar/legal.json';
import enSections from './locales/en/sections.json';
import arSections from './locales/ar/sections.json';

export const NAMESPACES = [
  'common',
  'home',
  'about',
  'services',
  'projects',
  'projectDetail',
  'process',
  'contact',
  'legal',
  'sections',
] as const;

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    services: enServices,
    projects: enProjects,
    projectDetail: enProjectDetail,
    process: enProcess,
    contact: enContact,
    legal: enLegal,
    sections: enSections,
  },
  ar: {
    common: arCommon,
    home: arHome,
    about: arAbout,
    services: arServices,
    projects: arProjects,
    projectDetail: arProjectDetail,
    process: arProcess,
    contact: arContact,
    legal: arLegal,
    sections: arSections,
  },
} as const;

/**
 * The URL is the single authority for language.
 *
 * i18next-browser-languagedetector is deliberately NOT used: a stale
 * `oraixen_lang` value in localStorage must never win over /en, /ar-eg or
 * /ar-sa. There is no navigator-language and no country detection here.
 */
const initialMarket: MarketLocale =
  parseMarketFromPath(typeof window === 'undefined' ? '/' : window.location.pathname) ?? DEFAULT_MARKET;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getMarketConfig(initialMarket).language,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    ns: NAMESPACES as unknown as string[],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

function loadArabicFont(): void {
  if (document.getElementById('oraixen-font-ar')) return;
  const link = document.createElement('link');
  link.id = 'oraixen-font-ar';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap';
  document.head.appendChild(link);
}

/**
 * Keeps <html lang/dir> in sync with the ACTIVE MARKET, so a regional Arabic URL
 * reports lang="ar-EG"/"ar-SA" rather than a generic "ar".
 */
export function applyDocumentLocale(market: MarketLocale): void {
  const { htmlLang, dir } = getMarketConfig(market);
  const el = document.documentElement;
  el.setAttribute('dir', dir);
  el.setAttribute('lang', htmlLang);
  if (dir === 'rtl') loadArabicFont();
}

// Applied before first render so a direct Arabic URL is RTL immediately.
applyDocumentLocale(initialMarket);

export default i18n;
