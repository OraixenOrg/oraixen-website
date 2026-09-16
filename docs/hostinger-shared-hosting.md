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

## Production deployment (automated)

### Two containment boundaries

The SSH account `u396801667` hosts **multiple domains** under
`/home/u396801667/domains/`, including `georgesalama.com`,
`ghirasalusrah.com` and `oraixen.com`. More may be added later.

Deployment therefore has to respect two boundaries, not one:

- **Domain boundary.** Nothing the automation does may read, write, delete,
  synchronize or enumerate outside `/home/u396801667/domains/oraixen.com`.
  Sibling domains are entirely out of scope, and the deployment logic never
  needs their names.
- **Project boundary.** Inside `oraixen.com/public_html`, which itself holds
  many independent projects (`chiaka-api`, `chiaka-dashboard`,
  `elsaad-pharmacies`, `elsaad-pharmacies-apis`, `naseh-api`, `sho5lapp`,
  `the-box`, `the-box-api`, `the-box-dashboard`, `oraixen-website`),
  production promotion may write only to `oraixen-website`.

Treat everything under `/home/u396801667/domains/` as **non-disposable**. There
is no broad synchronization, no recursive deletion, no wildcard that can expand
across a domain or a sibling project, and no `rm -rf` anywhere in the tooling.

### Verified absolute paths

The `public_html/` used throughout the sections above is the domain-relative
logical root. The absolute paths on the server, confirmed over SSH, are:

| Purpose | Absolute path |
| --- | --- |
| Domain root | `/home/u396801667/domains/oraixen.com` |
| Shared public root | `/home/u396801667/domains/oraixen.com/public_html` |
| Oraixen target | `/home/u396801667/domains/oraixen.com/public_html/oraixen-website` |

Deployment writes to the target and to nothing else. There is no server-side
staging directory, backup directory or state directory: `dist/` is uploaded
straight into the target, and no deployment metadata is stored on the server.

### What triggers a deployment

`.github/workflows/deploy-production.yml` runs on `workflow_run` after the `CI`
workflow completes, and deploys only when **all** of these hold:

- `conclusion == 'success'`
- `event == 'push'`
- `head_branch == 'main'`

So a Dev push, a pull request, or a failed main run never deploys. `CI` itself
stays validation-only and is not modified.

### Exact-SHA and stale-run protection

The workflow checks out `github.event.workflow_run.head_sha`, not "whatever main
is now", then compares it to `origin/main`. If main has advanced, the run is a
stale CI result and the deployment is **skipped** rather than failed: the newer
commit has its own run. Every remote step is gated on `should_deploy == true`.

### Deployment sequence

```
CI success on main
  -> checkout exact SHA -> stale-SHA gate
  -> npm ci + npm run build -> validate dist (30 SEO shells, 10 per market)
  -> validate secrets/variable -> pinned SSH
  -> remote preflight          (proves the target; writes nothing)
  -> read shared router hash   (kept in a workflow step output)
  -> re-read hash and compare  (abort here if it changed)
  -> rsync dist/ -> target     (--delay-updates --delete-delay; the only write)
  -> checksum comparison against dist/
  -> remote verify             (files, dirs, symlinks, 30 shells, 10 per market)
  -> re-read router hash and compare
  -> public smoke tests
       pass -> done
       fail -> workflow fails loudly (NO automatic rollback)
```

`scripts/hostinger-deploy.sh` is never installed on the server. The runner
streams it to SSH stdin with a mode:

```
ssh ... bash -s -- <mode> < scripts/hostinger-deploy.sh
```

Modes: `preflight`, `parent-hash`, `verify`. None of them writes to production;
the single write is the runner's rsync.

### The deployment sentinel

The Oraixen target must contain:

```
/home/u396801667/domains/oraixen.com/public_html/oraixen-website/.oraixen-deploy-target
```

with exactly this content:

```
oraixen-production-target-v1
```

Every mode refuses to run if the sentinel is missing, is not a regular file, or
has different content. It is excluded from the rsync, so deployment never
overwrites or deletes it.

**GitHub Actions deliberately never creates this file.** If the target directory
were ever recreated or mistyped, auto-creating the sentinel would let the
deployment write into it anyway. Bootstrapping it by hand is what makes the
check meaningful. See "One-time manual bootstrap" below.

### The parent router is never deployed

`public_html/.htaccess` is **not** part of any deployment. The workflow never
uploads `deployment/hostinger-public-html.htaccess` and never writes to the
parent router.

Instead the deployment treats it as a canary:

1. After preflight, the workflow reads its SHA-256 over SSH and keeps the value
   in a **step output**. Nothing is written to the server.
2. The workflow reads it **again immediately before the rsync** and compares.
   A mismatch aborts before any file is written.
3. The workflow reads it a **third time after deployment** and compares. A
   mismatch fails the job loudly for investigation.

Any mismatch aborts or fails. The hash is captured per run and is never
hardcoded. The automation never restores or edits the router under any
circumstance, including failure.

### Why sibling domains and sibling projects cannot be affected

Protection is structural, not conventional:

- The four production paths are **hardcoded `readonly` constants** in
  `scripts/hostinger-deploy.sh`. They cannot come from a GitHub secret, a
  GitHub variable, a workflow input, an SSH environment variable, a
  command-line path argument, or the current working directory. The remote
  script accepts only a mode plus a SHA, run id and run attempt, and derives
  every filesystem path itself.
- Before any write, the domain root, public root and target are each resolved
  **physically** (`cd "$path" && pwd -P`) and must equal their constant exactly.
  Symlinks are rejected outright, so none of them can be redirected into
  another domain.
