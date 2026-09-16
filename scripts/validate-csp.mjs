/**
 * Build-time Content-Security-Policy validation for the built output.
 *
 * The policy in public/.htaccess is ENFORCING, and it authorizes three inline
 * JSON-LD blocks by SHA-256 hash. Hashes are byte-sensitive: a single character
 * added to the structured data in index.html, or to the shell generator that
 * copies it into the 30 localized files, silently invalidates them — and now
 * that the policy enforces, the browser refuses to run the affected block
 * outright, so the structured data every market's SEO depends on disappears.
 * None of that is visible in a passing build, so this script makes it visible.
 *
 * Read-only. It never writes or repairs anything in dist/ — a policy that no
 * longer matches the build is a decision for a human, not something a build
 * step should paper over by regenerating hashes.
 *
 * Runs automatically via the "postbuild" npm script, AFTER
 * scripts/generate-static-seo.mjs, so it sees the final 31 HTML files. Node
 * built-ins only.
 */

import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const HTACCESS = path.join(DIST, '.htaccess');
const SEO_DIR = path.join(DIST, '__seo');

/** Mirrors scripts/generate-static-seo.mjs: 10 routes x 3 markets, + the SPA fallback. */
const EXPECTED_HTML_FILES = 31;

const REPORT_ONLY_HEADER = 'content-security-policy-report-only';
const ENFORCING_HEADER = 'content-security-policy';

/**
 * Directives that must never name a whole scheme or the world. Checked per
 * directive rather than across the raw string so that a legitimate
 * `https://*.google-analytics.com` is not confused with a bare `*` or `https:`.
 */
const FETCH_DIRECTIVES = [
  'default-src', 'script-src', 'script-src-elem', 'script-src-attr',
  'style-src', 'style-src-elem', 'style-src-attr', 'img-src', 'font-src',
  'connect-src', 'media-src', 'object-src', 'frame-src', 'worker-src',
  'manifest-src', 'child-src', 'form-action', 'base-uri', 'frame-ancestors',
];

/** Schemes that would defeat the policy if allowed wholesale. */
const BROAD_SCHEMES = ['https:', 'http:', 'data:', 'blob:', 'filesystem:', 'mediastream:', '*'];

/** data: is legitimate for images only (the inline SVG grain texture). */
const SCHEME_EXCEPTIONS = { 'img-src': ['data:'] };

const failures = [];
const fail = (message) => failures.push(message);

// ---------------------------------------------------------------------------
// .htaccess header extraction
// ---------------------------------------------------------------------------

/**
 * Finds `Header ... set <name> "<value>"` directives, ignoring comment lines.
 *
 * The header name is matched with an explicit end-of-token boundary so that
 * Content-Security-Policy-Report-Only can never be counted as an enforcing
 * Content-Security-Policy. A naive substring test gets that backwards and
 * reports a report-only canary as an enforced policy.
 */
function findHeaderDirectives(htaccess, headerName) {
  const found = [];
  for (const rawLine of htaccess.split('\n')) {
    const line = rawLine.trim();
    if (line === '' || line.startsWith('#')) continue;

    const match = /^Header\s+(?:always\s+|onsuccess\s+)?(set|append|add|edit|echo|merge|setifempty)\s+(\S+)\s*(.*)$/i.exec(line);
    if (!match) continue;

    const [, action, name, rest] = match;
    if (name.replace(/^"|"$/g, '').toLowerCase() !== headerName) continue;

    const quoted = /^"([^"]*)"/.exec(rest);
    found.push({ action: action.toLowerCase(), value: quoted ? quoted[1] : rest.trim() });
  }
  return found;
}

/** Splits a policy into `{ name -> [source, ...] }`. */
function parsePolicy(policy) {
  const directives = new Map();
  for (const chunk of policy.split(';')) {
    const parts = chunk.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) continue;
    directives.set(parts[0].toLowerCase(), parts.slice(1));
  }
  return directives;
}

// ---------------------------------------------------------------------------
// HTML inspection
// ---------------------------------------------------------------------------

