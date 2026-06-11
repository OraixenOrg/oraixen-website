import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    ns: NAMESPACES as unknown as string[],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'oraixen_lang',
      caches: ['localStorage'],
    },
  });

/** Keep <html dir/lang> in sync with the active language. */
function applyDocumentDirection(lng: string): void {
  const dir = i18n.dir(lng);
  const lang = lng.startsWith('ar') ? 'ar' : 'en';
  const el = document.documentElement;
  el.setAttribute('dir', dir);
  el.setAttribute('lang', lang);
}

applyDocumentDirection(i18n.language || 'en');
i18n.on('languageChanged', applyDocumentDirection);

export default i18n;
