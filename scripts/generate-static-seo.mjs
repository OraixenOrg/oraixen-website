/**
 * Static SEO metadata generation for the Vite SPA.
 *
 * This is NOT prerendering: no React is executed and no page content is
 * rendered here. Each generated file is a byte-for-byte copy of the built
 * dist/index.html shell — same hashed JS/CSS, fonts, analytics, favicons,
 * manifest, structured data and empty #root — with only the per-route
 * metadata tags swapped. React still boots and renders normally in the
 * browser; <Seo> keeps taking over for client-side navigation and language
 * changes.
 *
 * Titles and descriptions are read from the English locale files so there is
 * exactly one source of truth shared with the runtime pages.
 *
 * Runs automatically via the "postbuild" npm script. Node built-ins only.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const LOCALES = path.join(ROOT, 'src', 'i18n', 'locales', 'en');
const OUT_DIR_NAME = '__seo';
const SITE_URL = 'https://oraixen.com';

/**
 * Which routes get a static shell, and where each one's SEO copy comes from.
 * `/projects/:slug` is deliberately absent — case studies are being reworked
 * separately and keep falling back to the normal SPA shell.
 */
const ROUTES = [
  { route: '/',         output: 'index.html',                     file: 'home.json',     pick: (j) => j.seo },
  { route: '/about',    output: `${OUT_DIR_NAME}/about.html`,     file: 'about.json',    pick: (j) => j.seo },
  { route: '/services', output: `${OUT_DIR_NAME}/services.html`,  file: 'services.json', pick: (j) => j.seo },
  { route: '/projects', output: `${OUT_DIR_NAME}/projects.html`,  file: 'projects.json', pick: (j) => j.seo },
  { route: '/process',  output: `${OUT_DIR_NAME}/process.html`,   file: 'process.json',  pick: (j) => j.seo },
  { route: '/contact',  output: `${OUT_DIR_NAME}/contact.html`,   file: 'contact.json',  pick: (j) => j.seo },
  { route: '/privacy',  output: `${OUT_DIR_NAME}/privacy.html`,   file: 'legal.json',    pick: (j) => j.privacy?.seo },
  { route: '/terms',    output: `${OUT_DIR_NAME}/terms.html`,     file: 'legal.json',    pick: (j) => j.terms?.seo },
];

/** Escapes text for use in HTML text nodes and double-quoted attributes. */
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

const titleTag = /<title>[\s\S]*?<\/title>/;
const metaByName = (key) =>
  new RegExp(`<meta\\s+name="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*/?>`);
const metaByProperty = (key) =>
  new RegExp(`<meta\\s+property="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*/?>`);
const canonicalTag = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/;

async function readJson(file) {
  return JSON.parse(await readFile(path.join(LOCALES, file), 'utf8'));
}

function buildHtml(shell, { route, title, description }) {
  // Absolute, no trailing slash except the root itself.
  const url = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const u = escapeHtml(url);

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
  // og:image / twitter:image are intentionally left as the shell defines them.
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

  await mkdir(path.join(DIST, OUT_DIR_NAME), { recursive: true });

  const cache = new Map();
  for (const entry of ROUTES) {
    if (!cache.has(entry.file)) cache.set(entry.file, await readJson(entry.file));
    const seo = entry.pick(cache.get(entry.file));

    if (!seo || typeof seo.title !== 'string' || !seo.title.trim()) {
      throw new Error(`[generate-static-seo] Missing SEO title for ${entry.route} in ${entry.file}.`);
    }
    if (typeof seo.description !== 'string' || !seo.description.trim()) {
      throw new Error(`[generate-static-seo] Missing SEO description for ${entry.route} in ${entry.file}.`);
    }

    const html = buildHtml(shell, { route: entry.route, title: seo.title, description: seo.description });
    await writeFile(path.join(DIST, entry.output), html, 'utf8');
    console.log(`[generate-static-seo] ${entry.route.padEnd(10)} -> dist/${entry.output}`);
  }

  console.log(`[generate-static-seo] ${ROUTES.length} static route shells written.`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
