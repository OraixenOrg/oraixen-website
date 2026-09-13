/**
 * Static SEO metadata generation for the three-market Vite SPA.
 *
 * This is NOT prerendering: no React is executed and no page content is
 * rendered. Every generated file is a copy of the built dist/index.html shell —
 * same hashed JS/CSS, fonts, analytics, favicons, manifest, structured data and
 * empty #root — with only the per-route, per-market metadata swapped. React
 * still boots and renders in the browser, and <Seo> takes over for client-side
 * navigation.
 *
 * 8 core routes x 3 markets = 24 localized shells, plus the normalized
 * dist/index.html that remains the SPA fallback for dynamic routes.
 *
 * Titles and descriptions come from the existing locale files. Both Arabic
 * markets deliberately share src/i18n/locales/ar — the market lives in the URL,
 * not in a duplicated translation tree.
 *
 * Runs automatically via the "postbuild" npm script. Node built-ins only.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const LOCALES = path.join(ROOT, 'src', 'i18n', 'locales');
const OUT_DIR_NAME = '__seo';
const SITE_URL = 'https://oraixen.com';

/**
 * Mirror of src/lib/marketLocale.ts, which is TypeScript and cannot be imported
 * by this plain-Node script. src/lib/marketLocale.ts is the source of truth —
 * keep these values identical to it.
 */
const MARKETS = {
  en:      { prefix: '/en',    localeDir: 'en', htmlLang: 'en',    dir: 'ltr', hreflang: 'en',    ogLocale: 'en_US', metaLanguage: 'English' },
  'ar-eg': { prefix: '/ar-eg', localeDir: 'ar', htmlLang: 'ar-EG', dir: 'rtl', hreflang: 'ar-EG', ogLocale: 'ar_EG', metaLanguage: 'Arabic' },
  'ar-sa': { prefix: '/ar-sa', localeDir: 'ar', htmlLang: 'ar-SA', dir: 'rtl', hreflang: 'ar-SA', ogLocale: 'ar_SA', metaLanguage: 'Arabic' },
};
const MARKET_IDS = ['en', 'ar-eg', 'ar-sa'];
const DEFAULT_MARKET = 'en';

/**
 * The eight core static routes. `/projects/:slug` is deliberately absent —
 * case-study shells are out of scope and keep using the SPA fallback.
 */
const ROUTES = [
  { name: 'index',    route: '/',         file: 'home.json',     pick: (j) => j.seo },
  { name: 'about',    route: '/about',    file: 'about.json',    pick: (j) => j.seo },
  { name: 'services', route: '/services', file: 'services.json', pick: (j) => j.seo },
  { name: 'projects', route: '/projects', file: 'projects.json', pick: (j) => j.seo },
  { name: 'process',  route: '/process',  file: 'process.json',  pick: (j) => j.seo },
  { name: 'contact',  route: '/contact',  file: 'contact.json',  pick: (j) => j.seo },
  { name: 'privacy',  route: '/privacy',  file: 'legal.json',    pick: (j) => j.privacy?.seo },
  { name: 'terms',    route: '/terms',    file: 'legal.json',    pick: (j) => j.terms?.seo },
];

/** Escapes text for HTML text nodes and double-quoted attributes. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Public URL for a route in a market: '/about' + 'ar-sa' -> '/ar-sa/about'. */
function publicPath(route, market) {
  const { prefix } = MARKETS[market];
  return route === '/' ? prefix : `${prefix}${route}`;
}

function absoluteUrl(publicPathValue) {
  return `${SITE_URL}${publicPathValue}`;
}

/**
 * Replaces a tag that must appear exactly once. Anything else — the tag went
 * missing because index.html was restructured, or it was duplicated — throws,
 * so the build fails instead of shipping partially-correct metadata.
 */
function replaceUnique(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, `${pattern.flags.replace('g', '')}g`));
  const count = matches ? matches.length : 0;

  if (count !== 1) {
    throw new Error(
      `[generate-static-seo] Expected exactly one ${label} in dist/index.html, found ${count}. ` +
        'The HTML shell changed — update scripts/generate-static-seo.mjs to match index.html.'
    );
  }

  // Function replacement so "$&" and friends inside the copy stay literal.
  return html.replace(pattern, () => replacement);
}