- `dirname` of the public root must equal the domain root (domain
  containment), `dirname` of the target must equal the public root and its
  `basename` must be `oraixen-website` (project containment), and the target
  must equal neither the public root nor the domain root.
- The workflow's rsync destination is a fixed literal path held in the
  workflow's `env`, not assembled from a secret or variable. Only the SSH
  user, host and port are secrets, and they are connection credentials, not
  path components.
- `rsync --delete-delay` is used exactly once, with that fixed target as its
  destination. It is never pointed at `public_html`, at a domain directory, or
  at `/home/u396801667`.
- The remote script performs **no** production writes at all: its three modes
  only inspect and report.
- Both rsync commands pass an inline guard via `--rsync-path`, so the **remote
  rsync process re-validates the destination itself**, immediately before
  accepting any data. Preflight proves the target earlier in the job; this
  closes the time-of-check/time-of-use gap between those two moments. The guard
  re-checks the destination argument against the same literal constant, refuses
  a symlinked or relocated target, and only then `exec`s rsync with its original
  server arguments untouched.
- No command enumerates or references a sibling domain, and no wildcard can
  expand across domains or across `public_html` projects.

Because every path is absolute and verified, the SSH session's starting working
directory has **no effect** on which files are touched.

### There is no automatic rollback

This is deliberate and must not be misread.

There is no server-side backup and no rollback step. If the rsync fails, the
structural verification fails, or the smoke tests fail, the **workflow fails
loudly and production is left exactly as the deployment left it**. Nothing is
restored automatically, and the job summary says so.

Recovery is to fix the problem and redeploy a corrected commit to `main`.

Two things reduce the window in which a failure can leave a half-updated site:

- `--delay-updates` holds every transferred file in a temporary area on the
  server and renames them into place only after the whole transfer succeeds.
- `--delete-delay` defers removal of stale files until the end of the transfer.

`--delete-before` and `--delete-during` are deliberately **not** used: both
would remove files early, widening exactly the window these options close.

Even on failure, the guarantees that still hold are the containment ones: no
sibling project, no sibling domain and no shared router can have been touched,
because nothing in the system is capable of addressing them.

### Smoke tests

`scripts/production-smoke-test.sh` checks, after promotion:

- HTTP 200 for `/en`, `/ar-eg`, `/ar-sa`
- HTTP 200 for both solution pages in all three markets
- `/` and `/about` return **302** into one of the three markets (the runner's
  GeoIP country is not assumed)
- `/market-context.php` returns 200 and a body matching
  `{"context":"sa"|"eg"|"other"}`
- **A neighbouring project's public URL returns 2xx or 3xx**

The neighbour check is the important one: an Oraixen deployment that damaged the
shared parent routing could still pass every Oraixen route while taking another
project offline.

These tests prove the origin serves the expected routes. They do **not** prove
Hostinger CDN edge caches were invalidated; there is no documented purge
mechanism in this repository, so none is attempted.

### GitHub `production` Environment

Configure a GitHub Environment named `production` (URL `https://oraixen.com/`).

Secrets:

| Secret | Contents |
| --- | --- |
| `HOSTINGER_HOST` | SSH hostname |
| `HOSTINGER_PORT` | SSH port |
| `HOSTINGER_USER` | SSH username (the server account is `u396801667`) |
| `HOSTINGER_SSH_KEY` | Private key of the dedicated deployment key pair |
| `HOSTINGER_KNOWN_HOSTS` | Verified host key line for the server |

Variable:

| Variable | Contents |
| --- | --- |
| `NEIGHBOR_SMOKE_URL` | Public URL of **one other** project in the shared `public_html` |

`NEIGHBOR_SMOKE_URL` is deliberately not hardcoded: a guessed route from another
team's project would produce either a false failure or a meaningless pass. The
workflow fails before promotion if it is empty.

No secret value belongs in this repository. The workflow reports only whether a
value is missing, never its contents, and shell tracing is never enabled.

### SSH key model

Use a **dedicated deployment key pair**, not an existing key already present on
the server. If the Hostinger OpenSSH configuration supports it, restrict the
public key in `authorized_keys`:

```
no-agent-forwarding,no-port-forwarding,no-X11-forwarding,no-pty ssh-ed25519 AAAA...
```

`authorized_keys` is edited manually on the server; no repository code touches
it. A forced-command wrapper is intentionally out of scope for now.

### Known-hosts model

`HOSTINGER_KNOWN_HOSTS` must come from a host key verified through a trusted
channel, such as an existing trusted SSH session or the hosting control panel.

Do **not** fetch a fresh host key inside the workflow and trust it: that would
authenticate the server to itself. The workflow uses
`StrictHostKeyChecking=yes` with an explicit `UserKnownHostsFile`, plus
`BatchMode=yes` and `IdentitiesOnly=yes`. `accept-new` and
`StrictHostKeyChecking=no` are never used.

### One-time manual bootstrap

Run this once on the server, before the first automated deployment:

```bash
TARGET="/home/u396801667/domains/oraixen.com/public_html/oraixen-website"

printf '%s\n' 'oraixen-production-target-v1' \
  > "$TARGET/.oraixen-deploy-target"

chmod 444 "$TARGET/.oraixen-deploy-target"
```

Verify:

```bash
cat "$TARGET/.oraixen-deploy-target"
# oraixen-production-target-v1
```

Until this file exists with exactly that content, every deployment mode aborts
during its safety guards and production is left untouched.
