import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  DEFAULT_MARKET,
  getMarketConfig,
  parseMarketFromPath,
  type MarketLocale,
} from '../lib/marketLocale';

import enCommon from './locales/en/common.json';
import egCommon from './locales/ar-eg/common.json';
import saCommon from './locales/ar-sa/common.json';
import enHome from './locales/en/home.json';
import egHome from './locales/ar-eg/home.json';
import saHome from './locales/ar-sa/home.json';
import enAbout from './locales/en/about.json';
import egAbout from './locales/ar-eg/about.json';
import saAbout from './locales/ar-sa/about.json';
import enServices from './locales/en/services.json';
import egServices from './locales/ar-eg/services.json';
import saServices from './locales/ar-sa/services.json';
import enProjects from './locales/en/projects.json';
import egProjects from './locales/ar-eg/projects.json';
import saProjects from './locales/ar-sa/projects.json';
import enProjectDetail from './locales/en/projectDetail.json';
import egProjectDetail from './locales/ar-eg/projectDetail.json';
import saProjectDetail from './locales/ar-sa/projectDetail.json';
import enProcess from './locales/en/process.json';
import egProcess from './locales/ar-eg/process.json';
import saProcess from './locales/ar-sa/process.json';
import enContact from './locales/en/contact.json';
import egContact from './locales/ar-eg/contact.json';
import saContact from './locales/ar-sa/contact.json';
import enLegal from './locales/en/legal.json';
import egLegal from './locales/ar-eg/legal.json';
import saLegal from './locales/ar-sa/legal.json';
import enSolutionCustomSystems from './locales/en/solutionCustomSystems.json';
import egSolutionCustomSystems from './locales/ar-eg/solutionCustomSystems.json';
import saSolutionCustomSystems from './locales/ar-sa/solutionCustomSystems.json';
import enSolutionRealEstateSystems from './locales/en/solutionRealEstateSystems.json';
import egSolutionRealEstateSystems from './locales/ar-eg/solutionRealEstateSystems.json';
import saSolutionRealEstateSystems from './locales/ar-sa/solutionRealEstateSystems.json';
import enConsent from './locales/en/consent.json';
import egConsent from './locales/ar-eg/consent.json';
import saConsent from './locales/ar-sa/consent.json';
import enSections from './locales/en/sections.json';
import egSections from './locales/ar-eg/sections.json';
import saSections from './locales/ar-sa/sections.json';

export const NAMESPACES = [
  'common',
  'home',
  'about',
  'services',
  'projects',
  'projectDetail',
  'process',
  'contact',
  'solutionCustomSystems',
  'solutionRealEstateSystems',
  'consent',
  'legal',
  'sections',
] as const;

/**
 * One complete content tree per market. There is deliberately no generic `ar`
 * resource: Egypt and Saudi Arabia are separate commercial audiences and each
 * gets its own copy, so nothing can silently fall back from one to the other.
 * The keys here are i18next language ids and match MarketConfig.language.
 */
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
    solutionCustomSystems: enSolutionCustomSystems,
    solutionRealEstateSystems: enSolutionRealEstateSystems,
    consent: enConsent,
    legal: enLegal,
    sections: enSections,
  },
  'ar-eg': {
    common: egCommon,
    home: egHome,
    about: egAbout,
    services: egServices,
    projects: egProjects,
    projectDetail: egProjectDetail,
    process: egProcess,
    contact: egContact,
    solutionCustomSystems: egSolutionCustomSystems,
    solutionRealEstateSystems: egSolutionRealEstateSystems,
    consent: egConsent,
    legal: egLegal,
    sections: egSections,
  },
  'ar-sa': {
    common: saCommon,
    home: saHome,
    about: saAbout,
    services: saServices,
    projects: saProjects,
    projectDetail: saProjectDetail,
    process: saProcess,
    contact: saContact,
    solutionCustomSystems: saSolutionCustomSystems,
    solutionRealEstateSystems: saSolutionRealEstateSystems,
    consent: saConsent,
    legal: saLegal,
    sections: saSections,
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
    supportedLngs: ['en', 'ar-eg', 'ar-sa'],
    // Keep i18next's language ids byte-identical to the market ids. Without
    // this it canonicalizes 'ar-eg' to 'ar-EG' (Intl.getCanonicalLocales) and
    // then finds no matching resource key.
    lowerCaseLng: true,
    // 'currentOnly' stops i18next from also resolving the bare language part.
    // The old 'languageOnly' would collapse both Arabic markets back to 'ar',
    // which is exactly the shared tree this architecture removes.
    load: 'currentOnly',
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
