import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://oraixen.com';

interface SeoProps {
  /** Full, already-localized <title> string. */
  title: string;
  /** Meta description / og:description / twitter:description. */
  description?: string;
  /** Canonical path override; defaults to the current route. */
  path?: string;
  /** Absolute og:image URL override. */
  image?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-route SEO. This is a single-page app, so the static tags in index.html never
 * change as you navigate — this component keeps the document title, description,
 * canonical URL and Open Graph / Twitter tags in sync with the active route AND the
 * active language (titles re-render when the user flips EN ⇄ AR). Renders nothing.
 */
export function Seo({ title, description, path, image }: SeoProps) {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');

  useEffect(() => {
    const url = `${SITE_URL}${path ?? pathname}`;
    const locale = isAr ? 'ar_AR' : 'en_US';
    const altLocale = isAr ? 'en_US' : 'ar_AR';

    document.title = title;
    upsertMeta('name', 'title', title);
    upsertMeta('property', 'og:title', title);
    upsertMeta('name', 'twitter:title', title);

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }

    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:url', url);
    upsertMeta('property', 'og:locale', locale);
    upsertMeta('property', 'og:locale:alternate', altLocale);

    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }

    upsertLink('canonical', url);
  }, [title, description, path, pathname, isAr, image]);

  return null;
}