async function collectHtmlFiles() {
  const files = [path.join(DIST, 'index.html')];
  let markets;
  try {
    markets = await readdir(SEO_DIR, { withFileTypes: true });
  } catch {
    fail(`missing generated shell directory: ${path.relative(ROOT, SEO_DIR)}`);
    return files;
  }
  for (const market of markets.filter((entry) => entry.isDirectory())) {
    const dir = path.join(SEO_DIR, market.name);
    for (const name of (await readdir(dir)).filter((n) => n.endsWith('.html')).sort()) {
      files.push(path.join(dir, name));
    }
  }
  return files.sort();
}

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;

/**
 * Any attribute whose name starts with "on".
 *
 * `script-src-attr 'none'` authorizes NO inline event handler, so the build
 * invariant is "no on* attribute at all" rather than "none of the handlers we
 * happened to think of". An enumerated list cannot express that: it silently
 * passes onbeforetoggle, onpointerrawupdate, and whatever the platform ships
 * next, which is exactly the case where a missed handler is most likely.
 *
 * Deliberately over-broad, and verified to be: "only" and "once" match this
 * rule and would fail the build even though neither is an event handler. That
 * is the intended trade. Failing a build over a harmless attribute name is a
 * cheap, visible mistake that a human resolves in one line; shipping an
 * executable handler under an enforcing CSP is neither cheap nor visible. The
 * build emits no such attribute today, so the cost is currently zero.
 */
const EVENT_HANDLER_NAME = /^on[a-z0-9:_.-]+$/i;

/** Elements whose content is text, not markup, and must not be tokenized. */
const RAW_TEXT_ELEMENTS = new Set(['script', 'style', 'textarea', 'title']);

const WHITESPACE = new Set([' ', '\t', '\n', '\r', '\f']);
const isAsciiAlpha = (ch) => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');

/**
 * Extracts event-handler attributes by walking HTML START TAGS only.
 *
 * A plain `/on\w+=/` over the whole document cannot tell an attribute from
 * prose or from JSON-LD text, so it would both miss real handlers inside odd
 * markup and fail the build on the word "onclick=" in a sentence. This walks
 * the document the way a parser does instead: text between tags is never
 * inspected, and the content of raw-text elements — above all the three inline
 * <script type="application/ld+json"> blocks, which hold arbitrary strings — is
 * skipped wholesale to its closing tag.
 *
 * A full HTML5 tokenizer is not needed and not wanted (no dependency, Node
 * built-ins only). This handles the subset the build actually emits: comments,
 * doctype, end tags, quoted/unquoted/valueless attributes, and raw text.
 *
 * @returns {Array<{ name: string, tag: string, line: number }>}
 */
export function findEventHandlerAttributes(html) {
  const found = [];
  let i = 0;

  const lineAt = (index) => {
    let line = 1;
    for (let k = 0; k < index; k += 1) if (html[k] === '\n') line += 1;
    return line;
  };

  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) break;
    const next = html[lt + 1];

    // Comment: skip to the terminator. Handler-looking text inside a comment is
    // inert, and the removed font trick left exactly that kind of prose behind.
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }
    // Doctype, CDATA, processing instruction, end tag: nothing to inspect.
    if (next === '!' || next === '?' || next === '/') {
      const end = html.indexOf('>', lt);
      i = end === -1 ? html.length : end + 1;
      continue;
    }
    // Not a tag at all — a bare "<" in text. Move past it and keep scanning.
    if (!isAsciiAlpha(next ?? '')) {
      i = lt + 1;
      continue;
    }

    // --- start tag ---
    let p = lt + 1;
    while (p < html.length && !WHITESPACE.has(html[p]) && html[p] !== '>' && html[p] !== '/') p += 1;
    const tagName = html.slice(lt + 1, p).toLowerCase();

    let selfClosing = false;
    while (p < html.length) {
      while (p < html.length && WHITESPACE.has(html[p])) p += 1;
      if (p >= html.length) break;

      if (html[p] === '/') { selfClosing = true; p += 1; continue; }
      if (html[p] === '>') { p += 1; break; }

      const nameStart = p;
      while (
        p < html.length &&
        !WHITESPACE.has(html[p]) &&
        html[p] !== '=' &&
        html[p] !== '>' &&
        html[p] !== '/'
      ) p += 1;
      const attrName = html.slice(nameStart, p);
      if (attrName === '') { p += 1; continue; }

      if (EVENT_HANDLER_NAME.test(attrName)) {
        found.push({ name: attrName, tag: tagName, line: lineAt(nameStart) });
      }

      while (p < html.length && WHITESPACE.has(html[p])) p += 1;
      if (html[p] !== '=') continue; // Valueless attribute; next one follows.
      p += 1;
      while (p < html.length && WHITESPACE.has(html[p])) p += 1;

      const quote = html[p];
      if (quote === '"' || quote === "'") {
        const end = html.indexOf(quote, p + 1);
        p = end === -1 ? html.length : end + 1;
      } else {
        while (p < html.length && !WHITESPACE.has(html[p]) && html[p] !== '>') p += 1;
      }
    }

    // Raw text: everything up to the matching close tag is character data, so
    // JSON-LD payloads and CSS can never be read as attributes.
    if (RAW_TEXT_ELEMENTS.has(tagName) && !selfClosing) {
      const closeRe = new RegExp(`</${tagName}[\\s/>]`, 'i');
      const rest = html.slice(p);
      const match = closeRe.exec(rest);
      p = match ? p + match.index : html.length;
    }

    i = p;
  }

  return found;
}