const htmlTag = /<html[^>]*>/;
const titleTag = /<title>[\s\S]*?<\/title>/;
const metaByName = (key) => new RegExp(`<meta\\s+name="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*/?>`);
const metaByProperty = (key) => new RegExp(`<meta\\s+property="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*/?>`);
const canonicalTag = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/;
const localeAlternateTag = /<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/?>/;

async function readJson(dir, file) {
  return JSON.parse(await readFile(path.join(LOCALES, dir, file), 'utf8'));
}

/** The four alternate links every localized page must expose. */
function buildHreflangBlock(route) {
  const links = MARKET_IDS.map((market) => ({
    hreflang: MARKETS[market].hreflang,
    href: absoluteUrl(publicPath(route, market)),
  }));

  // Home's x-default is the bare origin, which becomes the market-selecting
  // entry point; every other route defaults to its English equivalent.
  links.push({
    hreflang: 'x-default',
    href: route === '/' ? `${SITE_URL}/` : absoluteUrl(publicPath(route, DEFAULT_MARKET)),
  });

  if (links.length !== 4 || links.some((l) => !l.hreflang || !l.href.startsWith(SITE_URL))) {
    throw new Error(`[generate-static-seo] Malformed hreflang set for route ${route}.`);
  }

  return links
    .map((l) => `<link rel="alternate" hreflang="${escapeHtml(l.hreflang)}" href="${escapeHtml(l.href)}" />`)
    .join('\n    ');
}

function buildLocalizedShell(shell, { route, market, title, description }) {
  const cfg = MARKETS[market];
  if (!cfg || !cfg.htmlLang || !cfg.ogLocale || !cfg.dir) {
    throw new Error(`[generate-static-seo] Malformed locale metadata for market ${market}.`);
  }

  const url = absoluteUrl(publicPath(route, market));
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const u = escapeHtml(url);

  let html = shell;

  // Document language and direction.
  html = replaceUnique(html, htmlTag, `<html lang="${escapeHtml(cfg.htmlLang)}" dir="${cfg.dir}">`, '<html> tag');
  html = replaceUnique(html, metaByName('language'), `<meta name="language" content="${escapeHtml(cfg.metaLanguage)}" />`, 'meta[name="language"]');

  // Core metadata.
  html = replaceUnique(html, titleTag, `<title>${t}</title>`, '<title>');
  html = replaceUnique(html, metaByName('title'), `<meta name="title" content="${t}" />`, 'meta[name="title"]');
  html = replaceUnique(html, metaByName('description'), `<meta name="description" content="${d}" />`, 'meta[name="description"]');

  // Canonical + the four hreflang alternates, inserted at a deterministic anchor.
  html = replaceUnique(
    html,
    canonicalTag,
    `<link rel="canonical" href="${u}" />\n    ${buildHreflangBlock(route)}`,
    'link[rel="canonical"]'
  );

  // Open Graph.
  html = replaceUnique(html, metaByProperty('og:url'), `<meta property="og:url" content="${u}" />`, 'meta[property="og:url"]');
  html = replaceUnique(html, metaByProperty('og:title'), `<meta property="og:title" content="${t}" />`, 'meta[property="og:title"]');
  html = replaceUnique(html, metaByProperty('og:description'), `<meta property="og:description" content="${d}" />`, 'meta[property="og:description"]');
  html = replaceUnique(html, metaByProperty('og:locale'), `<meta property="og:locale" content="${cfg.ogLocale}" />`, 'meta[property="og:locale"]');

  // og:locale:alternate legitimately repeats: one per other market.
  const alternates = MARKET_IDS.filter((m) => m !== market)
    .map((m) => `<meta property="og:locale:alternate" content="${MARKETS[m].ogLocale}" />`)
    .join('\n    ');
  html = replaceUnique(html, localeAlternateTag, alternates, 'meta[property="og:locale:alternate"]');

  // Twitter.
  html = replaceUnique(html, metaByName('twitter:url'), `<meta name="twitter:url" content="${u}" />`, 'meta[name="twitter:url"]');
  html = replaceUnique(html, metaByName('twitter:title'), `<meta name="twitter:title" content="${t}" />`, 'meta[name="twitter:title"]');
  html = replaceUnique(html, metaByName('twitter:description'), `<meta name="twitter:description" content="${d}" />`, 'meta[name="twitter:description"]');

  // og:image / twitter:image and the structured data are inherited unchanged.
  return html;
}

