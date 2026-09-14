# Hosting & deployment — Hostinger shared hosting

How oraixen.com is actually served. Read this before touching any `.htaccess`.

## Production stack

| Layer | What |
| --- | --- |
| Host | Hostinger shared hosting (hPanel) |
| Web server | LiteSpeed (reads `.htaccess`, Apache-compatible) |
| Edge | Hostinger CDN — responses carry `server: hcdn` |
| Country data | `mod_geoip`, enabled by `GeoIPEnable On`, exposing `GEOIP_COUNTRY_CODE` |
| PHP | 8.x, running the contact and market-routing endpoints |

`public_html/` is the domain root, and **it hosts several independent projects**,
not just Oraixen. That single fact drives everything below.

## Directory layout

```
public_html/
├── .htaccess                    ← LEVEL 1: shared-host router. NOT in this repo.
│                                  Reference copy: deployment/hostinger-public-html.htaccess
├── oraixen-website/             ← Oraixen deploys here (contents of dist/)
│   ├── .htaccess                ← LEVEL 2: generated from public/.htaccess
│   ├── index.html
│   ├── market-router.php
│   ├── market-context.php
│   ├── market-lib.php
│   ├── contact.php
│   ├── assets/ , flags/ , __seo/ , …
│
└── <other-project>/             ← other independent sites, each with its own
                                   .htaccess and its own virtual routes
```

Two `.htaccess` files, two different jobs. They are never interchangeable:

- `public_html/.htaccess` — **level 1**, decides *which project* owns a request.
  Lives outside this repository and is edited by hand.
- `public_html/oraixen-website/.htaccess` — **level 2**, Oraixen's own router.
  Comes from `public/.htaccess` in this repo and is copied verbatim into `dist/`
  by Vite on every build.

## Two-level routing

A request for `https://oraixen.com/about`:

1. **Level 1** (`public_html/.htaccess`) asks: does `about` name a real top-level
   directory belonging to another project? No. So the request is rewritten
   **internally** to `oraixen-website/about`.
2. **Level 2** (`public_html/oraixen-website/.htaccess`) now handles it exactly as
   it would in a single-project install: `/about` is a locale-less application
   route, so it goes to `market-router.php`, which picks a market from GeoIP +
   saved preference + `Accept-Language` and returns `302 → /en/about`.

The browser only ever sees `/about` and `/en/about`. `oraixen-website` never
appears in a public URL.

### Why the parent must preserve the path

It would be tempting to make level 1 send everything to
`oraixen-website/index.html`. That breaks Oraixen completely:

- **Geo routing dies.** `market-router.php` builds its redirect from
  `REQUEST_URI`. An internal rewrite leaves `REQUEST_URI` as the original public
  path (`/about`), which is exactly why the destination comes out as `/en/about`
  and not `/oraixen-website/en/about`. Collapsing everything to `index.html`
  would discard the requested page and land every visitor on the homepage.
- **Static SEO shells die.** Level 2 maps `/en/about` → `__seo/en/about.html` so
  crawlers get per-route metadata before React runs. It can only do that if it
  still sees `/en/about`.
- **Real files die.** `contact.php`, `market-context.php`, `/assets/*`,
  `/flags/*`, `sitemap.xml` and `robots.txt` all depend on level 2's real-file
  bypass, which needs the true path.
- **Deep SPA routes die.** `/en/projects/<slug>` must reach level 2's SPA
  fallback with its path intact so React Router can resolve the slug.

So level 1 rewrites the *location* of the request, never its *meaning*.

### Why other projects win first

Level 1 checks `%{DOCUMENT_ROOT}/$1 -d` before falling through to Oraixen. If the
first path segment is a real directory, the request is left alone — including
deep and virtual routes underneath it, so that project's own `.htaccess` can
handle them. Oraixen is only the **fallback** owner of `public_html`, never the
exclusive one.

## Safety rules

1. **Never** replace `public_html/.htaccess` with Oraixen's `public/.htaccess`.
   They solve different problems; doing this takes every other project offline.
2. **Never** make `public_html` behave as if it contains only Oraixen.
3. Other top-level project directories must always win **before** the Oraixen
   fallback rule.
4. Deep/virtual routes under another project must stay in that project.
5. Oraixen deployment targets `public_html/oraixen-website/` — the contents of
   `dist/`, including `.htaccess`, `__seo/`, `assets/`, `flags/` and the PHP
   endpoints.
6. The parent `.htaccess` is edited **manually** and **backed up first**.
7. After any parent change, run the smoke tests below — including at least one
   route from another hosted project.
8. If parent routing misbehaves, **restore the previous `public_html/.htaccess`
   immediately**; diagnose afterwards, not while the site is down.

## Smoke tests after changing the parent router

```bash
curl -sSI https://oraixen.com/            | head -1   # 302 → market root
curl -sSI https://oraixen.com/about       | head -1   # 302 → market /about
curl -sSI https://oraixen.com/en          | head -1   # 200
curl -sSI https://oraixen.com/ar-eg       | head -1   # 200
curl -sSI https://oraixen.com/ar-sa       | head -1   # 200
curl -sS  https://oraixen.com/market-context.php      # {"context":"…"}
# plus one known route from another hosted project — must be unaffected
```

## Currently validated production behaviour

| Request | Result |
| --- | --- |
| `/` | 302 to the market-specific root |
| `/about` | 302 to the market-specific `/about` |
| `/en` | 200 |
| `/ar-eg` | 200 |
| `/ar-sa` | 200 |
| `/market-context.php` | valid JSON |
| Another hosted project | tested, remained functional |

## Reference copy of the parent router

`deployment/hostinger-public-html.htaccess` is a versioned copy of
`public_html/.htaccess`, kept so the architecture cannot be lost.

It is **reference / manual deployment only**:

- not copied into `dist/` — it lives outside `public/`, so Vite never sees it
- not deployed by any build step
- never overwrites `public/.htaccess`

Installing it is always a deliberate manual action: back up the live file,
upload, run the smoke tests, restore on any failure.