function sriHash(body) {
  return `sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`;
}

/** Resolves a script src to the origin CSP would match it against. */
function originOf(src) {
  if (/^https?:\/\//i.test(src)) return new URL(src).origin;
  if (src.startsWith('//')) return `https:${src}`;
  return 'self';
}

/** CSP host-source matching, limited to the forms this policy actually uses. */
function originAllowed(origin, sources) {
  if (origin === 'self') return sources.includes("'self'");
  return sources.some((source) => {
    if (!source.startsWith('https://') && !source.startsWith('http://')) return false;
    if (source === origin) return true;
    const wildcard = /^(https?:\/\/)\*\.(.+)$/.exec(source);
    if (!wildcard) return false;
    const [, scheme, domain] = wildcard;
    return origin.startsWith(scheme) && origin.slice(scheme.length).endsWith(`.${domain}`);
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  let htaccess;
  try {
    htaccess = await readFile(HTACCESS, 'utf8');
  } catch {
    throw new Error(`dist/.htaccess is missing — the build did not copy public/.htaccess`);
  }

  // Header names are matched as whole tokens, so the report-only header can
  // never be counted as the enforcing one. A naive substring test gets this
  // exactly backwards and reports a canary as an enforced policy.
  const enforcing = findHeaderDirectives(htaccess, ENFORCING_HEADER);
  const reportOnly = findHeaderDirectives(htaccess, REPORT_ONLY_HEADER);

  if (enforcing.length !== 1) {
    fail(`expected exactly 1 enforcing Content-Security-Policy header, found ${enforcing.length}`);
  }
  if (reportOnly.length !== 0) {
    fail(
      `found ${reportOnly.length} Content-Security-Policy-Report-Only header(s); ` +
      'the canary was promoted to an enforcing policy and must not be re-added alongside it'
    );
  }

  const policyText = enforcing.length === 1 ? enforcing[0].value : '';
  const policy = parsePolicy(policyText);

  if (enforcing.length === 1 && enforcing[0].action !== 'set') {
    fail(`enforcing header uses "Header ${enforcing[0].action}"; only "set" produces a single policy`);
  }

  // This file only ever sees the application's own .htaccess. Hostinger adds a
  // separate enforcing upgrade-insecure-requests header at runtime, which is
  // not in dist/ and is deliberately neither simulated nor depended on here.
  const upgradeCount = policyText
    .split(';')
    .filter((chunk) => chunk.trim().toLowerCase() === 'upgrade-insecure-requests').length;
  if (upgradeCount !== 1) {
    fail(`expected upgrade-insecure-requests exactly once in the application policy, found ${upgradeCount}`);
  }

  // --- G/H/I/J: the policy must not defeat itself --------------------------
  const scriptSources = [...(policy.get('script-src') ?? []), ...(policy.get('script-src-elem') ?? [])];
  if (scriptSources.includes("'unsafe-inline'")) fail("script-src/script-src-elem contains 'unsafe-inline'");
  if (policyText.includes("'unsafe-eval'")) fail("policy contains 'unsafe-eval'");
  if (policyText.includes("'strict-dynamic'")) fail("policy contains 'strict-dynamic', which would bypass the host allowlist");

  for (const [name, sources] of policy) {
    if (!FETCH_DIRECTIVES.includes(name)) continue;
    const allowed = SCHEME_EXCEPTIONS[name] ?? [];
    for (const source of sources) {
      if (BROAD_SCHEMES.includes(source) && !allowed.includes(source)) {
        fail(`${name} allows the broad source "${source}"`);
      }
    }
  }

  for (const required of ['default-src', 'script-src', 'script-src-elem', 'script-src-attr', 'object-src', 'base-uri', 'frame-ancestors']) {
    if (!policy.has(required)) fail(`policy is missing the ${required} directive`);
  }
  if (!(policy.get('script-src-attr') ?? []).includes("'none'")) {
    fail("script-src-attr must be 'none': no inline event handler is authorized");
  }

  const allowedHashes = new Set(
    scriptSources.filter((s) => s.startsWith("'sha256-")).map((s) => s.slice(1, -1))
  );

  // --- A-F, K: every built HTML file ---------------------------------------
  const htmlFiles = await collectHtmlFiles();
  const inlineHashes = new Map();
  const externalOrigins = new Set();
  let inlineCount = 0;
  let handlerCount = 0;

  for (const file of htmlFiles) {
    const rel = path.relative(ROOT, file);
    const html = await readFile(file, 'utf8');

    for (const handler of findEventHandlerAttributes(html)) {
      handlerCount += 1;
      fail(
        `${rel}:${handler.line}: inline event-handler attribute "${handler.name}" ` +
        `on <${handler.tag}> (script-src-attr 'none' forbids it)`
      );
    }

    SCRIPT_RE.lastIndex = 0;
    for (const match of html.matchAll(SCRIPT_RE)) {
      const [, attributes, body] = match;
      const srcMatch = /\ssrc\s*=\s*"([^"]*)"/i.exec(attributes);

      if (srcMatch) {
        const origin = originOf(srcMatch[1]);
        externalOrigins.add(origin);
        const elem = policy.get('script-src-elem') ?? policy.get('script-src') ?? [];
        if (!originAllowed(origin, elem)) {
          fail(`${rel}: external script "${srcMatch[1]}" resolves to ${origin}, which script-src-elem does not allow`);
        }
        continue;
      }

      inlineCount += 1;
      const hash = sriHash(body);
      const type = /\stype\s*=\s*"([^"]*)"/i.exec(attributes)?.[1] ?? '(none)';
      const existing = inlineHashes.get(hash);
      if (existing) existing.files += 1;
      else inlineHashes.set(hash, { type, files: 1, first: rel });

      if (!allowedHashes.has(hash)) {
        fail(`${rel}: inline <script type="${type}"> is not authorized; its hash is '${hash}'`);
      }
    }
  }

  if (htmlFiles.length !== EXPECTED_HTML_FILES) {
    fail(`expected ${EXPECTED_HTML_FILES} built HTML files, found ${htmlFiles.length}`);
  }

  // A hash left in the policy after its script is gone is dead allowlist: it
  // authorizes content no page serves any more, so it can only ever authorize
  // something unexpected later.
  for (const hash of allowedHashes) {
    if (!inlineHashes.has(hash)) {
      fail(`policy authorizes '${hash}', but no built HTML file contains a matching inline script`);
    }
  }

  console.log('CSP validation:');
  console.log(`- HTML files checked: ${htmlFiles.length}`);
  console.log(`- inline scripts: ${inlineCount} block(s), ${inlineHashes.size} unique hash(es)`);
  for (const [hash, info] of inlineHashes) {
    console.log(`    ${hash}  type=${info.type}  in ${info.files} file(s)`);
  }
  console.log(`- external script origins: ${[...externalOrigins].sort().join(', ') || 'none'}`);
  console.log(`- inline event handlers: ${handlerCount}`);
  console.log(`- enforcing CSP headers: ${enforcing.length}`);
  console.log(`- report-only CSP headers: ${reportOnly.length}`);
  console.log(`- upgrade-insecure-requests: ${upgradeCount === 1 ? 'present' : `${upgradeCount} occurrence(s)`}`);

  if (failures.length > 0) {
    console.error('- FAIL');
    for (const message of failures) console.error(`  * ${message}`);
    process.exit(1);
  }
  console.log('- PASS');
}

// Only run when invoked as the entry point. findEventHandlerAttributes is
// exported so its behaviour can be exercised directly; importing it must not
// trigger a full validation run as a side effect.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`[validate-csp] ${error.message ?? error}`);
    process.exit(1);
  });
}