/**
 * dist/index.html stays the SPA fallback for dynamic routes (e.g.
 * /ar-sa/projects/:slug), so it keeps neutral English home metadata pointing at
 * the bare origin. Runtime <Seo> replaces it per route once React boots. No
 * hreflang here: the correct set depends on the route, which is unknown.
 */
function buildFallbackShell(shell, { title, description }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const u = `${SITE_URL}/`;

  let html = shell;
  html = replaceUnique(html, titleTag, `<title>${t}</title>`, '<title>');
  html = replaceUnique(html, metaByName('title'), `<meta name="title" content="${t}" />`, 'meta[name="title"]');
  html = replaceUnique(html, metaByName('description'), `<meta name="description" content="${d}" />`, 'meta[name="description"]');
  html = replaceUnique(html, canonicalTag, `<link rel="canonical" href="${u}" />`, 'link[rel="canonical"]');
  html = replaceUnique(html, metaByProperty('og:url'), `<meta property="og:url" content="${u}" />`, 'meta[property="og:url"]');
  html = replaceUnique(html, metaByProperty('og:title'), `<meta property="og:title" content="${t}" />`, 'meta[property="og:title"]');
  html = replaceUnique(html, metaByProperty('og:description'), `<meta property="og:description" content="${d}" />`, 'meta[property="og:description"]');
  html = replaceUnique(html, metaByName('twitter:url'), `<meta name="twitter:url" content="${u}" />`, 'meta[name="twitter:url"]');
  html = replaceUnique(html, metaByName('twitter:title'), `<meta name="twitter:title" content="${t}" />`, 'meta[name="twitter:title"]');
  html = replaceUnique(html, metaByName('twitter:description'), `<meta name="twitter:description" content="${d}" />`, 'meta[name="twitter:description"]');
  return html;
}

async function main() {
  const indexPath = path.join(DIST, 'index.html');
  let shell;
  try {
    shell = await readFile(indexPath, 'utf8');
  } catch {
    throw new Error('[generate-static-seo] dist/index.html not found. Run "vite build" first.');
  }

  if (!shell.includes('<div id="root"></div>')) {
    throw new Error('[generate-static-seo] dist/index.html has no <div id="root"></div> mount point.');
  }

  const cache = new Map();
  const loadSeo = async (dir, entry) => {
    const key = `${dir}/${entry.file}`;
    if (!cache.has(key)) cache.set(key, await readJson(dir, entry.file));
    const seo = entry.pick(cache.get(key));

    if (!seo || typeof seo.title !== 'string' || !seo.title.trim()) {
      throw new Error(`[generate-static-seo] Missing SEO title for ${entry.route} in ${dir}/${entry.file}.`);
    }
    if (typeof seo.description !== 'string' || !seo.description.trim()) {
      throw new Error(`[generate-static-seo] Missing SEO description for ${entry.route} in ${dir}/${entry.file}.`);
    }
    return seo;
  };

  let written = 0;
  for (const market of MARKET_IDS) {
    const { localeDir } = MARKETS[market];
    await mkdir(path.join(DIST, OUT_DIR_NAME, market), { recursive: true });

    for (const entry of ROUTES) {
      const seo = await loadSeo(localeDir, entry);
      const html = buildLocalizedShell(shell, {
        route: entry.route,
        market,
        title: seo.title,
        description: seo.description,
      });
      await writeFile(path.join(DIST, OUT_DIR_NAME, market, `${entry.name}.html`), html, 'utf8');
      written += 1;
    }
    console.log(`[generate-static-seo] ${market.padEnd(6)} -> ${ROUTES.length} shells in dist/${OUT_DIR_NAME}/${market}/`);
  }

  const homeSeo = await loadSeo('en', ROUTES[0]);
  await writeFile(indexPath, buildFallbackShell(shell, homeSeo), 'utf8');
  console.log('[generate-static-seo] SPA fallback -> dist/index.html (English home metadata)');
  console.log(`[generate-static-seo] ${written} localized shells written.`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
