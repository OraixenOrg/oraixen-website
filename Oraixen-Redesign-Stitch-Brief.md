# Oraixen — Website Redesign Brief for Google Stitch

> **Purpose of this document:** A complete, ready-to-use specification to redesign the Oraixen company website inside **Google Stitch** (stitch.withgoogle.com). It contains the brand, the new light art direction, a full design system v2, a global Stitch operating guide, and a screen-by-screen breakdown with **copy-paste-ready, bilingual (EN + AR / LTR + RTL) Stitch prompts**.
>
> **How to use it:** (1) Read Section 0 (locked decisions + facts) and Section 4 (Design System v2). (2) Set up the global THEME once. (3) For each screen, paste the **THEME block → RESPONSIVE block → the screen's Stitch prompt**, then iterate. The prompts are written in English (Stitch performs best in English) but **all user-facing content is bilingual** — the natural-Arabic copy lives in Section 14 (Bilingual Copy Deck), the single source of truth for every string.
>
> **Two non-negotiables baked into this brief:**
> 1. **Numbers never drift.** Every stat derives from `src/lib/projects.ts` (28 projects) and the 2014 founding date. See the **Facts table (Section 0.3)** — every screen references it.
> 2. **Stitch never invents proof.** Do **not** let Stitch generate client names, quotes, logos, ratings, metrics, or counts. Use only values in this brief; anything marked `[PLACEHOLDER]` / `[CLIENT TO CONFIRM]` / `[LEGAL TO CONFIRM]` must be replaced with verified content before launch.

---

## Table of Contents

- **0. Start Here — Locked Decisions, Conversion Goal, Facts & Guardrails**
- **1. Project Snapshot**
- **2. Brand Story (use for About & tone of voice)**
- **3. Redesign Goals & Art Direction**
- **4. Design System v2 (Light Theme)** — tokens, type, components, motion, a11y
- **5. Global Layout Elements** — Navbar, Footer, Language Switcher
- **6. Bilingual + RTL Operating Rules**
- **7. Sitemap**
- **8. Operating Stitch Effectively** — workflow, global blocks, prompt template
- **9. Per-Screen Specs & Stitch Prompts**
  - 9.1 Home · 9.2 About · 9.3 Services · 9.4 Projects · 9.5 Project Detail · 9.6 Process · 9.7 Contact · 9.8 Legal (Privacy/Terms)
- **10. New High-Value Sections** — FAQ · Engagement Models · Industries · Trust & Security
- **11. Future Pages (optional, post-v1) — Insights & Careers**
- **12. Iteration Playbook & Reference-Image Guidance**
- **13. Responsive Breakpoints**
- **14. Bilingual Copy Deck (EN + AR) — single source of truth for every string**
- **15. Legal Content (Privacy + Terms)**
- **16. SEO / Meta Copy**
- **17. Don'ts**

---

## 0. Start Here — Locked Decisions, Conversion Goal, Facts & Guardrails

### 0.1 Locked client decisions (do not relitigate)

1. **Visual direction = LIGHT / clean / modern** (move off the current dark theme), **keeping the teal brand accent** — deep teal `#0F5E70`, sky blue `#56C9E3`.
2. **Bilingual: Arabic (RTL) + English (LTR)**, with a language switcher that flips the entire layout.
3. **Scope = 9 pages:** Home, About, Services, Projects, Project Detail, Process, Contact, Privacy, Terms — plus the new high-value sections in Section 10 (FAQ, Engagement Models, Industries, Trust & Security) which live *inside* existing pages, not as new nav items.

### 0.2 Global Conversion Goal & CTA map (declared once, used everywhere)

There is **one** primary action site-wide. Stitch must style the right button as primary on every screen.

| Role | EN label | AR label | Destination | Style |
|---|---|---|---|---|
| **Primary (global)** | Start your project | ابدأ مشروعك | `/contact` | Solid teal `#0F5E70` |
| **Secondary (global)** | View our work | شاهد أعمالنا | `/projects` | White + 1px teal outline |
| View all | View all projects | عرض كل المشاريع | `/projects` | Ghost / text link |
| Service block | Discuss your project | ناقش مشروعك | `/contact` | Solid teal |
| Soft / text contact | Let's talk | لنتحدّث | `/contact` | Text link |
| Card / row link | Learn more → | اعرف المزيد ← | (context) | Text, arrow flips in RTL |
| Process page | View full process | اطّلع على آلية العمل | `/process` | Secondary / outline |
| Form submit | Send message | إرسال الرسالة | (form) | Full-width solid teal |
| 404 / back | Back to home | العودة للرئيسية | `/` | Secondary |
| Detail back | ← Back to projects | → العودة إلى المشاريع | `/projects` | Text link |

> **Hierarchy rule:** On the hero and every final-CTA banner, the **teal solid** button is always **Start your project / ابدأ مشروعك** (→ Contact) and the **outline** button is **View our work / شاهد أعمالنا** (→ Projects). This is the inverse of the current site — the highest-intent click must reach Contact, not a non-converting page. Never style "View our work" as the primary.

### 0.3 Facts table — single source of truth (every screen references this)

> **Data integrity rule:** Project count, category counts, and the industry list are **derived from `src/lib/projects.ts`** (28 projects) and the JSON-LD founding year (2014). Never hard-code a different total. All numeric claims must be **identical across EN and AR** — a bilingual reviewer (the client) will catch any drift.

| Fact | EN | AR | Source / audit |
|---|---|---|---|
| Founded | Since 2014 | منذ 2014 | JSON-LD `foundingDate` |
| Tenure | 10+ years of engineering | أكثر من 10 سنوات من الهندسة | 2014→2026 (true ≈12; "10+" is conservative) |
| Projects shipped *(canonical stat label)* | 28+ Projects Delivered | أكثر من 28 مشروعاً مُنجزاً | `projects.ts` = exactly 28 |
| Industries served | 15 industries | 15 قطاعاً | 15 distinct labels in data |
| Service lines | 4 service lines | 4 مجالات خدمة | Mobile, Web, Corporate, Hardware+AI |
| Platforms / surfaces | iOS · Android · Web | iOS · أندرويد · ويب | 15 App Store · 18 Play Store · 16 web |
| App-store presence | 20 of 28 live on a store | 20 من 28 على المتاجر | counted store links |
| Category counts | Mobile 12 · Platform 8 · Web 8 | موبايل 12 · منصّات 8 · ويب 8 | `projects.ts` |
| Portfolio year range | 2018 → 2025 | 2018 → 2025 | min 2018 (Teens Hangouts), max 2025 (Maqdia) |
| Post-launch support | 6-month support window *(LEGAL TO CONFIRM)* | فترة دعم 6 أشهر *(للتأكيد قانونياً)* | softened from "warranty" — see 15 / 10.4 |
| **Do NOT use** | ~~7+ years~~ · ~~37+ projects~~ · ~~98% retention~~ · ~~15 countries~~ · ~~4.9 / 200 reviews~~ | غير مُثبتة | flagged false/unverifiable below |

**Why the banned numbers are banned:** `7+ years` contradicts the 2014 founding; `37+ projects` contradicts the real 28; `98% retention` and `15 countries` have **no source anywhere in the repo**; the JSON-LD `4.9 / 200` aggregate has **zero on-page reviews** and is a Google rich-results policy risk. Use only the defensible quartet **Since 2014 · 28+ Projects Delivered · 15 Industries Served · iOS · Android · Web**.

**JSON-LD reconciliation note:** During build, either **remove `aggregateRating` (4.9/200)** from `index.html` **or** back it with genuine on-page reviews. Display the tenure figure consistently (recommended: "Since 2014").

### 0.4 Master guardrail (paste into your working notes; honor in every prompt)

> **Do NOT let Stitch invent client names, testimonials, logos, ratings, metrics, or counts.** Use only values from this brief. Stat blocks render only data-true values. Testimonial slots render as labelled `[PLACEHOLDER]` until real quotes are collected (templates in 14.13). Privacy/Terms **body copy is layout-only placeholder** — real PIPEDA/IP-compliant legal copy must be drafted by counsel (Section 15). Star-rating rows appear **only** if a defensible aggregate is confirmed; otherwise omit them and use the real-metrics Results band (14.5).

---

## 1. Project Snapshot

| | |
|---|---|
| **Company** | Oraixen (أوريكسن) |
| **Industry** | Premium technology solutions / software studio |
| **What they do** | Mobile apps · Web development · Corporate software platforms · Hardware + AI/IoT *(emerging)* |
| **HQ** | Toronto, ON, Canada (delivery team across Egypt/MENA; overlapping NA/EU hours) |
| **Tagline (EN)** | *Innovation meets Precision* |
| **Tagline (AR)** | *حيث يلتقي الابتكار بالإتقان* |
| **Email** | support@oraixen.com |
| **Phone** | +1-313-482-0813 |
| **Founded** | 2014 (JSON-LD) |
| **Current site** | Dark theme, teal/sky-blue accent, React + Tailwind |
| **Redesign goal** | Move to **light, clean, modern** — keep teal accent, add full **Arabic (RTL) + English** support |

### The redesign in one sentence
> Take Oraixen from a dark, heavy tech look to a **bright, airy, premium, trust-building** website that feels like a top-tier global software studio — clean whitespace, confident typography, the signature teal accent, real data-backed proof, and flawless Arabic + English experiences.

---

## 2. Brand Story (use for About & tone of voice)

**The name:** "Ora" means *a new beginning* — a renewed direction toward an elevated technological future. **"IXEN"** blends *Next* + *Innovation* — premium at its core, immaculate in execution, crafted for those who seek distinction.

**Brand personality:** Premium · Precise · Innovative · Trustworthy · Calm-confident (not loud or flashy).

**Voice & tone:**
- Confident but not arrogant. Clear, short sentences.
- Emphasize craft, reliability, partnership. Speak to **business outcomes** backed by **real proof** (28 shipped products, 1M+ transactions, 500k+ orders), not buzzwords.
- Avoid jargon overload. Never make absolute promises ("bug-free", "guaranteed") — see safe reliability copy in 10.4.

---

## 3. Redesign Goals & Art Direction

### Goals
1. **Lighten everything** — white / very-light-gray backgrounds; teal as an *accent*, not a flood.
2. **More whitespace & breathing room** — generous spacing, fewer competing glows/gradients.
3. **Stronger, honest trust signals** — surface the 28-project portfolio, real client logos, **real metrics** (not fabricated testimonials), and security/ownership markers earlier.
4. **Full bilingual experience** — Arabic (RTL) and English (LTR), with a language switcher.
5. **Modern, editorial layouts** — asymmetric grids, large headings, clean cards with soft shadows instead of heavy borders/glows.
6. **Performance-minded** — crisp imagery, subtle motion, no heavy animated orbs.

### Art-direction keywords (style anchors for Stitch)
> *light, airy, premium, modern, minimal, lots of whitespace, soft shadows, rounded corners, teal accent on white, editorial typography, clean SaaS / agency aesthetic, subtle gradients, professional, trustworthy, high-contrast text, generous spacing.*

### Mood / references
- Linear.app's clarity + Stripe's trust + a premium agency portfolio. Light mode, confident, uncluttered. **Never** attach the current dark site as a *style* reference (see 12.2).

---

## 4. Design System v2 (Light Theme)

> This section is the single source of truth for tokens, type, components, and motion. Every Stitch prompt must paste the **THEME block (8.2)** verbatim as its first lines. **Light-mode prime directive:** on white, depth comes from **soft neutral shadow + 1px border + tint band** — never from glows or frosted glass. Color is an *accent on white*, not a flood: one teal-gradient moment per page (hero) + one dark-teal band per page (final CTA). The signature hairline-node motif (4.9) carries the rest of the decorative load. All contrast ratios below are **measured** (WCAG 2.1, sRGB).

### 4.1 Token architecture

Tokens are **semantic** (named by job) resolving to **primitive** hex values. Always reference the semantic name so a future theme swap touches one table.

#### 4.1.1 Primitive palette (do not reference directly in components)

| Primitive | Hex | |
|---|---|---|
| `teal-900` | `#0A4552` | darkest teal (pressed/active) |
| `teal-700` | `#0F5E70` | **brand deep teal** |
| `teal-600` | `#1A7A8F` | hover teal |
| `teal-300` | `#56C9E3` | **brand sky** (decoration/fill only) |
| `teal-200` | `#8FE0F2` | sky-soft (gradient stop) |
| `teal-50` | `#EDF3F6` | tinted band |
| `slate-950` | `#0B1B22` | ink (teal-undertone near-black) |
| `slate-600` | `#475569` | body text |
| `slate-500` | `#64748B` | secondary/meta text (AA on white) |
| `slate-400` | `#94A3B8` | **non-text decoration only** (fails AA) |
| `slate-300` | `#CBD5E1` | disabled fill |
| `slate-200` | `#E2E8F0` | borders/dividers |
| `slate-100` | `#F1F5F9` | subtle hover fill |
| `slate-50` | `#F7FAFC` | alt section background |
| `white` | `#FFFFFF` | base background |
| `green-600` | `#16A34A` | success (icon/fill) |
| `green-700` | `#15803D` | success **text** (AA on white) |
| `red-600` | `#DC2626` | error |
| `amber-700` | `#B45309` | warning **text** (AA on white) |
| `amber-500` | `#F59E0B` | warning icon/fill |

#### 4.1.2 Semantic tokens (reference THESE) — with verified contrast

| Semantic token | Resolves to | Hex | Verified pairing |
|---|---|---|---|
| `--bg` | white | `#FFFFFF` | page base |
| `--surface` | slate-50 | `#F7FAFC` | alternating sections, resting cards on white |
| `--surface-raised` | white | `#FFFFFF` | cards that sit *on* `--surface` (lift via shadow) |
| `--surface-sunken` | teal-50 | `#EDF3F6` | the one tinted band per page (stats strip) |
| `--border` | slate-200 | `#E2E8F0` | 1px card/input borders, dividers |
| `--border-strong` | slate-300 | `#CBD5E1` | hairline on tinted surfaces |
| `--text-primary` | slate-950 | `#0B1B22` | **17.6:1** on white — headings |
| `--text-secondary` | slate-600 | `#475569` | **7.58:1** white — body |
| `--text-muted` | slate-500 | `#64748B` | **4.76:1** white — meta, captions, placeholders, eyebrow, dates |
| `--text-disabled` | slate-400 | `#94A3B8` | **decoration & disabled-on-light-fill only — never live text on white** |
| `--accent` | teal-700 | `#0F5E70` | **7.35:1** on white — buttons, links, active, heading emphasis |
| `--accent-hover` | teal-600 | `#1A7A8F` | 4.97:1 — hover only |
| `--accent-strong` | teal-900 | `#0A4552` | **10.6:1** (white-on) — pressed/active, dark-band text base |
| `--accent-fill` | teal-300 | `#56C9E3` | **decoration / gradient / fill ONLY — never text, link, icon-on-white, active** |
| `--accent-soft` | teal-200 | `#8FE0F2` | gradient stop, decorative |
| `--on-accent` | white | `#FFFFFF` | **7.35:1** on `--accent` — text/icons on teal fills |
| `--focus-ring` | teal-700 @ 35% | `rgba(15,94,112,0.35)` | 3px outer focus ring on light controls |
| `--focus-ring-field` | teal-300 @ 30% | `rgba(86,201,227,0.30)` | 3px input-focus halo (with `--accent` 1px border) |
| `--success` | green-600 | `#16A34A` | icon/fill (3.30:1 — **not for text**) |
| `--success-text` | green-700 | `#15803D` | success **wording** (4.54:1 AA on white) |
| `--warning` | amber-500 | `#F59E0B` | icon/fill |
| `--warning-text` | amber-700 | `#B45309` | warning **wording** (5.02:1 AA) |
| `--error` | red-600 | `#DC2626` | **4.83:1** — error border, icon, helper text |
| `--app-store` | `#2563EB` | `#2563EB` | App Store badge |
| `--play-store` | green-600 | `#16A34A` | Play Store badge |

**Dark-band tokens (final CTA only):**

| Token | Hex | Verified |
|---|---|---|
| `--band-bg` | gradient `#0B1B22 → #0F5E70` (135°) | white text = **17.6:1** on the `#0B1B22` end |
| `--band-text` | `#FFFFFF` | headings/body on the band |
| `--band-text-muted` | `#CBD5E1` | **11.85:1** — supporting line on band |
| `--band-accent` | `#56C9E3` | **9.09:1** on `#0B1B22` — *here* sky IS allowed as text/accent (dark context) |

#### 4.1.3 Color-usage guardrails (paste into Stitch + enforce in review)

- **`--accent-fill #56C9E3` and `--accent-soft #8FE0F2` are decoration/fill ONLY** — never text, links, icons-on-white, or active/selected states. They appear in gradients, icon-tile washes, decorative shapes.
- **Gradient text always runs dark-end-up:** `#1A7A8F → #0F5E70`. Never let a text gradient end in `#56C9E3` on white (≈1.9:1, near-invisible). The hero "Precision / بالإتقان" word uses `linear-gradient(135deg,#1A7A8F 0%,#0F5E70 100%)`.
- **Body-capable muted = `#64748B`.** Reserve `#94A3B8` for non-text decoration only.
- **Status text uses the `-text` variants** (`#15803D`, `#B45309`); the saturated fills (`#16A34A`, `#F59E0B`) are for icons/borders/badges, not sentences.
- **`#0F5E70` is the only teal allowed as a link/active color** on white; `#1A7A8F` is a hover transition target, not a resting body color.

### 4.2 Section banding (light-mode seams are visible — rule-based, not improvised)

1. Backgrounds alternate **strictly** `white → #F7FAFC → white → #F7FAFC …`. Never two same-color sections adjacent.
2. The tinted band `#EDF3F6` (`--surface-sunken`) appears **at most once per page** — reserved for the **stats/trust strip**. Never stack two tinted bands.
3. The **dark teal band** (`--band-bg`) appears **once per page**, always the **final CTA**, full-bleed.
4. Section seams are color-only — **no horizontal divider lines** between bands (the tonal step is the divider). A 1px `--border` rule is allowed only inside cards/footers/legal TOCs.
5. The first section after a transparent navbar is always `white` (so the navbar's scrolled white state blends).

### 4.3 Typography

#### 4.3.1 Families

| Role | Latin | Arabic | Loading |
|---|---|---|---|
| Display / Headings | **Inter** 700–800 | **Tajawal** 700 | Google Fonts |
| Body / UI | **Inter** 400–500 | **Tajawal** 400–500 | Google Fonts |
| Eyebrow / label | Inter 600 (uppercase, +0.08em) | Tajawal 700 (**no uppercase, no tracking**) | — |
| Numeric (stats) | Inter 700, `tabular-nums` | Inter 700 (digits stay Latin) | — |

**Arabic font decision — Tajawal (primary).** It is geometric, low-contrast, and harmonizes with Inter's grotesque skeleton (matched x-height, open counters) so EN/AR pages feel like one system, with clean 400/500/700/800 weights. **Fallback stack:** `font-family: 'Tajawal','IBM Plex Sans Arabic','Cairo',sans-serif;` under `[lang="ar"],[dir="rtl"]`. IBM Plex Sans Arabic is the safe secondary; Cairo only as a last resort.

#### 4.3.2 Fixed modular scale — use EXACT values, never ranges

(Ranges get resolved arbitrarily across 9 screens and break rhythm.)

| Token | Size (px / rem) | Line-height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `display` | **64 / 4rem** | 1.05 | 800 | −0.03em | Home hero H1 only |
| `h1` | **48 / 3rem** | 1.10 | 700 | −0.025em | page hero H1 |
| `h2` | **36 / 2.25rem** | 1.20 | 700 | −0.02em | section headings |
| `h3` | **24 / 1.5rem** | 1.30 | 700 | −0.01em | card titles, sub-sections |
| `body-lg` | **18 / 1.125rem** | 1.60 | 400 | 0 | hero sub, lead paragraphs |
| `body` | **16 / 1rem** | 1.60 | 400 | 0 | default body |
| `small` | **14 / 0.875rem** | 1.50 | 500 | 0 | meta, chips, captions |
| `eyebrow` | **13 / 0.8125rem** | 1.40 | 600 | +0.08em, UPPERCASE (Latin only) | section labels |

**Responsive (mobile < 640px):** scale only the three largest — `display → 40`, `h1 → 34`, `h2 → 28`. Section vertical padding `96–128px desktop → 56–72px mobile`.

#### 4.3.3 Arabic vertical-rhythm & numeral rules (so RTL never feels cramped)

- **Arabic body line-height = 1.8** (vs Latin 1.6); **headings +0.05** over the Latin value (`h1` 1.10→1.15, `h2` 1.20→1.25).
- **Bump Arabic font-size +1px** vs the Latin equivalent (body 16→17px Arabic).
- **No italics in Arabic — ever.** Emphasize with weight or `--accent` color, never slant.
- **No negative letter-spacing** at any size; **no forced kashida** — start-aligned ragged edge.
- **Western numerals (1, 2, 3)** in all metrics, stats, years, prices, counts — both languages. Only flowing prose may use Eastern-Arabic numerals; this brief uses Western throughout for consistency.
- **Bidi isolation:** email, phone, and URLs stay LTR even inside RTL text.
- **Gradient emphasis word** (بالإتقان) is colored as a single unit — never split the بـ prefix.

### 4.4 Spacing, radius, container

- **Spacing scale (8-pt):** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`. Use these steps only.
- **Container:** max-width **1280px**, centered, **24px** desktop gutters / **16px** mobile.
- **Grid gap:** cards **24px**; tight chip rows **8px**.
- **Radius ladder:** `r-sm 8px` (chips/badges), `r-md 12px` (buttons, inputs, small media), `r-lg 16px` (cards), `r-xl 24px` (large media, hero panels), `r-pill 9999px` (pills, filters, avatar, language toggle).

### 4.5 Elevation ladder (white-tuned — neutral shadow only, no color glows)

Shadows use the **ink color at low alpha** so they read as soft depth, never grey haze. Pair every elevated surface with a **1px `--border`**.

| Token | Value | Use |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(11,27,34,0.05)` | inputs at rest, chips |
| `shadow-sm` | `0 2px 6px rgba(11,27,34,0.06)` | resting card |
| `shadow-md` | `0 8px 24px rgba(11,27,34,0.07)` | raised card, dropdowns, sticky navbar |
| `shadow-lg` | `0 16px 40px rgba(11,27,34,0.10)` | card **hover**, popovers, mobile nav overlay |
| `shadow-xl` | `0 28px 64px rgba(11,27,34,0.12)` | hero floating mockup, modal |

**Banned (dark-theme leftovers):**
- ❌ **No colored box-shadow "glows"** on cards (the old `rgba(86,201,227,0.25)` glow reads as a dim blue-grey halo on white). Card emphasis = `shadow-lg` + 1px `--accent` @ 30% border tint on hover.
- ❌ **No glassmorphism / frosted-blur cards** — a dark-theme device that disappears on white. Use `--surface-raised` + border + shadow.
- ✅ **The one permitted "glow"** is a single low-opacity radial *fill* behind the hero mockup (a background fill, **not** a box-shadow): `radial-gradient(60% 60% at 70% 40%, rgba(86,201,227,0.14), transparent 70%)`. Hero only, once per site.

### 4.6 Component inventory — state matrix

State legend: **Default · Hover · Focus-visible · Active/Pressed · Disabled · (Loading / Selected / Error / Success).** Focus-visible is always a **3px outer ring**, never removed.

#### Buttons (radius 12px, height 44px / 52px lg, weight 600, optional trailing arrow)

| Variant | Default | Hover | Focus | Active | Disabled | Loading |
|---|---|---|---|---|---|---|
| **Primary** | bg `#0F5E70`, white text, `shadow-sm` | bg `#1A7A8F`, `shadow-md` | + 3px ring `--focus-ring` | bg `#0A4552`, shadow→`shadow-xs` | bg `#CBD5E1`, text `#94A3B8`, no shadow | inline spinner (white), label dims, width locked |
| **Secondary** | white, 1px `#0F5E70` border, `#0F5E70` text | bg `#F7FAFC` | + 3px ring | bg `#E2E8F0`, text `#0A4552` | `#CBD5E1` border, `#94A3B8` text | spinner in `--accent` |
| **Ghost/text** | `#0F5E70` text | underline + `#1A7A8F` | + 3px ring | `#0A4552` | `#94A3B8` | n/a |
| **On-dark (band)** | white bg, `#0A4552` text | bg `#F7FAFC` | + 3px ring `rgba(255,255,255,.6)` | bg `#E2E8F0` | 50% opacity | spinner `#0A4552` |

Trailing `→` (Lucide `arrow-right`, 1.75px) **flips to `←` in RTL**. Transitions 150ms.

#### Card
- **Default:** `--surface-raised` white, 1px `--border`, `shadow-sm`, `r-lg`, 24–32px padding.
- **Hover (interactive):** `translate-y-[-4px]`, `shadow-lg`, border → `--accent` @ 30%; title → `--accent`; trailing arrow slides 4px (←4px RTL). 200ms.
- **Focus-within:** 3px ring around the whole card. **Selected:** 1px `--accent` border + top-left 2px corner accent.
- **On `--surface` sections:** card switches to white + `shadow-md` to lift off the tint.

#### Eyebrow pill
- `r-pill`, `--surface-sunken` bg, `--accent` text (6.57:1), 600, `eyebrow` size; leading 4px `--accent-fill` dot **or** the signature hairline-node underline (4.9). Arabic: same pill, **no uppercase/tracking**, Tajawal 700.

#### Icon tile
- **Tile:** 56px, `r-lg`, bg = **teal gradient at 12% opacity over white** (`linear-gradient(135deg, rgba(86,201,227,.12), rgba(15,94,112,.12))`), 1px `--border`.
- **Icon:** solid `--accent`, **24px**, 1.75px stroke (Lucide). **Hover:** tile → 18% opacity, icon → `--accent-strong`. Feature variant: 64px tile / 28px icon.

#### Chips / badges

| Type | Style |
|---|---|
| Tech chip | `--surface` bg, `--text-secondary`, `small`, `r-pill`, 1px `--border`; "+N more" same |
| Industry chip (on logo tile) | white @ 90%, `--accent` text, `r-sm`, 1px `--border`, top-left overlay |
| Confidential badge | `--surface-sunken` bg, `--text-muted` text, lock icon 14px |
| Platform chip | white, 1px border, 16px brand-tinted icon (web `--accent`, Play `--play-store`, App `--app-store`) + label |
| Status badge | success `#16A34A`@10% + `--success-text` + check; error `#DC2626`@10% + `--error` + alert |

#### Inputs / select / textarea
- **Default:** white bg, 1px `--border`, `r-md`, `--text-primary` value, **`--text-muted #64748B` placeholder** (AA), 44px height (textarea min 120px). Label above (600, `small`); required `*` in `--error` (RTL: asterisk on trailing/start side).
- **Hover:** border `--border-strong`. **Focus:** border `--accent` + 3px halo `--focus-ring-field`.
- **Error:** 1px `--error` border, 3px `rgba(220,38,38,.18)` halo, trailing alert-circle `--error`, helper below in `--error`.
- **Success:** 1px `--success` border, trailing check, optional `--success-text` helper. **Disabled:** `--surface` bg, `#94A3B8` text.
- **Select:** same shell + trailing chevron `--text-muted` (chevron does NOT mirror; menu opens start-aligned per dir).
- **Checkbox/radio:** 20px, 1px `--border` → `--accent` fill + white check when checked; 3px focus ring.

#### Navbar
- **Transparent-over-hero:** no bg, `--text-primary` links, logo `--accent`, language toggle + Primary CTA visible.
- **Scrolled:** white bg + `shadow-md` + 1px bottom `--border`; the primary CTA **persists**. (Render BOTH states as frames.)
- **Links:** `Home · About · Services · Projects · Process` — default `--text-secondary`; hover `--text-primary`; active `--accent` text + `--surface-sunken` pill (or 2px underline); focus 3px ring.
- **Mobile:** hamburger → full-screen **white** overlay (`shadow-lg`), large centered links, language toggle, Primary CTA; **sticky bottom "Start your project" bar** persists on scroll (the hero CTA scrolls away on mobile — never lose it).

#### Language switcher
- **Labels in their own script:** `English | العربية` (use the full **العربية**). Pill `r-pill`, 1px `--border`, `--surface` bg.
- **Active language:** `--accent` text + white segment; **inactive:** `--text-muted`, the clickable target. Hover (inactive): `--text-primary`. Focus: 3px ring.
- **RTL reposition:** whole nav cluster mirrors — logo right, links left, switcher + CTA left. Sets `dir=rtl lang=ar` on switch.

#### Filter pills (Projects)
- **Inactive:** white, 1px `--accent` border, `--accent` text, `r-pill`. **Active:** `--accent` fill, white text, no border. Hover (inactive): `--surface`. Disabled (empty category): `#CBD5E1` border, `#94A3B8` text.
- Show counts: `Mobile (12)`. **Mobile pill active by default** (largest real category). Counts stay Western.

#### Pagination
- Numbered pills `r-md`; current = `--accent` fill / white; others = white + 1px `--border`, `--text-secondary`; hover `--surface`; disabled prev/next `#94A3B8` chevrons. **Prev/next chevrons mirror in RTL.**

#### Stat block (trust strip)
- Lives on the one `--surface-sunken` band. Each stat: number Inter 800 `h2`-scale `--accent` (`tabular-nums`, Western), label below `--text-muted` `small`. Separated by `--border-strong` 1px vertical rules (hidden on mobile, stacks 2×2). Flat — no card, no shadow.

#### Accordion (FAQ)
- Row: full-width, 1px bottom `--border`, 20–24px vertical pad. Question `--text-primary` h3-scale 600 + trailing chevron `--text-muted`. Collapsed: chevron down. Hover: question → `--accent`. Focus: 3px ring on header button. Expanded: chevron rotates 180°, answer in `--text-secondary` `body` with 12px top gap + a start-side 2px `--accent` accent rule. One-open-at-a-time on mobile. Height animates 200ms (instant under reduced-motion).

#### Testimonial card *(structure only — content rules in 0.4 / 14.13)*
- White card, `r-lg`, `shadow-sm`, 32px pad. Optional 5-star row in `--accent` — **render only if a real aggregate exists; otherwise omit**. Quote `--text-secondary` `body-lg`, 2–3 lines. Footer: 40px round avatar, name `--text-primary` 600, role + company `--text-muted` `small`. **Until real quotes exist, render as a labelled placeholder** — never auto-generate names/quotes/logos/ratings.

### 4.7 Iconography
- **Lucide outline, single stroke 1.75px site-wide.** Size ramp: `inline 16 · list 20 · tile 24 · feature 28`.
- **Color:** `--accent` on light, `--text-secondary` for neutral glyphs, white on teal fills, `--band-accent #56C9E3` on the dark band.
- **RTL:** navigational/directional icons mirror (arrow, chevron, back, next/prev, "learn more →"). **Do NOT mirror** external-link, play, app-store, brand marks, checkmarks, search, or the select chevron. List checkmarks sit on the **trailing/reading-start side** (right in Arabic).

### 4.8 Imagery art-direction (3 tiers)

The #1 driver of "premium studio vs template." Note: **22 of 28 portfolio projects are logo-only** (no screenshots in data) — device-photography direction has nothing real to fill Projects/Detail media, so it must fall back to branded tiles, never a fabricated UI.

- **Tier A — Brand / abstract (hero, CTA):** soft teal-on-white gradient meshes, light 3D glass/ceramic shapes, isometric device frames — **not photos**. 24px radius, `shadow-xl` float.
- **Tier B — Product (Projects, Detail, Services):** real app UI screenshots inside clean device frames (phone for mobile, browser chrome for web), `shadow-lg` on `--surface`. **Missing screenshot → branded logo-tile placeholder** (logo `contain` on white, 24px padding, 1px `--border`, `r-lg`) — **never a hallucinated UI**.
- **Tier C — Human (About page ONLY, sparing):** candid, naturally-lit, desaturated-warm — never blue-corporate-handshake stock.
- **Universal photo treatment:** 16–24px radius, subtle ink `shadow-md`, optional 4–8% teal duotone wash. No teal "overlay glow."
- **Logo tiles:** `contain` on white, 24px padding, 1px `--border`, `r-lg`. Alt text: `alt="[Project] — [Industry] product by Oraixen"`.

### 4.9 Signature motif & decorative-accent rules (the ownable device)

One repeated motif reads as *designed system*; scattered decoration reads as *template*. Oraixen's motif draws on the brand's *precision* story and the process-timeline node.

- **Primary motif — the "precision hairline + node":** a **1px hairline** `linear-gradient(90deg,#56C9E3,#0F5E70)` carrying **4px circular nodes** (`--accent-fill`) at inflection points. Use it **once per section** as an **eyebrow underline** or a **section divider** (echoes the Process timeline).
- **Secondary — faint dotted grid:** 32px grid of `--border` dots, **masked to fade**, only in the hero and final-CTA backgrounds.
- **These two carry ALL decorative load.** No random blobs, stray gradients, or extra glows.
- **In RTL** the hairline gradient flips (90deg → 270deg) so the dark end stays toward the reading-start side; nodes are symmetric (direction-safe).

### 4.10 Dark-teal accent band — usage rules
- **One band per page, the final CTA**, full-bleed, `linear-gradient(135deg,#0B1B22 0%,#0F5E70 100%)`. White `h2`, `--band-text-muted #CBD5E1` line, On-dark white button. Optional `--band-accent #56C9E3` for one emphasized word or the faded dotted grid. **Never** for body sections, cards, or more than once per page — it is punctuation.

### 4.11 Motion spec
- **Easing** `cubic-bezier(0.4,0,0.2,1)` (enter ease-out, exit ease-in). **Durations:** micro 120–150ms; component (card lift, accordion, menu) 200ms; section reveal 300–400ms.
- **Scroll reveal:** fade-up 16px, 350ms, stagger 60–80ms across a row (cap so a 3-up finishes < 300ms).
- **Hover:** card `translate-y-[-4px]` + shadow swap; arrow nudges 4px (←4px RTL).
- **Hero:** the teal radial fill may breathe ±4% opacity over 6s — the *only* ambient loop. No rotating orbs.
- **`prefers-reduced-motion: reduce`:** disable transforms/loops, keep opacity fades ≤ 0.01s, no parallax.

### 4.12 Accessibility acceptance criteria
- Body/UI text contrast ≥ 4.5:1: `--text-primary` 17.6, `--text-secondary` 7.58, `--text-muted` 4.76, `--accent` 7.35, white-on-accent 7.35 — all pass. `#56C9E3` and `#94A3B8` text are **forbidden on white** (1.93:1 / 2.56:1).
- Status **text** uses `--success-text #15803D` / `--warning-text #B45309`.
- **Every** interactive element shows a visible 3px focus ring; never `outline:none` without a replacement.
- State is **never color-only** — pair with icon/label. `lang`/`dir` set correctly; one H1/page; inputs have labels; language switcher + social/logo tiles have `aria-label`/alt. Respect `prefers-reduced-motion`.

---

## 5. Global Layout Elements

### 5.1 Header / Navbar
- Transparent over the hero; turns white + `shadow-md` + 1px bottom border on scroll. **The primary CTA persists in the scrolled state** (desktop). Mobile keeps a **sticky bottom "Start your project" bar**.
- Left (LTR): Oraixen wordmark/logo in `--accent`. Right: nav links + language switcher + a persistent **Contact us / تواصل معنا** button.
- **Nav links (EN | AR):** Home/الرئيسية · About/من نحن · Services/الخدمات · Projects/أعمالنا · Process/آلية العمل. Active = `--accent` text + `--surface-sunken` pill.
- **Language switcher:** `English | العربية` (full Arabic word), active = `--accent`, inactive = `--text-muted` (the clickable target). RTL mirrors the whole cluster (logo right, CTA left).

### 5.2 Footer (bilingual — see 14.3 for full copy)
- `--surface` background, top 1px border. **4 columns:** (1) Brand wordmark + line "Premium technology, engineered with precision." / "تقنية متميّزة، مصنوعة بإتقان." + social chips; (2) **Company** — About · Services · Projects · Process · Contact; (3) **Services** — Mobile Apps · Web Development · Corporate Software · Hardware & AI; (4) **Contact** — Toronto, ON, Canada · support@oraixen.com · +1-313-482-0813 (email/phone kept LTR).
- Bottom bar: `© {year} Oraixen Inc. All rights reserved.` / `© {year} أوريكسن. جميع الحقوق محفوظة.` + Privacy Policy/سياسة الخصوصية + Terms of Service/شروط الخدمة. Social icons: light chips, teal hover, `aria-label="Oraixen on {Platform}"`.

---

## 6. Bilingual + RTL Operating Rules

> A **first-class requirement**, not an afterthought. The natural-Arabic copy for every string is in **Section 14**; Stitch must render those exact words and **never auto-translate Arabic** (that is where machine-sounding copy appears).

- **Two directions:** English = LTR, Arabic = RTL. The switcher flips the **entire layout** (nav order, text alignment, icon/arrow direction, asymmetric splits).
- **Mirror directional elements:** arrows, next/prev, timelines, alternating blocks. **Do NOT mirror** external-link, play/app-store, brand-mark, or check icons.
- **Fonts:** Tajawal (primary) per `lang`/`dir`. **No uppercase, no negative tracking, no italics, no forced kashida** in Arabic; body line-height 1.8; +1px size vs Latin.
- **Numerals:** Western (1,2,3) in all metrics/years/prices, both languages. Email, phone, URLs stay **LTR-isolated** even inside RTL text.
- **All numeric claims identical across EN/AR** (Facts table 0.3).
- **Workflow:** generate the approved EN frame first, then produce the Arabic RTL version *of that exact layout* (Stitch mirrors a known-good frame far more reliably than generating RTL cold). See Section 8.

---

## 7. Sitemap

```
/                → Home (Landing)
/about           → About
/services        → Services           (+ Engagement Models, FAQ sections — §10)
/projects        → Projects (grid + category & industry filters)
/projects/:slug  → Project Detail (case study)
/process         → Process
/contact         → Contact            (+ "What happens next" strip, FAQ accordion — §10)
/privacy         → Privacy Policy
/terms           → Terms of Service
— future (footer only, post-v1): /insights · /insights/:slug · /careers (§11)
```

---

## 8. Operating Stitch Effectively

> This is the operational layer that makes the per-screen prompts (Section 9) work. It is built around Stitch's two biggest limitations: **weak cross-generation memory** and a tendency to **default to a single desktop frame.**

### 8.1 Workflow (mini-guide)

1. **Work in ONE Stitch project/session for all screens.** New session = drifted teal, radii, shadows. Same session = Stitch reuses established navbar/footer/button/card styles.
2. **Set the theme once, then prepend it every time.** Paste the **THEME block (8.2) verbatim, unchanged, as the first lines of EVERY screen prompt** — same string each time. Inline paraphrases are what cause divergence.
3. **Generate Home FIRST and approve it.** Then begin every later prompt with: *"Reuse the EXACT navbar, footer, primary/secondary button, card, eyebrow-pill, and icon-tile styles from the previous screens in this project — only the page body changes."*
4. **Always request both frames explicitly.** End every prompt with the RESPONSIVE block and *"Generate both a desktop frame (1280px) and a mobile frame (375px)."*
5. **Use layout grammar, not adjectives** — column splits ("LEFT ~55% / RIGHT ~45%"), which side holds what, grid columns + gap, equal-height. The per-screen prompts already encode this.
6. **Iterate at the section level** — never regenerate the whole page to fix one block (see Section 12).
7. **Attach reference images at the right moments** (12.2) — they steer style and asset placement; the typed THEME block still governs exact tokens.
8. **Build the Arabic variant from the approved English frame**, not from scratch (paste the ARABIC/RTL block + the screen's AR strings).
9. **Request states explicitly** where they matter (scrolled navbar, active filter pill, form success/error).
10. **Export when approved** via *Copy to Figma* / *Get code*; keep the tokens (4.1) as the design-token reference your developer reconciles against.

### 8.2 THEME block (paste verbatim as the first lines of EVERY prompt)

```
THEME — Oraixen, light premium tech-studio design system v2. Calm, airy, editorial, trustworthy.
BACKGROUNDS: base #FFFFFF; alt sections #F7FAFC; ONE tinted band #EDF3F6 (stats only);
ONE dark band per page = final CTA, gradient 135° #0B1B22→#0F5E70. Alternate strictly
white→#F7FAFC→white; never two same-color sections adjacent; never two tinted bands.
ACCENT: deep teal #0F5E70 (buttons/links/active/headings-emphasis), hover #1A7A8F, pressed #0A4552.
Sky #56C9E3 + #8FE0F2 = DECORATION/FILL ONLY — never text, links, icons-on-white, or active states.
Gradient text runs dark-end-up #1A7A8F→#0F5E70.
TEXT: headings #0B1B22, body #475569, meta/placeholder #64748B. #94A3B8 = decoration/disabled only,
never live text on white. Borders #E2E8F0. Status: success icon #16A34A / text #15803D, error #DC2626,
warning #B45309.
TYPE: Inter (Latin) / Tajawal (Arabic). FIXED sizes — Display 64/1.05, H1 48/1.10, H2 36/1.20,
H3 24/1.30, body-lg 18/1.60, body 16/1.60, small 14/1.50, eyebrow 13 uppercase +0.08em (Latin only).
Arabic: +1px size, body line-height 1.8, headings +0.05, NO uppercase, NO negative tracking, NO italics,
Western digits in metrics.
SPACING 4·8·12·16·24·32·48·64·96·128. Container 1280px, 24px gutters. Sections 96–128px desktop.
RADII: buttons/inputs 12, cards 16, large media 24, pills 9999.
ELEVATION (white-tuned, neutral shadow + 1px border): card shadow 0 2px 6px rgba(11,27,34,.06);
hover 0 16px 40px rgba(11,27,34,.10). NO glassmorphism / frosted-blur cards. NO colored box-shadow
glows. The ONLY glow = one low-opacity teal radial FILL behind the hero mockup.
ICONS: Lucide outline, single stroke 1.75px; sizes 16/20/24/28; teal #0F5E70 on light.
Icon tile: 56px, radius 16, bg = teal gradient at 12% opacity over white, icon solid #0F5E70 24px.
MOTIF: 1px hairline #56C9E3→#0F5E70 with 4px nodes (eyebrow underline / section divider, once per section)
+ faint 32px dotted grid #E2E8F0 masked-to-fade (hero/CTA only). These two carry ALL decoration.
BUTTONS: primary teal #0F5E70 / hover #1A7A8F / pressed #0A4552 / focus 3px ring rgba(15,94,112,.35)
/ disabled #CBD5E1 bg #94A3B8 text. Secondary white + 1px #0F5E70 border. Inputs focus = #0F5E70 border
+ 3px sky ring 30%; error #DC2626 border + helper. Filter pill active = #0F5E70 fill white.
SCANNABILITY: every section = eyebrow pill → bold H2 (≤6 words) → one supporting line → content.
One core idea per section; every section ends with a clear link or action.
DON'T: no dark default backgrounds, no glassmorphism, no colored glows, no sky-blue text, no uppercase/
negative-tracking/italics on Arabic, no cramped sections, no invented logos/quotes/ratings/metrics.
```

### 8.3 RESPONSIVE block (paste verbatim under THEME on every prompt)

```
RESPONSIVE: Produce a DESKTOP frame (max 1280px centered, 24px gutters) AND a MOBILE frame (375px, 16px gutters).
Mobile rules: navbar collapses to a hamburger opening a FULL-SCREEN white overlay with large centered links
+ an "English | العربية" toggle + a primary "Start your project" button; ALL multi-column sections stack to
ONE column; project/service grids become 1-up; any timeline stacks vertically with LEFT-aligned nodes
(no alternating); add a sticky bottom bar with a single "Start your project" button that stays visible on scroll.
```

### 8.4 ARABIC / RTL block (paste under THEME + RESPONSIVE on Arabic generations)

```
ARABIC / RTL: dir=rtl, lang=ar. Font Tajawal or IBM Plex Sans Arabic. Mirror the WHOLE layout — logo on the
RIGHT, nav links on the LEFT, CTA on the far left; text right-aligned; asymmetric splits and alternating blocks
flip horizontally.
Directional/navigational arrows & chevrons flip (→ becomes ←); external-link, play-store, app-store and
brand-mark icons do NOT flip.
Arabic typography: NEVER uppercase, NEVER italicize, NEVER force-justify (no kashida); body line-height 1.8,
+1px size vs Latin, headings line-height +0.05; no negative letter-spacing at any size.
Numbers: Western numerals (1,2,3) for ALL metrics; keep email, phone, and URLs isolated LTR even inside Arabic.
Language switcher shows "English | العربية" — active language deep teal #0F5E70, inactive #64748B.
Nav (AR): الرئيسية · من نحن · الخدمات · أعمالنا · آلية العمل · تواصل معنا.
```

### 8.5 Per-screen prompt template (the fixed order all prompts follow)

```
1) THEME block (verbatim)   2) RESPONSIVE block (verbatim)   3) One-line page intent
4) "Reuse navbar/footer/buttons/cards from previous screens"  (every page after Home)
5) Numbered section list WITH layout grammar (splits + which side holds what + grid/gap)
6) Exact copy (EN, from Section 14)   7) State / variant add-ons
8) "Generate both a desktop frame (1280px) and a mobile frame (375px)."
```

---

## 9. Per-Screen Specs & Stitch Prompts

Each screen below has: **Purpose / success metric → Section order → 📋 Stitch Prompt (EN) → Arabic/RTL variant line.** All copy is final in Section 14; SEO strings in Section 16. Assume **THEME + RESPONSIVE** are pasted above every prompt, and (after Home) the "reuse previous styles" line.

---

### 9.1 HOME

**Purpose / success metric:** Communicate "premium tech partner", build instant trust, and drive the **primary click to Contact (form starts)** — Projects is secondary.

**Section order (locked, proof-before-process):** 1 Hero → 2 Trust band (logos + stats combined) → 3 Services → 4 Featured work (one real metric per card) → 5 Results band (real metrics, replaces fabricated testimonials) → 6 Industries strip → 7 Process preview → 8 Final CTA. The Trust & Security band (10.4) sits just above the footer. *(Copy: 14.5. Stats are the Facts-table quartet — never the old 7+/37+.)*

> **📋 Stitch Prompt — Home (English):**
> *[Paste THEME + RESPONSIVE.] Design the HOME page for Oraixen, a premium light-theme technology studio. Structure top-to-bottom; one core idea per section; alternate backgrounds white→#F7FAFC→white with the tinted band used ONCE on the stats strip.*
> *(1) NAVBAR (sticky): logo LEFT; links [Home, About, Services, Projects, Process] center/right; "English | العربية" toggle; PRIMARY teal "Start your project" button far right, plus a "Contact us" link. Render TWO states — (a) transparent over hero, (b) white + soft shadow + blur when scrolled (CTA persists in both).*
> *(2) HERO — two-column. LEFT ~55%, left-aligned: eyebrow pill "⚡ Premium Technology Solutions"; Display headline "Innovation meets Precision" with ONLY the word "Precision" filled by the 135° #1A7A8F→#0F5E70 gradient; one supporting line "We build premium digital products — mobile apps, web platforms, and AI-powered systems — for teams that refuse to ship anything ordinary."; a button row: PRIMARY teal "Start your project" then OUTLINE "View our work"; a small caption "Toronto HQ · delivery across the MENA region". RIGHT ~45%: an abstract isometric product/app mockup over the faint 32px dotted grid with ONE low-opacity teal radial FILL behind it (the only glow on the page).*
> *(3) TRUST BAND (the single #EDF3F6 tinted band): one row of four stats separated by the hairline+node motif — "Since 2014" · "28+ Projects Delivered" · "15 Industries Served" · "iOS · Android · Web". Beneath, a quiet single muted row of real client logos on white tiles (Zewail City, Order FS, DU V DU, Waffar Cash, M6lob) with caption "Trusted across 15 industries and 28+ shipped products". (Logos + stats read as ONE trust unit.) Do NOT invent percentages or country counts.*
> *(4) SERVICES — eyebrow "What we do", H2 "Four ways we ship", one line, then exactly 4 equal-height cards (3 cols desktop / 2 tablet / 1 mobile, 24px gap). Each: 56px teal-tint icon tile, bold title, one outcome line, "Learn more →": Mobile App Development — "iOS & Android apps your users actually keep — built native, tuned for speed."; Web Development — "Fast, scalable web platforms that hold up when traffic spikes."; Corporate Software — "ERP, CRM and dashboards that replace spreadsheets and manual chaos."; Hardware & AI (label tile "Emerging / R&D") — "IoT devices and AI that turn physical operations into live data."*
> *(5) FEATURED WORK — eyebrow "Selected work", H2 "Products, not slideshows", then 3 large project cards (Zewail City, Order FS, DU V DU): logo on white tile, industry chip, title, client, one line, and ONE real metric per card (Zewail "10k+ students served", Order FS "500k+ orders handled", DU V DU "200k+ community members"). "View all projects →" right-aligned.*
> *(6) RESULTS BAND (replaces testimonials — NO invented quotes) — eyebrow "Real outcomes", H2 "Numbers from shipped products", a 4-up metric row from real data: "1M+ transactions processed — Waffar Cash" · "500k+ orders handled — Order FS" · "$2M+ saved for users — Discount Emy" · "200k+ community members — DU V DU". Reserve ONE empty slot labelled "[PLACEHOLDER — client testimonial to be added before launch]".*
> *(7) INDUSTRIES STRIP — eyebrow "Who we build for", H2 "Trusted across industries", chips that link to the filtered Projects view: E-commerce · Fintech · Healthcare · Education · Food & Logistics · Professional Services. (Full section spec in §10.3.)*
> *(8) PROCESS PREVIEW — two-column. LEFT: eyebrow "How we work", H2 "A path, not a black box", a compact numbered list (Discovery · Design · Development · QA · Launch & Support), and a SECONDARY outline "View full process" link. RIGHT: a small stepped card with the hairline+node connector.*
> *(9) FINAL CTA BANNER (dark teal #0B1B22→#0F5E70 band, masked dotted grid): H2 "Have a project worth doing right?", sub "Tell us what you're building. We'll tell you how we'd ship it.", PRIMARY white-on-teal "Start your project" button.*
> *FOOTER: #F7FAFC, top border, 4 columns (Brand + social · Company · Services · Contact: Toronto ON Canada / support@oraixen.com / +1-313-482-0813) + bottom bar "© 2026 Oraixen Inc. All rights reserved." + Privacy · Terms.*
> *State add-ons: render the navbar in BOTH transparent and scrolled states; cards lift on hover (title turns #0F5E70). Generate both a desktop frame (1280px) and a mobile frame (375px).*

> **📋 Arabic / RTL:** *Paste the ARABIC/RTL block, then: "Now produce the Arabic RTL version of this exact Home layout. Headline «حيث يلتقي الابتكار بالإتقان» (apply the teal gradient to «بالإتقان» as ONE unit — do not split the بـ prefix); eyebrow «⚡ حلول تقنية متميّزة»; stats «منذ 2014 · أكثر من 28 مشروعاً مُنجزاً · 15 قطاعاً · iOS · أندرويد · ويب»; buttons «ابدأ مشروعك» (primary) / «شاهد أعمالنا» (outline); Services H2 «أربع طرق نُطلق بها منتجك»; Featured H2 «منتجات حقيقية، لا عروضاً تقديمية»; Results H2 «أرقام من منتجات تم إطلاقها»; final banner «لديك مشروع يستحق أن يُنجَز بإتقان؟». Use the exact AR strings from §14.5."*

---

### 9.2 ABOUT

**Purpose / success metric:** Establish credibility and brand story; warm the visitor toward Contact. *(Full copy: 14.6.)*

**Section order:** Hero → Our Story (name meaning + ethos) → Timeline (inflection points, no empty 2014–2017 gap) → Our Foundation (Mission/Vision/Purpose) → Core Values (6) → Trust & Ownership strip (10.4) → Final CTA.

> **📋 Stitch Prompt — About (English):**
> *[THEME + RESPONSIVE.] Design the ABOUT page for Oraixen. Reuse navbar/footer/buttons/cards from previous screens.*
> *(1) HERO — single column, centered, max 880px: eyebrow "About Oraixen", H1 "We don't just write code. We engineer products that ship.", sub "Oraixen is a premium software studio — 28 shipped products across 15 industries, from Toronto to the MENA region.", with the hairline+node motif under the eyebrow.*
> *(2) OUR STORY — two-column. LEFT ~50% text: the name meaning ("Ora" = a new beginning; "IXEN" = Next + Innovation) and the craft-first ethos. RIGHT ~50%: ONE candid, warm-natural-light team/office photo in a 24px-radius frame with a soft ink shadow and a subtle 4–8% teal duotone wash (NOT blue corporate-handshake stock).*
> *(3) TIMELINE (inflection points, NOT a continuous year axis): a horizontal stepped strip on the hairline+node connector — "Founded in Toronto, 2014" → "First mobile product shipped, 2018" → "Multi-platform era — web + mobile + dashboards, 2022" → "28+ projects delivered to date".*
> *(4) OUR FOUNDATION — eyebrow "Our foundation", 3 equal-height cards (Mission / Vision / Purpose), each with a thin teal gradient top-bar (copy from §14.6).*
> *(5) CORE VALUES — eyebrow "How we operate", a grid of 6 rounded chips (3×2 desktop / 2×3 tablet / 1 col mobile): Innovation · Integrity · Collaboration · Reliability · Excellence · Continuous Improvement, each with a small teal icon and a one-line description.*
> *(6) TRUST & OWNERSHIP STRIP (#F7FAFC): four chips — "NDA on request" · "You own 100% of the code & IP" · "GDPR & PIPEDA-aligned data practices" · "Secure SDLC with code reviews".*
> *(7) FINAL CTA BANNER (dark teal): "Want to see how we work?" + PRIMARY "Start your project" + outline "View our work".*
> *Generate both a desktop frame (1280px) and a mobile frame (375px).*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: "Arabic RTL version of this About layout. H1 «لا نكتب الأكواد فحسب — نبني منتجات تُطلَق فعلاً.»; sub «أوريكسن استوديو برمجيات متميّز: 28 منتجاً مُطلَقاً عبر 15 قطاعاً، من تورنتو إلى منطقة الشرق الأوسط.»; Mission/Vision/Purpose = رسالتنا / رؤيتنا / غايتنا; values = الابتكار · النزاهة · التعاون · الموثوقية · التميّز · التحسين المستمر. Mirror the photo to the LEFT and the story text to the RIGHT. Use the exact AR strings from §14.6."*

---

### 9.3 SERVICES

**Purpose / success metric:** Detail the 4 offerings + engagement models + FAQ; route qualified buyers to Contact. *(Full copy: 14.7; Engagement Models 10.2; FAQ 10.1.)*

**Section order:** Hero → 4 alternating service blocks → Engagement Models (3 cards, §10.2) → Tech Stack row → FAQ accordion (§10.1) → Final CTA.

> **Hardware & AI framing note:** Zero of the 28 portfolio items are hardware/IoT/AI. Label this block **"Emerging / R&D"** (EN: *Emerging capability* / AR: *قدرة ناشئة*) so the empty portfolio isn't exposed. Do not let Stitch fabricate hardware case studies.

> **📋 Stitch Prompt — Services (English):**
> *[THEME + RESPONSIVE.] Design the SERVICES page for Oraixen. Reuse navbar/footer/buttons/cards from previous screens.*
> *(1) HERO — centered: eyebrow "What we do", H1 "Our Services", sub "Four ways we turn ambitious ideas into reliable, shipped software."*
> *(2) FOUR ALTERNATING SERVICE BLOCKS — full-width two-column rows, equal rhythm. Strict alternation: Row 1 media LEFT / content RIGHT · Row 2 media RIGHT / content LEFT · Row 3 media LEFT / content RIGHT · Row 4 media RIGHT / content LEFT. Each CONTENT side: 56px teal-tint icon tile, bold title, one outcome line, a 4-item green-checkmark "Deliverables" list, two small labeled stats ("Timeline", "Best For"), and a teal "Discuss your project" button. Each MEDIA side: real app screenshot in a device/browser frame, or a branded logo-tile placeholder where no screenshot exists — NEVER a fabricated UI; 24px radius, soft ink shadow on #F7FAFC.*
>   - *Mobile App Development — "Native and cross-platform apps with seamless UX — built to be kept, not deleted." Deliverables: iOS & Android Apps · React Native / Flutter · UI/UX Design · App Store Optimization. Timeline 3–6 months. Best For: Startups, consumer brands, enterprise tools.*
>   - *Web Development — "Modern, responsive, high-performance web apps and platforms that scale." Deliverables: SaaS Platforms · E-commerce · PWAs · CMS Solutions. Timeline 2–5 months. Best For: SaaS, e-commerce, corporate portals.*
>   - *Corporate Software Platforms — "Custom software that streamlines complex operations and replaces manual chaos." Deliverables: ERP · CRM · HR Tools · Data Dashboards. Timeline 6–12 months. Best For: enterprises, logistics, finance, healthcare.*
>   - *Hardware + Software + AI (chip "Emerging / R&D") — "Integrated IoT, embedded systems, and AI that turn physical operations into live data." Deliverables: IoT Devices · Embedded Systems · Computer Vision · Predictive Analytics. Timeline 6–18 months. Best For: manufacturing, smart cities, MedTech, AgTech.*
> *(3) ENGAGEMENT MODELS — eyebrow "Engagement", H2 "How we work together.", 3 equal-height cards (middle highlighted with a "Most popular" pill): Fixed-Scope Project (From $10k), Dedicated Team (From $8k/mo), Maintenance & Support (From $1.5k/mo). Below the cards, a slim 3-step "What happens next" strip: "1. We reply within 24 hours. 2. A 30-minute scoping call. 3. A tailored proposal & timeline." (Full spec §10.2.)*
> *(4) TECH STACK — eyebrow "Built with", a quiet single row of contained logos (React, Next.js, Flutter, Laravel, Node.js, Firebase).*
> *(5) FAQ — eyebrow "Answers", H2 "Questions, answered.", a single-column accordion (820px) with the first item open. 8 Q&As from §10.1.*
> *(6) FINAL CTA BANNER (dark teal): "Not sure which service you need?" + PRIMARY "Start your project".*
> *State add-ons: render the per-row alternation EXACTLY as specified; show one FAQ item open and the rest collapsed with chevrons. Generate both a desktop frame (1280px) and a mobile frame (375px).*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: "Arabic RTL version. REVERSE the alternation — Row 1 media LEFT / text RIGHT (then continue alternating); checkmarks sit to the RIGHT of their text; the «ناقش مشروعك» button arrow points LEFT. H1 «خدماتنا»; labels المُخرجات / المدة الزمنية / الأنسب لـ; services = تطوير تطبيقات الموبايل / تطوير الويب / منصّات البرمجيات المؤسسية / الأجهزة والبرمجيات والذكاء الاصطناعي; engagement = مشروع بنطاق محدّد / فريق مخصّص / الصيانة والدعم. Keep tech-stack names LTR. Use the exact AR strings from §14.7, §10.1, §10.2."*

---

### 9.4 PROJECTS (Portfolio)

**Purpose / success metric:** Showcase 28 builds with filtering; route the highest-intent viewers to Project Detail then Contact. *(Full copy: 14.8.)*

**Section order:** Hero → Category filter bar (volume-ordered, with counts) → Industry filter row (secondary) → Project grid (3-up) → Pagination → Final CTA.

> **Data note:** Category pills and counts must be generated from `projects.ts` (Mobile 12 · Platform 8 · Web 8 · All 28), never hard-coded. **Mobile** is the active default (largest category). Each card's industry chip uses the exact EN→AR taxonomy in 14.8.

> **📋 Stitch Prompt — Projects (English):**
> *[THEME + RESPONSIVE.] Design the PROJECTS page for Oraixen. Reuse navbar/footer/buttons/cards from previous screens. Give this page room — it's a key trust driver.*
> *(1) HERO — centered: eyebrow "Our work", H1 "Selected Projects", sub "Real products, real users — 28 builds across finance, healthcare, education, retail and more."*
> *(2) CATEGORY FILTER BAR — pill buttons, volume-ordered with live counts: "All (28)" · "Mobile (12)" · "Platform (8)" · "Web (8)". The "Mobile (12)" pill is ACTIVE by default (solid #0F5E70, white text); the rest white + teal outline.*
> *(3) INDUSTRY FILTER ROW (secondary, smaller chips beneath): "All · E-commerce · Services · Business · Education · Food · Finance · Healthcare · More".*
> *(4) PROJECT GRID — exactly 3 columns desktop / 2 tablet / 1 mobile, 24px gap, equal-height cards. Each card: client logo CONTAINED on a white tile (24px padding, 1px #E2E8F0 border) at top with a small industry chip overlaid top-left (and a "Confidential" badge where applicable); then title, client name, a 2-line description, a row of small platform chips (Website / Play Store / App Store / Dashboard) and 3 tech chips + "+N more". Card hover: lift + title turns #0F5E70 + a "→" arrow appears. Where a project has no logo, render a branded monogram tile — never a fake screenshot.*
> *(5) PAGINATION / load-more centered below the grid.*
> *(6) FINAL CTA BANNER (dark teal): "Have a project in mind?" + PRIMARY "Start your project".*
> *State add-ons: show the ACTIVE filter pill (Mobile) solid teal and the rest as outline; also render an EMPTY-STATE variant with "No projects match this filter yet." and a "View all projects" link. Generate both a desktop frame (1280px) and a mobile frame (375px).*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: "Arabic RTL version, mirrored grid. H1 «مشاريع مختارة»; eyebrow «أعمالنا»; category pills «الكل (28) · موبايل (12) · منصّات (8) · ويب (8)» (موبايل active); industry chips «الكل · التجارة الإلكترونية · الخدمات · الأعمال · التعليم · الأطعمة · التمويل · الرعاية الصحية · المزيد»; empty state «لا توجد مشاريع تطابق هذه التصفية بعد». Use the EN→AR industry map in §14.8 for card chips. Keep platform/tech names LTR; card hover arrow points LEFT."*

---

### 9.5 PROJECT DETAIL (Case Study)

**Purpose / success metric:** The most persuasive page — convert interest into a Contact click via a mid-page and end CTA. *(Full copy: 14.9.)*

**Section order:** Back link → Header (title/client/industry-chip-link/year + platform buttons) → Hero media → Overview → The Challenge / Our Solution / The Impact → **mid-page soft CTA** → Metrics (per-project) → Tech Stack → Highlights → Related Projects → Final CTA.

> **Metrics rule:** Each project's metric cards must be populated from **that project's own** `metrics` array in `projects.ts` — they vary meaningfully (Order FS: 500k+ Orders / 1k+ Restaurants / 200k+ Users; Waffar Cash: 120k+ Users / 1M+ Transactions / $500k+ Rewards). The Zewail City "10k+ / 99.9% / <2s" trio is an **example only**, never a default across all 28.

> **📋 Stitch Prompt — Project Detail (English, example = Order FS):**
> *[THEME + RESPONSIVE.] Design the PROJECT DETAIL / case-study page for Oraixen. Reuse navbar/footer/buttons/cards from previous screens. This is the most persuasive page type — make it a funnel, not a dead end.*
> *(1) BACK LINK "← Back to projects" top-left.*
> *(2) HEADER — two-column. LEFT: project title (H1), client, an industry chip that LINKS to the filtered Projects view ("See more Food Service projects →"), and the year. RIGHT: platform buttons (Visit Website / Get it on Play Store / Download on the App Store / Dashboard).*
> *(3) HERO MEDIA — the product logo/screenshot on a clean 24px-radius tile over #F7FAFC with a soft ink shadow.*
> *(4) OVERVIEW — a single lead paragraph, max 760px, heading "Overview".*
> *(5) CHALLENGE / SOLUTION / IMPACT — three labeled blocks (3-column desktop, stacked mobile), each with the hairline+node motif under its heading: "The Challenge", "Our Solution", "The Impact".*
> *(6) MID-PAGE SOFT CTA (after The Impact, on a thin #F7FAFC strip): "Building something like this? Start your project."*
> *(7) METRICS — heading "By the numbers", a row of three large stat cards populated from THIS project's real metrics (Order FS: "500k+ Orders" · "1k+ Restaurants" · "200k+ Users"). Metrics are per-project — pull each project's own values; the 10k+/99.9%/<2s trio is Zewail City's only.*
> *(8) TECH STACK — heading "Tech Stack", a chip row.*
> *(9) HIGHLIGHTS — heading "Highlights", a green-checkmark list.*
> *(10) RELATED PROJECTS — heading "Related Projects", 3 cards (same anatomy as the Projects grid card).*
> *(11) FINAL CTA BANNER (dark teal): "Want results like these?" + PRIMARY "Start your project". Generate both a desktop frame (1280px) and a mobile frame (375px).*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: "Arabic RTL version, mirrored header (title/meta RIGHT, platform buttons LEFT). Labels: نظرة عامة / التحدّي / الحل / الأثر / بالأرقام / التقنيات المستخدمة / أبرز المميّزات / مشاريع ذات صلة / العودة إلى المشاريع. Back chevron and the industry-chip arrow «شاهد المزيد من مشاريع …» point LEFT; mid-page CTA «تبني شيئاً مشابهاً؟ ابدأ مشروعك.». End CTA «تريد نتائج مماثلة؟». Keep metrics in Western numerals and platform/tech names LTR. Use the exact AR strings from §14.9."*

---

### 9.6 PROCESS

**Purpose / success metric:** Answer "how do you work?" and reduce delivery risk; route to Contact. *(Full copy: 14.10.)*

**Section order:** Hero → 5-step vertical timeline → Why Choose Oraixen (3 softened, legally-safe cards) → Final CTA.

> **📋 Stitch Prompt — Process (English):**
> *[THEME + RESPONSIVE.] Design the PROCESS page for Oraixen. Reuse navbar/footer/buttons/cards from previous screens.*
> *(1) HERO — centered: eyebrow "How we work", H1 "Our Process", sub "Five steps, weekly demos, and full transparency from kickoff to launch."*
> *(2) FIVE-STEP VERTICAL TIMELINE — a single centered vertical connector (hairline+node motif) with teal node markers; cards ALTERNATE: step 01 on the RIGHT of the line, 02 LEFT, 03 RIGHT, 04 LEFT, 05 RIGHT. Each card: large teal step number (01–05), title, one-line description, 4-item green-checkmark sub-list:*
>   - *01 Discovery & Strategy — Requirements Gathering · Market Research · Technical Feasibility · Project Roadmap.*
>   - *02 Design & Prototyping — Wireframing · UI/UX Design · Interactive Prototypes · Design System.*
>   - *03 Development — Frontend & Backend · API Integration · Database Design · Code Reviews.*
>   - *04 Quality Assurance — Automated Testing · Manual Testing · Security Audits · Performance Tuning.*
>   - *05 Launch & Support — Deployment · Monitoring · Maintenance · Feature Updates.*
> *(3) WHY CHOOSE ORAIXEN — eyebrow "Why Oraixen", 3 equal-height cards with teal icon tiles: "Transparent Communication" — "Weekly sprints, live demos, and a dedicated channel — no surprises."; "Reliability You Can Count On" — "A documented QA process, automated and manual testing, and a post-launch support window on every release." (AVOID absolute 'bug-free guarantee' language — see §10.4); "Long-term Support" — "Flexible maintenance plans that grow with your product."*
> *(4) FINAL CTA BANNER (dark teal): "Ready when you are." + PRIMARY "Start your project".*
> *State add-ons: on the mobile frame the timeline stacks vertically with LEFT-aligned nodes (no alternating). Generate both a desktop frame (1280px) and a mobile frame (375px).*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: "Arabic RTL version. The vertical timeline still flows top→bottom but the alternating cards SWAP sides — step 01 on the RIGHT of the connector; step numbers 01–05 on the right; checkmarks to the RIGHT of each sub-item; back/next chevrons point LEFT. H1 «آلية عملنا»; eyebrow «آلية العمل»; steps = الاكتشاف والاستراتيجية / التصميم والنماذج الأولية / التطوير / ضمان الجودة / الإطلاق والدعم; why-choose = تواصل شفّاف / موثوقية تعتمد عليها / دعم طويل الأمد. Use the exact AR strings from §14.10."*

---

### 9.7 CONTACT

**Purpose / success metric:** The conversion endpoint — **maximize completed form submissions.** *(Full copy & microcopy: 14.11.)*

**Section order:** Two-column — LEFT: heading + 3 contact info cards (Email · **Phone** · Location) + "What happens next" 3-step strip; RIGHT: form card. Plus success/error state frames.

> **Note:** The Phone card is in the brief but missing from the live page — it must render here. Keep email, phone, and URLs LTR via bidi isolation even inside Arabic text. Mark Company / Budget / Timeline as optional.

> **📋 Stitch Prompt — Contact (English):**
> *[THEME + RESPONSIVE.] Design the CONTACT page for Oraixen. Reuse navbar/footer/buttons/cards from previous screens.*
> *(1) TWO-COLUMN LAYOUT. LEFT ~45%: eyebrow "Contact us", H1 "Let's build something extraordinary.", sub "Tell us about your project. We reply within one business day.", then THREE contact info cards with teal icon tiles — "Email · support@oraixen.com", "Call us · +1-313-482-0813", "Visit us · Toronto, ON, Canada". Below them a "What happens next" 3-step mini-strip: "1. We reply within 24 hours. 2. A 30-min scoping call to understand your goals. 3. You receive a tailored proposal & timeline."*
> *RIGHT ~55%: a contact form CARD on white, soft shadow, 16px radius. Fields: Name* and Email* side by side; "Company (optional)"; "Budget (optional)" and "Timeline (optional)" selects side by side (Budget options $10k–$50k / $50k–$100k / $100k+, placeholder "Select a range"; Timeline options ASAP / 1–3 months / 3–6 months, placeholder "Select a timeline"); a Message* textarea with helper "Goals, scope, deadlines — whatever helps us help you."; a full-width teal "Send message" button. Under the button, reassurance microcopy: "No spam. We reply within one business day." and a privacy note "By sending this, you agree to our Privacy Policy."*
> *(2) State add-ons (request as additional frames/annotations): SUCCESS frame — green check, "Message sent." + "Thanks for reaching out — our team will reply within one business day." + a "Send another message" secondary button. ERROR/validation states — Name "Please enter your name."; Email "Enter a valid email address."; Message "Tell us a bit about your project."; submit failure "Something went wrong. Please try again or email support@oraixen.com." (red #DC2626 border + alert icon + helper). Show input FOCUS state: #0F5E70 border + 3px sky ring at 30%.*
> *Generate both a desktop frame (1280px) and a mobile frame (375px).*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: "Arabic RTL version, mirrored two columns (info cards RIGHT, form LEFT). H1 «لنبنِ شيئاً استثنائياً.»; fields الاسم* / البريد الإلكتروني* / الشركة (اختياري) / الميزانية (اختياري) / الإطار الزمني (اختياري) / رسالتك*; budget «10–50 ألف دولار / 50–100 ألف دولار / أكثر من 100 ألف دولار»; timeline «في أقرب وقت / 1–3 أشهر / 3–6 أشهر»; submit «إرسال الرسالة»; success «تم إرسال رسالتك.» + «شكراً لتواصلك — سيردّ فريقنا خلال يوم عمل واحد.»; reassurance «لا رسائل مزعجة. نردّ خلال يوم عمل واحد.». Keep email, phone and URLs isolated LTR; required-asterisks on the start side. Use the exact AR strings from §14.11."*

---

### 9.8 LEGAL (Privacy Policy & Terms of Service)

**Purpose / success metric:** Trustworthy, readable long-form legal pages. *(Real structured content: Section 15. Body remains layout-only placeholder until counsel finalizes.)*

> **Scope flag for Stitch:** Content is **placeholder** — Stitch handles **layout only**. Render the TL;DR + headings; mark body `[Final legal copy to be confirmed by counsel]` / `[يُعتمَد النص القانوني النهائي من المستشار القانوني]`. **Never fabricate clauses, statutes, dates, or jurisdictions.** Governing law = Province of Ontario, Canada; controller = Oraixen Inc.; data requests to support@oraixen.com. Replace the live stub's stale "Last updated: October 2023" with the launch date.

> **📋 Stitch Prompt — Legal template (English; renders both Privacy and Terms):**
> *[THEME + RESPONSIVE.] Design a clean, light, premium LEGAL page for Oraixen (one layout used for Privacy Policy and Terms of Service). Reuse the exact navbar/footer/buttons from previous screens.*
> *Layout — single centered reading column, max-width ~720px, generous line-height (1.6 Latin / 1.75 Arabic), white background. On desktop, add a sticky LEFT table-of-contents (numbered section links; active item in deep teal #0F5E70). On mobile, the TOC collapses into a "Jump to section" dropdown.*
> *Top of page: an eyebrow pill ("Legal"), the page H1 ("Privacy Policy"), and a small muted line "Last updated: [date]". Directly below, a single tinted summary card (bg #EDF3F6, 1px #E2E8F0 border, radius 16px, a small teal hairline-with-node accent on top) containing the one-paragraph plain-language TL;DR.*
> *Then numbered section headings in near-black (#0B1B22, H2), comfortable slate body (#475569), bulleted lists with green (#16A34A) checkmarks where listing rights/data types, and a thin 1px #E2E8F0 divider between sections.*
> *Privacy headings in order: 1 Introduction & Who We Are · 2 Information We Collect · 3 How We Use Your Information · 4 Legal Basis for Processing · 5 Cookies & Analytics · 6 How We Share Your Information · 7 International Data Transfers · 8 Data Retention · 9 Data Security · 10 Your Privacy Rights · 11 Children's Privacy · 12 Changes to This Policy · 13 Contact Us.*
> *Terms headings in order: 1 Acceptance of These Terms · 2 Our Services · 3 Intellectual Property & Ownership of Deliverables · 4 Payment Terms · 5 Client Responsibilities · 6 Confidentiality · 7 Warranties & Disclaimers · 8 Limitation of Liability · 9 Third-Party Links & Services · 10 Termination · 11 Governing Law & Disputes · 12 Changes to These Terms · 13 Contact Us.*
> *Email support@oraixen.com and phone +1-313-482-0813 render as teal links, kept LTR. End with a "Contact Us" block (teal icon tile + email/phone) and a quiet teal CTA back to Contact. Do NOT invent legal clause wording — keep body text to the short summaries in §15; mark any unfilled body "[Placeholder — to be confirmed by counsel]". Generate both a desktop frame (1280px) and a mobile frame (375px).*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: "Arabic RTL version, TOC sidebar on the RIGHT, article right-aligned, checkmarks to the RIGHT. Titles سياسة الخصوصية / شروط الخدمة; eyebrow «قانوني»; «آخر تحديث: [التاريخ]». Use the Arabic headings from §15.C. Body line-height 1.75. Keep email/phone/URLs isolated LTR. Do NOT invent or auto-translate clauses — use only the supplied Arabic summaries; mark unfilled body «[نص قانوني سيُؤكَّد من المستشار القانوني]»."*

---

## 10. New High-Value Sections

> These live *inside* existing pages (not as new nav items). All numeric claims use the Facts table (0.3). Bands flagged `[CLIENT TO CONFIRM]` must be verified before launch. Each prompt assumes THEME + RESPONSIVE pasted above it.

### 10.1 FAQ Section

**Purpose / placement:** Objection-handler that shortens the funnel. **Primary home:** bottom of **Services** (after Engagement Models, before final CTA). **Secondary:** an accordion on **Contact** beside the form. Single-column accordion (max ~820px), one item open by default (the pricing question). Also strong long-tail SEO.

**Header pattern:** eyebrow `Answers / إجابات` → H2 **Questions, answered. / أسئلة، بإجابات واضحة.** → sub *"The things clients ask before we start. If yours isn't here, just ask." / "ما يسأل عنه عملاؤنا قبل أن نبدأ. وإن لم تجد سؤالك هنا، اسألنا مباشرةً."* → accordion → closing link `Still have a question? Let's talk → / لا يزال لديك سؤال؟ لنتحدّث ←`.

**The 8 Q&A pairs (full copy):**

| # | Q (EN) | A (EN) | Q (AR) | A (AR) |
|---|---|---|---|---|
| 1 | How do you price a project, and what does it cost? | Most engagements start around $10k for a focused build and scale with complexity; larger platforms run $50k–$100k+. We price per fixed scope or as a monthly dedicated team after a short discovery call — you'll always see a clear estimate before any commitment. | كيف تُسعّرون المشروع، وكم تبلغ تكلفته؟ | تبدأ معظم المشاريع من حوالي 10 آلاف دولار للبناء المُركّز وتزيد بحسب التعقيد، فيما تتراوح المنصّات الأكبر بين 50 و100 ألف دولار وأكثر. نُسعّر بنطاق ثابت أو كفريق مخصّص شهري بعد مكالمة تعارف قصيرة — وستحصل دائماً على تقدير واضح قبل أي التزام. |
| 2 | How long does a project take? | Most mobile apps ship in 3–6 months; web platforms in 2–5 months; large corporate or hardware+AI systems in 6–18 months. We commit to a roadmap with milestones up front and demo progress weekly. | كم يستغرق المشروع؟ | تُطلَق معظم تطبيقات الموبايل خلال 3–6 أشهر، ومنصّات الويب خلال 2–5 أشهر، والأنظمة الكبيرة خلال 6–18 شهراً. نلتزم بخارطة طريق ومراحل واضحة من البداية ونعرض التقدّم أسبوعياً. |
| 3 | Who owns the code and the IP? | You do — 100%. Full source code and IP rights transfer to you on final delivery and payment. No lock-in, no hidden licensing. | لمن تعود ملكية الكود والملكية الفكرية؟ | أنت تملكها بالكامل — 100%. تُنقل الشيفرة المصدرية وحقوق الملكية الفكرية إليك عند التسليم والدفع النهائي. دون احتكار ودون تراخيص خفية. |
| 4 | What happens after launch? | Every release ships with a documented QA process and a post-launch support window to fix any defects we find together. After that, you can continue with a flexible Maintenance & Support retainer. | ماذا يحدث بعد الإطلاق؟ | يأتي كل إصدار بعملية ضمان جودة موثّقة وفترة دعم بعد الإطلاق لمعالجة أي خلل. وبعدها يمكنك المتابعة مع باقة صيانة ودعم مرنة. |
| 5 | How do you communicate during the project? | A dedicated channel, a single point of contact, weekly demos of working software, and shared access to the roadmap and progress board. You're never guessing where your project stands. | كيف تتواصلون أثناء المشروع؟ | قناة تواصل مخصّصة، ونقطة تواصل واحدة، وعروض أسبوعية للبرمجيات العاملة، ووصول مشترك إلى خارطة الطريق ولوحة التقدّم. |
| 6 | Where is your team based, and how do timezones work? | We're headquartered in Toronto, Canada, with a strong delivery team across Egypt and the MENA region — overlapping working hours with North America and Europe. | أين يقع فريقكم، وكيف تُدار فوارق التوقيت؟ | مقرّنا الرئيسي في تورنتو بكندا، مع فريق تنفيذ قوي في مصر ومنطقة الشرق الأوسط — بساعات عمل تتقاطع مع أمريكا الشمالية وأوروبا. |
| 7 | Do you sign NDAs and keep projects confidential? | Yes. We sign an NDA before any detailed discussion, and we can keep client names, brands, and details fully private — several of our builds are confidential by request. | هل توقّعون اتفاقيات سرية وتحافظون على سرية المشاريع؟ | نعم. نوقّع اتفاقية عدم إفصاح قبل أي نقاش تفصيلي، ويمكننا الحفاظ على سرية الأسماء والتفاصيل بالكامل — وعدد من مشاريعنا سرّي بناءً على الطلب. |
| 8 | Can you work with our existing team or codebase? | Absolutely. We can join as a dedicated squad building alongside you, augment your team with specific engineers, or take ownership of an existing codebase after a technical audit. | هل يمكنكم العمل مع فريقنا أو الكود الحالي لدينا؟ | بالتأكيد. يمكننا الانضمام كفريق مخصّص يبني إلى جانبكم، أو تعزيز فريقكم بمهندسين محدّدين، أو تولّي قاعدة كود قائمة بعد تدقيق تقني. |

> **📋 Stitch Prompt — FAQ (English):** *[THEME + RESPONSIVE.] Design an FAQ section for the bottom of the Services page. Centered column, max-width 820px. Top: teal pill eyebrow "Answers", bold H2 "Questions, answered." (≤6 words), one slate supporting line. Below: a vertical accordion of 8 items, each a white card with 1px #E2E8F0 border, 16px radius, soft shadow, 16px gap. Each row: question in semibold near-black on the left, a teal chevron on the right; the FIRST item ("How do you price a project, and what does it cost?") is expanded by default showing its answer in slate body; the other 7 collapsed. Use the 8 questions above. Under the accordion, a teal text link "Still have a question? Let's talk →". Elevation = soft shadow + border only. Generate desktop (1280px) and mobile (375px, full-width, one item open at a time) frames.*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: same FAQ, full RTL, Tajawal. Questions right-aligned with the teal chevron on the LEFT of each row; expanded answer right-aligned. Eyebrow «إجابات», H2 «أسئلة، بإجابات واضحة.». Use the 8 AR questions/answers above; first item expanded. Closing link «لا يزال لديك سؤال؟ لنتحدّث ←» with the arrow pointing LEFT. No Arabic italics; body line-height 1.8; keep email/phone/URLs LTR.*

### 10.2 Engagement Models ("How we work together")

**Purpose / placement:** Removes the #1 missing-info objection (how you engage + roughly what it costs). **Home:** a Services section after the 4 service blocks, before FAQ. Three equal-height cards (3-col desktop, 1-up mobile). Bands align to the Contact budget ranges; footer links to it as "Engagement & Pricing / التعاون والأسعار".

**Header:** eyebrow `Engagement / نماذج التعاون` → H2 **How we work together. / كيف نعمل معاً.** → sub *"Three ways to engage Oraixen — pick the one that fits your stage. All start with a conversation, never a contract." / "ثلاث طرق للتعاون مع أوريكسن — اختر ما يناسب مرحلتك. وجميعها يبدأ بمحادثة، لا بعقد."*

| | Card 1 — Fixed-Scope Project | Card 2 — Dedicated Team *(highlighted, "Most popular")* | Card 3 — Maintenance & Support |
|---|---|---|---|
| Title EN / AR | Fixed-Scope Project / مشروع بنطاق محدّد | Dedicated Team / فريق مخصّص | Maintenance & Support / الصيانة والدعم |
| One-liner EN | A defined product with clear requirements — fixed scope, milestones, and a fixed price. | A cross-functional squad working as your extended team, billed monthly. | Keep a live product healthy — monitoring, updates, and a post-launch support window. |
| One-liner AR | منتج محدّد بمتطلّبات واضحة — نطاق ثابت، ومراحل، وسعر ثابت. | فريق متعدّد التخصّصات يعمل كامتداد لفريقك، بفوترة شهرية. | حافظ على منتجك الحيّ بصحة جيدة — مراقبة وتحديثات وفترة دعم بعد الإطلاق. |
| Best for EN / AR | Startups & teams with a scoped MVP. / الشركات الناشئة والفرق ذات المنتج المُحدَّد. | Evolving products needing continuous delivery. / المنتجات المتطوّرة التي تحتاج تسليماً مستمراً. | Shipped products needing ongoing care. / المنتجات المُطلَقة التي تحتاج رعاية مستمرة. |
| Includes EN | Discovery & roadmap · Fixed price & timeline · Full design + build · QA + handover | Cross-functional squad · Monthly billing · Flexible scope · Weekly demos | Monitoring & uptime · Bug fixes & updates · Small feature work · Priority response |
| Includes AR | اكتشاف وخارطة طريق · سعر ومدة ثابتان · تصميم وبناء كامل · ضمان جودة وتسليم | فريق متعدّد التخصّصات · فوترة شهرية · نطاق مرن · عروض أسبوعية | مراقبة وزمن تشغيل · إصلاح أخطاء وتحديثات · مزايا صغيرة · استجابة ذات أولوية |
| Starting band `[CLIENT TO CONFIRM]` | From $10k / من 10 آلاف دولار | From $8k/mo / من 8 آلاف دولار شهرياً | From $1.5k/mo / من 1,500 دولار شهرياً |
| CTA EN / AR | Discuss your project / ناقش مشروعك | Build a team / كوّن فريقاً | Get a support plan / احصل على باقة دعم |

> *Starting bands are placeholders aligned to the Contact budget selects ($10k–$50k / $50k–$100k / $100k+) — tune with the client.*

> **📋 Stitch Prompt — Engagement Models (English):** *[THEME + RESPONSIVE.] Design an "Engagement models" section for the Services page. Top: teal pill eyebrow "Engagement", bold H2 "How we work together.", slate sub (above). Below: a 3-column grid of equal-height cards (3 desktop / 1 mobile, 24px gap). Each white card (1px #E2E8F0 border, 16px radius, soft shadow): a 56px teal icon tile, bold title, one-line description, a 4-item green-checkmark list, a small "Starting from" price row in teal-deep, and a button. Card 1 "Fixed-Scope Project" / From $10k / button "Discuss your project" (outline). Card 2 (HIGHLIGHTED — slightly elevated, thin teal top accent bar, small "Most popular" pill) "Dedicated Team" / From $8k/mo / button "Build a team" (solid teal). Card 3 "Maintenance & Support" / From $1.5k/mo / button "Get a support plan". Below the cards, a slim 3-step "What happens next" strip: "1. We reply within 24 hours. 2. A 30-minute scoping call. 3. A tailored proposal & timeline." Use the exact one-liners and Includes lists above. Generate desktop (1280px) and mobile (375px, highlighted card first) frames.*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: same section, full RTL, Tajawal, right-aligned, checkmarks to the RIGHT. Eyebrow «نماذج التعاون», H2 «كيف نعمل معاً.». Cards «مشروع بنطاق محدّد» (من 10 آلاف دولار، زر «ناقش مشروعك») · «فريق مخصّص» (highlighted, pill «الأكثر طلباً», من 8 آلاف دولار شهرياً, زر «كوّن فريقاً») · «الصيانة والدعم» (من 1,500 دولار شهرياً, زر «احصل على باقة دعم»). "What happens next" strip «ماذا يحدث بعد ذلك»: «1. نردّ خلال 24 ساعة. 2. مكالمة تحديد نطاق لمدة 30 دقيقة. 3. عرض وجدول زمني مخصّص.» Western numerals, LTR-isolated. Generate desktop + mobile frames.*

### 10.3 Industries We Serve

**Purpose / placement:** B2B buyers self-identify by industry first. **Home:** between Services overview and Featured Work. **Companion:** the industry filter row on Projects (9.4). Each chip links to the filtered Projects view. Derived from the real 28-project portfolio.

**Real data behind the grid (verified):** E-commerce 7 (Alkanz, Maqdia, Goffa, Shotreed, Woodex, Shopisonic, Elmongez) · Food & Logistics 3 (Order FS, Rosto, Vooo Menu) · Professional Services 3 (M3lesh, Hafawa, Govet) · Business 3 (MAAT, Uzex, Gefires) · Education 2 (Zewail City, IBDL) · Retail 2 (Discount Emy, Vending) · Fintech 1 (Waffar Cash) · Healthcare 1 (Teb & Aafya) · Legal 1 (Saharad) · Jobs 1 (M6lob) · Social 1 (Teens Hangouts) · Productivity 1 (DU V DU) · Technology 1 (Inovara) · Utilities 1 (Dar Alkahraba). **Surface 6–8 strongest on Home** to avoid clutter; the Projects filter exposes the rest behind a "More" pill.

**Header:** eyebrow `Who we build for / لمن نبني` → H2 **Trusted across industries. / موثوقون عبر القطاعات.** → sub *"28 products shipped across 15 industries — from fintech and healthcare to e-commerce and education." / "28 منتجاً تم إطلاقها عبر 15 قطاعاً — من التقنية المالية والرعاية الصحية إلى التجارة الإلكترونية والتعليم."*

**Industry chips — EN → AR + icon + link (fixed dictionary; reuse for the Projects filter so labels never drift):**

| EN chip | AR chip | Lucide icon | Links to |
|---|---|---|---|
| E-commerce | التجارة الإلكترونية | `shopping-cart` | `/projects?industry=ecommerce` |
| Fintech | التقنية المالية | `wallet` | `/projects?industry=finance` |
| Healthcare | الرعاية الصحية | `heart-pulse` | `/projects?industry=healthcare` |
| Education | التعليم | `graduation-cap` | `/projects?industry=education` |
| Food & Logistics | الأطعمة والتوصيل | `utensils` | `/projects?industry=food` |
| Professional Services | الخدمات المهنية | `briefcase` | `/projects?industry=services` |
| Retail | البيع بالتجزئة | `store` | `/projects?industry=retail` |
| Jobs / Recruitment | التوظيف | `users` | `/projects?industry=jobs` |
| Legal | القانون | `scale` | `/projects?industry=legal` |
| Utilities | المرافق | `zap` | `/projects?industry=utilities` |
| Social | التواصل الاجتماعي | `message-circle` | `/projects?industry=social` |
| Technology | التقنية | `cpu` | `/projects?industry=technology` |
| Business | الأعمال | `building-2` | `/projects?industry=business` |
| Productivity | الإنتاجية | `layout-grid` | `/projects?industry=productivity` |

> **📋 Stitch Prompt — Industries (English):** *[THEME + RESPONSIVE.] Design an "Industries we serve" section for the Home page, between the services overview and featured projects. Top: teal pill eyebrow "Who we build for", bold H2 "Trusted across industries.", slate sub (above). Below: a responsive grid of 8 compact industry tiles (4 cols desktop / 3 tablet / 2 mobile, equal-height, 16px gap). Each white tile (1px #E2E8F0 border, 16px radius, soft shadow): a 56px teal icon tile, the industry name in semibold near-black, and a small slate count line. Tiles with icons + counts: E-commerce (shopping-cart, "7 projects"), Fintech (wallet, "1 project"), Healthcare (heart-pulse, "1 project"), Education (graduation-cap, "2 projects"), Food & Logistics (utensils, "3 projects"), Professional Services (briefcase, "3 projects"), Retail (store, "2 projects"), Jobs (users, "1 project"). On hover each tile lifts, border tints teal, a small teal arrow appears pointing right. Generate desktop (1280px) and mobile (375px, 2-up) frames.*

> **📋 Arabic / RTL:** *Paste ARABIC/RTL block, then: same section, full RTL, Tajawal. Eyebrow «لمن نبني», H2 «موثوقون عبر القطاعات.». Tiles: التجارة الإلكترونية «7 مشاريع»، التقنية المالية «مشروع واحد»، الرعاية الصحية «مشروع واحد»، التعليم «مشروعان»، الأطعمة والتوصيل «3 مشاريع»، الخدمات المهنية «3 مشاريع»، البيع بالتجزئة «مشروعان»، التوظيف «مشروع واحد». On hover, the arrow points LEFT. Western numerals. Generate desktop + mobile (2-up) frames.*

### 10.4 Trust & Security Band + safe reliability copy

**Purpose / placement:** Premium credibility markers a top studio shows. A quiet **Trust & Security band** near the Home footer-area, repeated on About/Contact; individual chips reusable on Project Detail and Services. Render as small pill chips with a 1.75px teal Lucide icon (`shield`, `file-lock`, `clock`, `lock`, `badge-check`) on a `--surface` tile — **crisp border + soft shadow, no glow.** Mark any badge the client cannot substantiate as `[CONFIRM]`.

**Trust chips (EN | AR):**

| Marker | EN chip | AR chip |
|---|---|---|
| Code & IP ownership | You own 100% of the code & IP — full transfer on final payment | تملك 100% من الكود والملكية الفكرية — نقل كامل عند السداد النهائي |
| NDA / confidentiality | NDA on request before any detailed discussion | اتفاقية عدم إفصاح عند الطلب قبل أي نقاش تفصيلي |
| Post-launch support | Post-launch support window on every release | فترة دعم بعد الإطلاق مع كل إصدار |
| Support SLA | We reply within one business day | نردّ خلال يوم عمل واحد |
| Security practices | Secure SDLC: code reviews, automated + manual QA, security audits | دورة تطوير آمنة: مراجعات للكود واختبارات آلية ويدوية وتدقيق أمني |
| Data compliance | GDPR- & PIPEDA-aligned data handling `[CONFIRM]` | ممارسات بيانات متوافقة مع GDPR وPIPEDA `[CONFIRM]` |
| On-time delivery | Fixed milestones and a clear roadmap, agreed up front | مراحل ثابتة وخارطة طريق واضحة، مُتّفق عليها مسبقاً |
| HQ & reach | Toronto HQ · delivery team across MENA, overlapping NA/EU hours | المقر في تورنتو · فريق تنفيذ في الشرق الأوسط بساعات عمل مشتركة مع أمريكا الشمالية وأوروبا |

**Combined band copy (paste-ready):** Eyebrow `Security & ownership / الأمان والملكية`.
- **EN:** *"NDA on request · You own 100% of the code & IP · GDPR- & PIPEDA-aligned data practices · Secure SDLC with code reviews and security audits · Post-launch support window on every release."*
- **AR:** *«اتفاقية سرية عند الطلب · تملك 100% من الكود والملكية الفكرية · ممارسات بيانات متوافقة مع GDPR وPIPEDA · دورة تطوير آمنة مع مراجعات للكود وتدقيق أمني · فترة دعم بعد إطلاق كل إصدار.»*

**Safe reliability copy (replaces the legally-risky "6-month bug-free guarantee"):** "Bug-free" is an absolute no studio can honor, and a fixed warranty is a contractual term, not a marketing default.
- **EN:** *"Reliability you can count on — a documented QA process, automated and manual testing, and a post-launch support window on every release."* / **AR:** *«موثوقية تعتمد عليها — عملية ضمان جودة موثّقة، واختبارات آلية ويدوية، وفترة دعم بعد إطلاق كل إصدار.»*
- Replace *"guarantees a bug-free product"* → EN *"minimizes defects and ensures a stable, reliable release"* / AR *«يقلّل الأخطاء ويضمن إصداراً مستقراً وموثوقاً.»*
- Flag the specific **"6-month"** duration as `[LEGAL TO CONFIRM]` — never a hard-coded marketing default.

**Optional partner/recognition badges (only if genuinely held):** `Apple Developer · Google Play Developer · Meta / AWS / Firebase partner · Clutch / GoodFirms rating`, each marked `[CONFIRM — show only if held]`. Never substitute the unverifiable `4.9/200` for a real badge.

---

## 11. Future Pages (optional, post-v1) — Insights & Careers

Not part of the locked 9-page v1, but planned surfaces a premium studio adds. Documented as **structure only** so IA/nav/footer can reserve space. **Nav decision:** keep both out of primary nav at launch; surface **Insights** in the footer once 3+ posts exist, **Careers** in the footer under "Company". Sitemap: `/insights`, `/insights/:slug`, `/careers`.

**Insights / Blog (`/insights`)** — long-tail SEO + thought leadership. *Index:* Hero (eyebrow `Insights / رؤى`, H2 **Engineering notes & ideas. / مقالات وأفكار هندسية.**) → category pills → large featured post → 3-column post grid (cover, category chip, title, 2-line excerpt, read-time + date, author) → pagination → CTA. *Article:* breadcrumb → title + meta → cover → single-column body (max ~720px) → tags → author bio → related posts → CTA. **Posts must be real content authored by the team — Stitch generates placeholder titles + gray image blocks only, never article body or fake author names.**

**Careers (`/careers`)** — signals growth. Hero (eyebrow `Careers / وظائف`, H2 **Build the next thing with us. / ابنِ القادم معنا.**) → "Why Oraixen" values strip (reuse Core Values) → perks grid (remote-friendly, real ownership, learning budget, modern stack) → open-roles list (role, location/remote, type, "Apply →") with an **honest empty state** *"No open roles right now — send us your CV anyway." / "لا توجد وظائف شاغرة حالياً — أرسل سيرتك الذاتية على أي حال."* → general-application CTA. Roles list is data-driven; render the empty state rather than fabricated openings.

---

## 12. Iteration Playbook & Reference-Image Guidance

### 12.1 Iteration playbook (refine one block, never regenerate the page)

After a full-page generation, fix pieces with targeted follow-ups starting "Keep everything; regenerate ONLY …":
- **Hero spacing:** *"Keep everything; regenerate ONLY the hero — top/bottom padding 96px, left text column 55%, mockup column 45%, teal radial fill subtle."*
- **Card density:** *"Keep everything; regenerate ONLY the Services cards as 3 equal-height columns, 24px gap, each with a 56px teal-tint icon tile and a single one-line description."*
- **Filter state:** *"Keep everything; show the 'Mobile (12)' pill solid teal/white, all other pills white with teal outline."*
- **Results band (kill invented quotes):** *"Keep everything; replace the testimonials with a 4-up metric row: '1M+ transactions — Waffar Cash', '500k+ orders — Order FS', '$2M+ saved — Discount Emy', '200k+ members — DU V DU'. Do not invent client names or quotes."*
- **CTA band:** *"Keep everything; regenerate ONLY the final CTA as a dark-teal band (#0B1B22→#0F5E70) with a masked dotted grid, H2 'Have a project worth doing right?', and a white 'Start your project' button."*
- **Navbar scrolled state:** *"Add a second frame of the navbar scrolled: white bg, soft shadow, blur; the 'Start your project' button stays visible."*
- **Build the AR twin:** *"Now produce the Arabic RTL version of this exact frame"* + the ARABIC/RTL block.

Densest pages (Home, Project Detail) are best built **hero-first → approve → "append the next section."**

### 12.2 When to attach a reference image

| Generation | Attach | What it controls | What the typed prompt still controls |
|---|---|---|---|
| **First Home** | A clean light-SaaS landing screenshot (Linear / Stripe style) | Aesthetic, whitespace rhythm, "premium not template" feel | Exact colors, fonts, radii, shadows (THEME block) |
| **Home trust strip & Projects grid** | Real Oraixen client-logo lockups (Zewail City, Order FS, DU V DU, Waffar Cash, M6lob) | Real brand marks instead of placeholder rectangles | Card anatomy, chips, copy |
| **Services / Detail media** | A real app screenshot in a device/browser frame (where one exists) | Product imagery tier (B) instead of stock | Frame, radius, shadow, layout |
| **Migrating IA only** | The CURRENT dark site — *with* the instruction "keep this content and IA but convert fully to the light theme above" | Information architecture / content parity | Everything visual (do NOT let it pull the dark style) |

> **Rule:** never attach the dark site as a *style* anchor. Images steer style and asset placement; the THEME block governs tokens.

### 12.3 Imagery & asset guardrails (so the output reads "top-tier studio")

Tier A (hero/CTA) brand/abstract — not photos. Tier B (Projects/Detail/Services) real screenshots in device frames; **22 of 28 projects are logo-only → branded logo-tile placeholder, never a fabricated UI.** Tier C (About only) candid, warm-natural light — never blue corporate stock. Logo tiles: contain on white, 24px padding, 1px border; confirm usage rights per client before publishing. (Full spec: 4.8.)

---

## 13. Responsive Breakpoints

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | 1-column, hamburger nav (full-screen white overlay), stacked sections, 16px gutters, sticky bottom "Start your project" bar, timeline stacks with left-aligned nodes |
| Tablet | 640–1024px | 2-column grids, condensed nav |
| Desktop | 1024–1280px | full multi-column layouts, timeline alternating |
| Wide | > 1280px | centered 1280px container, extra whitespace |

Design **mobile-first**, but always generate **desktop (1280px) + mobile (375px)** frames per screen (the RESPONSIVE block, 8.3, enforces this in every prompt).

---

## 14. Bilingual Copy Deck (EN + AR) — single source of truth for every string

> **How to use:** **Paste, don't translate.** Every string here is final in both languages; Stitch must render these exact words and never auto-translate Arabic. **Numbers are locked** to the Facts table (0.3); Western numerals throughout. **Arabic register:** **تقنية** (not تكنولوجية), **أعمالنا** for the portfolio section, **مشاريع** for individual items, **آلية العمل** for Process. No italics, no uppercase, no negative tracking in Arabic. Items marked `[PLACEHOLDER]` / `[CLIENT TO CONFIRM]` / `[LEGAL TO CONFIRM]` require verified content before launch and must never be invented.

### 14.1 Global CTA lexicon

See the master CTA map in **Section 0.2** — that table governs every button and link, EN + AR.

### 14.2 Shared microcopy & states

| Item | EN | AR |
|---|---|---|
| Button loading | Sending… | جارٍ الإرسال… |
| Generic loading (aria) | Loading… | جارٍ التحميل… |
| Skip to content | Skip to content | تخطَّ إلى المحتوى |
| Cookie banner body | We use essential cookies and basic analytics to improve your experience. | نستخدم ملفات ارتباط أساسية وتحليلات بسيطة لتحسين تجربتك. |
| Cookie accept | Accept | موافق |
| Cookie manage | Manage preferences | إدارة التفضيلات |
| **404 headline** | This page took a different route. | هذه الصفحة سلكت طريقاً آخر. |
| 404 sub | The page you're looking for doesn't exist or has moved. | الصفحة التي تبحث عنها غير موجودة أو تم نقلها. |
| 404 primary / secondary | Back to home / View our work | العودة للرئيسية / شاهد أعمالنا |
| Projects empty (filter) | No projects match this filter yet. | لا توجد مشاريع تطابق هذه التصفية بعد. |
| Empty sub-CTA | View all projects | عرض كل المشاريع |
| Data/load error + retry | We couldn't load this right now. / Retry | تعذّر تحميل المحتوى الآن. / إعادة المحاولة |
| Offline / generic | You appear to be offline. Check your connection. | يبدو أنك غير متصل بالإنترنت. تحقّق من اتصالك. |

### 14.3 Navbar & Footer

**Navbar**

| Element | EN | AR |
|---|---|---|
| Nav links | Home · About · Services · Projects · Process | الرئيسية · من نحن · الخدمات · أعمالنا · آلية العمل |
| Nav CTA (button) | Contact us | تواصل معنا |
| Language switcher | **English** \| العربية | **English** \| العربية |
| Mobile sticky bar | Start your project | ابدأ مشروعك |
| Logo aria-label | Oraixen — home | أوريكسن — الصفحة الرئيسية |

**Footer**

| Element | EN | AR |
|---|---|---|
| Brand line | Premium technology, engineered with precision. | تقنية متميّزة، مصنوعة بإتقان. |
| Column 1 heading | Company | الشركة |
| Column 1 links | About · Services · Projects · Process · Contact | من نحن · الخدمات · أعمالنا · آلية العمل · تواصل معنا |
| Column 2 heading | Services | الخدمات |
| Column 2 links | Mobile Apps · Web Development · Corporate Software · Hardware & AI | تطبيقات الموبايل · تطوير الويب · البرمجيات المؤسسية · الأجهزة والذكاء الاصطناعي |
| Column 3 heading | Contact | تواصل معنا |
| Address | Toronto, ON, Canada | تورنتو، أونتاريو، كندا |
| Email | support@oraixen.com *(LTR)* | support@oraixen.com *(LTR)* |
| Phone | +1-313-482-0813 *(LTR)* | +1-313-482-0813 *(LTR)* |
| Newsletter eyebrow *(optional)* | Stay in the loop | ابقَ على اطّلاع |
| Newsletter sub | Occasional notes on what we ship. No spam. | ملاحظات بين الحين والآخر حول ما نُطلقه. بلا إزعاج. |
| Copyright | © {year} Oraixen Inc. All rights reserved. | © {year} أوريكسن. جميع الحقوق محفوظة. |
| Legal links | Privacy Policy · Terms of Service | سياسة الخصوصية · شروط الخدمة |
| Social aria (LinkedIn) | Oraixen on LinkedIn | أوريكسن على لينكدإن |

### 14.4 Contact-form success / error / states

| Slot | EN | AR |
|---|---|---|
| Form success headline | Message sent. | تم إرسال رسالتك. |
| Form success body | Thanks for reaching out — our team will reply within one business day. | شكراً لتواصلك — سيردّ فريقنا خلال يوم عمل واحد. |
| Success secondary | Send another message | إرسال رسالة أخرى |
| Submit failure | Something went wrong. Please try again or email support@oraixen.com. | حدث خطأ ما. حاول مرة أخرى أو راسلنا على support@oraixen.com. |

### 14.5 HOME

**Hero**

| Slot | EN | AR |
|---|---|---|
| Eyebrow | ⚡ Premium Technology Solutions | ⚡ حلول تقنية متميّزة |
| Headline | Innovation meets **Precision** | حيث يلتقي الابتكار **بالإتقان** |
| *(gradient word)* | "Precision" | "بالإتقان" *(color as one unit — keep the بـ prefix attached)* |
| Subhead | We build premium digital products — mobile apps, web platforms, and AI-powered systems — for teams that refuse to ship anything ordinary. | نبني منتجات رقمية متميّزة — تطبيقات موبايل ومنصّات ويب وأنظمة مدعومة بالذكاء الاصطناعي — لفِرَقٍ لا تقبل بالعادي. |
| Primary / Secondary CTA | Start your project / View our work | ابدأ مشروعك / شاهد أعمالنا |
| Hero caption | Toronto HQ · delivery across the MENA region | مقرّنا في تورنتو · والتنفيذ في منطقة الشرق الأوسط |

**Trust band — logos + stats (combined)**

| Slot | EN | AR |
|---|---|---|
| Logos eyebrow | Teams we've built for | جهات بنينا لها |
| Stat 1 | Since 2014 | منذ 2014 |
| Stat 2 | 28+ Projects Delivered | أكثر من 28 مشروعاً مُنجزاً |
| Stat 3 | 15 Industries Served | 15 قطاعاً |
| Stat 4 | iOS · Android · Web | iOS · أندرويد · ويب |

> Logo marquee uses only real client marks you have rights to show (Zewail City, Order FS, DU V DU, Waffar Cash, M6lob). **Do not** add "across 15 countries."

**Services overview (outcome-led)**

| Slot | EN | AR |
|---|---|---|
| Section eyebrow / H2 | What we do / Four ways we ship | ماذا نقدّم / أربع طرق نُطلق بها منتجك |
| Card link | Learn more → | اعرف المزيد ← |

| Card | Title EN | Title AR | Desc EN | Desc AR |
|---|---|---|---|---|
| 1 | Mobile App Development | تطوير تطبيقات الموبايل | iOS & Android apps your users actually keep — built native, tuned for speed. | تطبيقات iOS وأندرويد يحتفظ بها مستخدموك فعلاً — أصلية وسريعة. |
| 2 | Web Development | تطوير الويب | Fast, scalable web platforms that hold up when traffic spikes. | منصّات ويب سريعة وقابلة للتوسّع تصمد عند ذروة الزيارات. |
| 3 | Corporate Software | البرمجيات المؤسسية | ERP, CRM and dashboards that replace spreadsheets and manual chaos. | أنظمة ERP وCRM ولوحات تحكم تستبدل الجداول والفوضى اليدوية. |
| 4 | Hardware & AI *(Emerging / R&D)* | الأجهزة والذكاء الاصطناعي *(قدرة ناشئة)* | IoT devices and AI that turn physical operations into live data. | أجهزة إنترنت الأشياء وذكاء اصطناعي يحوّل عملياتك الفعلية إلى بيانات حيّة. |

**Featured work**

| Slot | EN | AR |
|---|---|---|
| Eyebrow / H2 | Selected work / Products, not slideshows | أعمال مختارة / منتجات حقيقية، لا عروضاً تقديمية |
| Sub | Three builds we're proud of — each one live, each one used daily. | ثلاثة مشاريع نفخر بها — كلٌّ منها يعمل ويُستخدَم يومياً. |
| Card 1 metric (Zewail City) | 10k+ students served | أكثر من 10 آلاف طالب |
| Card 2 metric (Order FS) | 500k+ orders handled | أكثر من 500 ألف طلب |
| Card 3 metric (DU V DU) | 200k+ community members | أكثر من 200 ألف مستخدم |
| View all | View all projects | عرض كل المشاريع |

**Results band (replaces fabricated testimonials)**

| Slot | EN | AR |
|---|---|---|
| Eyebrow / H2 | Real outcomes / Numbers from shipped products | نتائج حقيقية / أرقام من منتجات تم إطلاقها |
| Metric 1 | 1M+ transactions processed — Waffar Cash | أكثر من مليون عملية — Waffar Cash |
| Metric 2 | 500k+ orders handled — Order FS | أكثر من 500 ألف طلب — Order FS |
| Metric 3 | $2M+ saved for users — Discount Emy | أكثر من 2 مليون دولار من المدّخرات للمستخدمين — Discount Emy |
| Metric 4 | 200k+ community members — DU V DU | أكثر من 200 ألف عضو — DU V DU |
| Aggregate roll-up | 28+ products · 15 industries · iOS, Android & Web · 1M+ end-users across portfolio apps | أكثر من 28 منتجاً · 15 قطاعاً · iOS وأندرويد وويب · أكثر من مليون مستخدم عبر تطبيقات أعمالنا |
| Quote slot | `[PLACEHOLDER — collect real testimonial before launch]` | `[عنصر نائب — يُجمَع قبل الإطلاق]` |

> **Stitch instruction:** Render metrics exactly as above. **Do NOT invent client names, quotes, logos, ratings, or counts.**

**Industries strip** — see 10.3. **Process preview:**

| Slot | EN | AR |
|---|---|---|
| Eyebrow / H2 | How we work / A path, not a black box | آلية العمل / مسار واضح، لا صندوقاً مغلقاً |
| Sub | Five steps, weekly demos, and full transparency from kickoff to launch. | خمس خطوات، وعروض أسبوعية، وشفافية كاملة من الانطلاق حتى الإطلاق. |
| Steps (short) | Discovery · Design · Development · QA · Launch & Support | الاكتشاف · التصميم · التطوير · ضمان الجودة · الإطلاق والدعم |
| CTA (secondary) | View full process | اطّلع على آلية العمل |

**Final CTA banner (dark teal)**

| Slot | EN | AR |
|---|---|---|
| Headline | Have a project worth doing right? | لديك مشروع يستحق أن يُنجَز بإتقان؟ |
| Sub | Tell us what you're building. We'll tell you how we'd ship it. | أخبرنا بما تبنيه، وسنخبرك كيف سنُطلقه. |
| Primary / Secondary CTA | Start your project / View our work | ابدأ مشروعك / شاهد أعمالنا |

### 14.6 ABOUT

**Hero**

| Slot | EN | AR |
|---|---|---|
| Eyebrow | About Oraixen | من نحن |
| Headline | We don't just write code. We engineer products that ship. | لا نكتب الأكواد فحسب — نبني منتجات تُطلَق فعلاً. |
| Subhead | Oraixen is a premium software studio: 28 shipped products across 15 industries, from Toronto to the MENA region. | أوريكسن استوديو برمجيات متميّز: 28 منتجاً مُطلَقاً عبر 15 قطاعاً، من تورنتو إلى منطقة الشرق الأوسط. |

**Our Story**

| Slot | EN | AR |
|---|---|---|
| Eyebrow / H2 | Our story / A name built on intent | قصّتنا / اسمٌ مبنيٌّ على نيّة واضحة |
| Body | "Ora" means *a new beginning* — a renewed direction toward an elevated technological future. "IXEN" blends *Next* and *Innovation*: premium at its core, immaculate in execution, crafted for those who seek distinction. That's the standard we hold every build to. | "Ora" تعني *بداية جديدة* — اتجاهٌ متجدّد نحو مستقبل تقنيّ أرقى. و"IXEN" تمزج بين *Next* و*Innovation*: التميّز في الجوهر، والإتقان في التنفيذ، صناعةٌ لمن يطلب التفرّد. هذا هو المعيار الذي نلتزم به في كل مشروع. |

**Timeline (inflection points)**

| Slot | EN | AR |
|---|---|---|
| Eyebrow | The journey | المسيرة |
| Milestone 1 | Founded in Toronto, 2014 | تأسّست في تورنتو، 2014 |
| Milestone 2 | First mobile product shipped, 2018 | أول منتج موبايل مُطلَق، 2018 |
| Milestone 3 | Multi-platform era — web + mobile + dashboards, 2022 | حقبة تعدّد المنصّات — ويب وموبايل ولوحات تحكم، 2022 |
| Milestone 4 | 28+ projects delivered to date | أكثر من 28 مشروعاً مُنجزاً حتى اليوم |

**Our Foundation**

| Slot | EN | AR |
|---|---|---|
| Eyebrow | Our foundation | أسُسنا |
| **Mission** | Mission — Deliver innovative, high-quality software — crafted with precision, tailored to each client's vision, and delivered on time with full transparency. | رسالتنا — تقديم برمجيات مبتكرة عالية الجودة، مصنوعة بإتقان ومصمّمة وفق رؤية كل عميل، وتُسلَّم في موعدها بشفافية تامة. |
| **Vision** | Vision — To become one of the region's leading technology companies — known for future-ready, reliable, high-impact software, hardware and AI. | رؤيتنا — أن نصبح من الشركات التقنية الرائدة في المنطقة، معروفين بحلول البرمجيات والأجهزة والذكاء الاصطناعي المستقبلية والموثوقة وعالية الأثر. |
| **Purpose** | Purpose — Empower businesses with premium, scalable digital products that create real impact and lasting success. | غايتنا — تمكين الشركات بمنتجات رقمية متميّزة وقابلة للتوسّع تُحقّق أثراً حقيقياً ونجاحاً طويل الأمد. |

**Core Values (6)**

| Value | EN | AR | Description EN | Description AR |
|---|---|---|---|---|
| 1 | Innovation | الابتكار | We pursue better solutions, not just newer tools. | نسعى لحلول أفضل، لا لمجرّد أدوات أحدث. |
| 2 | Integrity | النزاهة | We do what we said we'd do — and tell you early when plans change. | نفعل ما وعدنا به — ونُبلغك مبكراً حين تتغيّر الخطط. |
| 3 | Collaboration | التعاون | We work as your extended team, not a distant vendor. | نعمل كامتدادٍ لفريقك، لا كمورّدٍ بعيد. |
| 4 | Reliability | الموثوقية | We ship stable releases and stand behind them. | نُطلق إصدارات مستقرة ونقف خلفها. |
| 5 | Excellence | التميّز | Good enough is never the brief. | "جيّد بما يكفي" ليس معيارنا أبداً. |
| 6 | Continuous Improvement | التحسين المستمر | Every release teaches us something the next one uses. | كل إصدار يعلّمنا شيئاً يستفيد منه التالي. |

**About CTA**

| Slot | EN | AR |
|---|---|---|
| Headline | Want to see how we work? | تريد أن ترى كيف نعمل؟ |
| Primary / Secondary | Start your project / View our work | ابدأ مشروعك / شاهد أعمالنا |

### 14.7 SERVICES

**Hero**

| Slot | EN | AR |
|---|---|---|
| Eyebrow / Headline | What we do / Our Services | ماذا نقدّم / خدماتنا |
| Subhead | Four ways we turn ambitious ideas into reliable, shipped software. | أربع طرق نحوّل بها الأفكار الطموحة إلى برمجيات موثوقة ومُطلَقة. |

**Shared labels:** Deliverables / المُخرجات · Timeline / المدة الزمنية · Best For / الأنسب لـ · Block CTA: Discuss your project / ناقش مشروعك.

**Block 1 — Mobile App Development / تطوير تطبيقات الموبايل**

| Field | EN | AR |
|---|---|---|
| Description | Native and cross-platform apps with seamless UX — built to be kept, not deleted. | تطبيقات نِيتف ومتعددة المنصّات بتجربة استخدام سلسة — مصنوعة ليحتفظ بها المستخدم لا ليحذفها. |
| Deliverables | iOS & Android Apps · React Native / Flutter · UI/UX Design · App Store Optimization | تطبيقات iOS وأندرويد · React Native / Flutter · تصميم تجربة وواجهة · تحسين المتاجر |
| Timeline / Best For | 3–6 months · Startups, consumer brands, enterprise tools | 3–6 أشهر · الشركات الناشئة، العلامات الاستهلاكية، أدوات المؤسسات |

**Block 2 — Web Development / تطوير الويب**

| Field | EN | AR |
|---|---|---|
| Description | Modern, responsive, high-performance web apps and platforms that scale. | تطبيقات ومنصّات ويب حديثة وسريعة وقابلة للتوسّع. |
| Deliverables | SaaS Platforms · E-commerce · PWAs · CMS Solutions | منصّات SaaS · متاجر إلكترونية · تطبيقات ويب تقدّمية · حلول إدارة محتوى |
| Timeline / Best For | 2–5 months · SaaS, e-commerce, corporate portals | 2–5 أشهر · SaaS، التجارة الإلكترونية، البوابات المؤسسية |

**Block 3 — Corporate Software Platforms / منصّات البرمجيات المؤسسية**

| Field | EN | AR |
|---|---|---|
| Description | Custom software that streamlines complex operations and replaces manual chaos. | برمجيات مخصّصة تبسّط العمليات المعقّدة وتُنهي الفوضى اليدوية. |
| Deliverables | ERP · CRM · HR Tools · Data Dashboards | أنظمة ERP · CRM · أدوات موارد بشرية · لوحات بيانات |
| Timeline / Best For | 6–12 months · enterprises, logistics, finance, healthcare | 6–12 شهراً · المؤسسات، اللوجستيات، التمويل، الرعاية الصحية |

**Block 4 — Hardware + Software + AI / الأجهزة والبرمجيات والذكاء الاصطناعي** *(label "Emerging / R&D" / "قدرة ناشئة")*

| Field | EN | AR |
|---|---|---|
| Description | Integrated IoT, embedded systems, and AI that turn physical operations into live data. | منظومات إنترنت الأشياء والأنظمة المدمجة والذكاء الاصطناعي المتكاملة التي تحوّل عملياتك إلى بيانات حيّة. |
| Deliverables | IoT Devices · Embedded Systems · Computer Vision · Predictive Analytics | أجهزة إنترنت الأشياء · أنظمة مدمجة · رؤية حاسوبية · تحليلات تنبّؤية |
| Timeline / Best For | 6–18 months · manufacturing, smart cities, MedTech, AgTech | 6–18 شهراً · التصنيع، المدن الذكية، التقنية الطبية، التقنية الزراعية |

**Engagement Models** — see 10.2. **FAQ** — see 10.1.

**Services CTA**

| Slot | EN | AR |
|---|---|---|
| Headline / Sub | Not sure which service you need? / Tell us the problem. We'll recommend the path. | لست متأكداً أي خدمة تناسبك؟ / أخبرنا بالمشكلة، ونقترح عليك المسار. |
| Primary CTA | Start your project | ابدأ مشروعك |

### 14.8 PROJECTS

**Hero**

| Slot | EN | AR |
|---|---|---|
| Eyebrow / Headline | Our work / Selected Projects | أعمالنا / مشاريع مختارة |
| Subhead | Real products, real users — 28 builds across finance, healthcare, education, retail and more. | منتجات حقيقية ومستخدمون حقيقيون — 28 مشروعاً في التمويل والرعاية الصحية والتعليم والتجزئة وغيرها. |

**Category filter bar (with counts, derived from data):** All (28) / الكل (28) · Mobile (12) / موبايل (12) · Platform (8) / منصّات (8) · Web (8) / ويب (8). **Mobile** active by default.

**Industry filter row (secondary):** All · E-commerce · Services · Business · Education · Food · Finance · Healthcare · More / الكل · التجارة الإلكترونية · الخدمات · الأعمال · التعليم · الأطعمة · التمويل · الرعاية الصحية · المزيد.

**EN → AR taxonomy dictionary (card chips — use these exact labels):**

**Industries:** Education = التعليم · E-commerce = التجارة الإلكترونية · Utilities = المرافق · Productivity = الإنتاجية · Retail = البيع بالتجزئة · Food Service = خدمات الطعام · Business = الأعمال · Jobs = التوظيف · Social = التواصل الاجتماعي · Technology = التقنية · Finance = التمويل · Healthcare = الرعاية الصحية · Food = الأطعمة · Services = الخدمات · Legal = القانون.

**Categories / platforms:** Web = ويب · Mobile = موبايل · Platform = منصّات · Website = موقع إلكتروني · Play Store = متجر بلاي · App Store = آب ستور · Dashboard = لوحة تحكم.

**Card microcopy**

| Slot | EN | AR |
|---|---|---|
| Confidential badge | Confidential | سرّي |
| Tech overflow | +{N} more | +{N} المزيد |
| Card link (hover) | View case study → | عرض دراسة الحالة ← |
| Card aria-label | "{Project} — {Industry} product by Oraixen" | "{Project} — منتج {Industry} من أوريكسن" |

**Projects CTA**

| Slot | EN | AR |
|---|---|---|
| Headline / Sub | Have a project in mind? / We've shipped across 15 industries. Yours could be next. | لديك مشروع في ذهنك؟ / أطلقنا في 15 قطاعاً. وقد يكون مشروعك التالي. |
| Primary CTA | Start your project | ابدأ مشروعك |

### 14.9 PROJECT DETAIL

| Slot | EN | AR |
|---|---|---|
| Back link | ← Back to projects | → العودة إلى المشاريع |
| Industry chip (link) | See more {Industry} projects → | شاهد المزيد من مشاريع {Industry} ← |
| Year / Client labels | Year / Client | السنة / العميل |
| Platform: Website | Visit Website | زيارة الموقع |
| Platform: Play | Get it on Play Store | تحميل من متجر بلاي |
| Platform: App | Download on the App Store | تحميل من آب ستور |
| Overview heading | Overview | نظرة عامة |
| Block headings | The Challenge / Our Solution / The Impact | التحدّي / الحل / الأثر |
| Mid-page soft CTA | Building something like this? **Start your project.** | تبني شيئاً مشابهاً؟ **ابدأ مشروعك.** |
| Metrics heading | By the numbers | بالأرقام |
| Tech stack heading | Tech Stack | التقنيات المستخدمة |
| Highlights heading | Highlights | أبرز المميّزات |
| Related heading | Related Projects | مشاريع ذات صلة |
| End CTA | Want results like these? / Start your project | تريد نتائج مماثلة؟ / ابدأ مشروعك |

> **Metrics rule:** populate from each project's own `metrics` array; the Zewail City "10k+ / 99.9% / <2s" trio is an example only, never a default.

### 14.10 PROCESS

**Hero**

| Slot | EN | AR |
|---|---|---|
| Eyebrow / Headline | How we work / Our Process | آلية العمل / آلية عملنا |
| Subhead | Five steps and weekly demos — so you always know what we're building and why. | خمس خطوات وعروض أسبوعية — لتبقى دائماً على دراية بما نبنيه ولماذا. |

**5-step timeline**

| Step | Title EN | Title AR | Sub-items EN | Sub-items AR |
|---|---|---|---|---|
| 01 | Discovery & Strategy | الاكتشاف والاستراتيجية | Requirements Gathering · Market Research · Technical Feasibility · Project Roadmap | جمع المتطلبات · بحث السوق · دراسة الجدوى التقنية · خارطة طريق المشروع |
| 02 | Design & Prototyping | التصميم والنماذج الأولية | Wireframing · UI/UX Design · Interactive Prototypes · Design System | المخطّطات الهيكلية · تصميم التجربة والواجهة · نماذج تفاعلية · نظام تصميم |
| 03 | Development | التطوير | Frontend & Backend · API Integration · Database Design · Code Reviews | الواجهة والخادم · تكامل الـ API · تصميم قواعد البيانات · مراجعات الكود |
| 04 | Quality Assurance | ضمان الجودة | Automated Testing · Manual Testing · Security Audits · Performance Tuning | اختبارات آلية · اختبارات يدوية · تدقيق أمني · ضبط الأداء |
| 05 | Launch & Support | الإطلاق والدعم | Deployment · Monitoring · Maintenance · Feature Updates | النشر · المراقبة · الصيانة · تحديثات الميزات |

**Why Choose Oraixen (3 cards — softened, legally safe)**

| Slot | EN | AR |
|---|---|---|
| Eyebrow | Why Oraixen | لماذا أوريكسن |
| Card 1 | Transparent Communication — Weekly sprints, live demos, and a dedicated channel — no surprises. | تواصل شفّاف — عروض أسبوعية، ولقاءات حيّة، وقناة تواصل مخصّصة — بلا مفاجآت. |
| Card 2 | Reliability You Can Count On — A documented QA process, automated and manual testing, and a post-launch support window on every release. | موثوقية تعتمد عليها — عملية ضمان جودة موثّقة، واختبارات آلية ويدوية، وفترة دعم بعد إطلاق كل إصدار. |
| Card 3 | Long-term Support — Flexible maintenance plans that grow with your product. | دعم طويل الأمد — خطط صيانة مرنة تنمو مع منتجك. |

> Replaces the risky "6-month bug-free warranty / guarantees a bug-free product" claims — see 10.4. The specific 6-month figure is `[LEGAL TO CONFIRM]`.

**Process CTA**

| Slot | EN | AR |
|---|---|---|
| Headline / Primary | Ready when you are. / Start your project | جاهزون متى كنت مستعداً. / ابدأ مشروعك |

### 14.11 CONTACT

**Left column**

| Slot | EN | AR |
|---|---|---|
| Eyebrow / Headline | Contact us / Let's build something extraordinary. | تواصل معنا / لنبنِ شيئاً استثنائياً. |
| Subhead | Tell us about your project. We reply within one business day. | أخبرنا عن مشروعك. نردّ خلال يوم عمل واحد. |
| Email card | Email · support@oraixen.com *(LTR)* | البريد الإلكتروني · support@oraixen.com *(LTR)* |
| Phone card | Call us · +1-313-482-0813 *(LTR)* | اتصل بنا · +1-313-482-0813 *(LTR)* |
| Location card | Visit us · Toronto, ON, Canada | زُرنا · تورنتو، أونتاريو، كندا |

**"What happens next" strip**

| Step | EN | AR |
|---|---|---|
| Eyebrow | What happens next | ماذا يحدث بعد ذلك |
| 1 | We reply within 24 hours. | نردّ خلال 24 ساعة. |
| 2 | A 30-min scoping call to understand your goals. | مكالمة تحديد نطاق لمدة 30 دقيقة لفهم أهدافك. |
| 3 | You receive a tailored proposal & timeline. | تستلم عرضاً وجدولاً زمنياً مخصصاً. |

**Form fields**

| Field | Label EN | Label AR | Placeholder EN | Placeholder AR |
|---|---|---|---|---|
| Name * | Name | الاسم | Your full name | اسمك الكامل |
| Email * | Email | البريد الإلكتروني | you@company.com | you@company.com |
| Company | Company *(optional)* | الشركة *(اختياري)* | Company name | اسم الشركة |
| Budget | Budget *(optional)* | الميزانية *(اختياري)* | Select a range | اختر النطاق |
| Timeline | Timeline *(optional)* | الإطار الزمني *(اختياري)* | Select a timeline | اختر الإطار الزمني |
| Message * | Message | رسالتك | Goals, scope, deadlines — whatever helps us help you. | الأهداف والنطاق والمواعيد — أي تفاصيل تساعدنا على مساعدتك. |

**Select options:** Budget — $10k–$50k / 10–50 ألف دولار · $50k–$100k / 50–100 ألف دولار · $100k+ / أكثر من 100 ألف دولار. Timeline — ASAP / في أقرب وقت · 1–3 months / 1–3 أشهر · 3–6 months / 3–6 أشهر.

**Form microcopy & validation**

| Slot | EN | AR |
|---|---|---|
| Submit default / loading | Send message / Sending… | إرسال الرسالة / جارٍ الإرسال… |
| Reassurance | No spam. We reply within one business day. | لا رسائل مزعجة. نردّ خلال يوم عمل واحد. |
| Privacy note | By sending this, you agree to our Privacy Policy. | بإرسالك هذا، فإنك توافق على سياسة الخصوصية. |
| Error — Name | Please enter your name. | يرجى إدخال اسمك. |
| Error — Email | Enter a valid email address. | يرجى إدخال بريد إلكتروني صحيح. |
| Error — Message | Tell us a bit about your project. | أخبرنا قليلاً عن مشروعك. |
| Submit failure | Something went wrong. Please try again or email support@oraixen.com. | حدث خطأ ما. حاول مرة أخرى أو راسلنا على support@oraixen.com. |
| Success headline / body | Message sent. / Thanks for reaching out — our team will reply within one business day. | تم إرسال رسالتك. / شكراً لتواصلك — سيردّ فريقنا خلال يوم عمل واحد. |
| Success secondary | Send another message | إرسال رسالة أخرى |

### 14.12 Alt-text & ARIA copy rules

| Element | Rule EN | Rule AR |
|---|---|---|
| Project logo tile | alt = "{Project} — {Industry} product by Oraixen" | alt = "{Project} — منتج {Industry} من أوريكسن" |
| Language switcher | aria = "Switch language to Arabic" / "Switch language to English" | aria = "التبديل إلى العربية" / "Switch to English" |
| Social icons | aria = "Oraixen on {Platform}" | aria = "أوريكسن على {Platform}" |
| Hero decorative graphics | aria-hidden / empty alt (decorative) | aria-hidden / نص بديل فارغ (زخرفي) |
| OG default image | Oraixen — Premium Software, Web & AI Studio | أوريكسن — استوديو برمجيات وويب وذكاء اصطناعي |

### 14.13 Testimonial placeholder templates (anchored to real projects — client fills the quote)

> **Stitch instruction:** Render names/quotes from this list **only**. Do NOT invent client names. These are `[PLACEHOLDER]` until verified. Each is anchored to a real project so the embedded metric is true. **Recommended fallback for v1:** ship the **Results band (14.5)** instead — it delivers social proof with zero fabricated attributions.

| # (industry) | EN | AR |
|---|---|---|
| 1 (Order FS · Food Service) | "Oraixen shipped our customer apps, restaurant dashboard, and order system as one tight platform — we now handle 500k+ orders without breaking a sweat, and they delivered on the date they promised." — [Name], [Operations Lead], Order FS | «سلّمتنا أوريكسن تطبيقات العملاء ولوحة المطاعم ونظام الطلبات كمنصّة واحدة متكاملة — ونعالج الآن أكثر من 500 ألف طلب بسلاسة، وسلّموا في الموعد الذي وعدوا به.» — [الاسم]، [مدير العمليات]، Order FS |
| 2 (Zewail City · Education) | "They rebuilt our entire academic platform and made 10,000+ students' and faculty's daily lives easier. Calm, precise, on time." — [Name], [IT Director], Zewail City | «أعادوا بناء منصّتنا الأكاديمية بالكامل وسهّلوا يوم أكثر من 10 آلاف طالب وعضو هيئة تدريس. هدوء وإتقان وفي الموعد.» — [الاسم]، [مدير تقنية المعلومات]، مدينة زويل |
| 3 (Waffar Cash · Finance) | "From idea to 120k+ users and 1M+ transactions, Oraixen handled the hard fintech parts — secure payments, rewards, and scale — so we could focus on growth." — [Name], [Founder & CEO], Waffar Cash | «من الفكرة إلى أكثر من 120 ألف مستخدم ومليون عملية، تولّت أوريكسن أصعب أجزاء التقنية المالية — مدفوعات آمنة ومكافآت وقابلية للتوسّع.» — [الاسم]، [المؤسس والرئيس التنفيذي]، Waffar Cash |
| 4 (Maqdia · E-commerce) | "Our iOS and Android stores plus the admin dashboard came as one coherent build. Inventory, orders, and customers in one place — our team finally stopped firefighting." — [Name], [E-commerce Manager], Maqdia | «تطبيقاتنا على iOS وأندرويد مع لوحة التحكم جاءت كمنظومة واحدة متناسقة. المخزون والطلبات والعملاء في مكان واحد — توقّف فريقنا أخيراً عن إطفاء الحرائق.» — [الاسم]، [مدير التجارة الإلكترونية]، Maqdia |
| 5 (M6lob · Jobs) | "Oraixen turned our job marketplace into a product candidates actually trust. Web and mobile, fast search, real matches — they understood the hiring problem, not just the code." — [Name], [Product Owner], M6lob | «حوّلت أوريكسن سوق التوظيف لدينا إلى منتج يثق به المرشّحون فعلاً. ويب وموبايل، بحث سريع، وتطابقات حقيقية — فهموا مشكلة التوظيف، لا الكود فحسب.» — [الاسم]، [مسؤول المنتج]، M6lob |
| Rating row *(only if defensible)* | `[CLIENT TO CONFIRM — do not show 4.9/200 until real reviews exist]` | `[للتأكيد — لا تُعرض 4.9/200 قبل وجود تقييمات حقيقية]` |

---

## 15. Legal Content (Privacy + Terms)

> ### ⚠️ Legal disclaimer — READ FIRST
> **`[REVIEW BY LEGAL COUNSEL REQUIRED]`** — The content below is **plain-language placeholder copy** drafted to a defensible structure for an international software studio (Canada HQ + Egypt/MENA delivery, serving worldwide). It is **NOT legal advice and is NOT publication-ready.** Before launch, qualified counsel must finalize both documents for **PIPEDA (Canada)**, **GDPR (EU/EEA where applicable)**, applicable **Egypt/MENA** data-protection law, and Oraixen's actual contracts. In every Stitch generation, body text renders as the summaries below marked **`[Placeholder — to be confirmed by counsel]`** — Stitch must never invent statutes, clause wording, numbers, dates, or jurisdictions.

### 15.0 Source-of-truth facts (use exactly; do not invent)

| Field | Value |
|---|---|
| Legal/brand name | Oraixen Inc. (أوريكسن) — confirm legal entity with counsel |
| HQ / controller | Toronto, Ontario, Canada (delivery team across Egypt/MENA) |
| Governing law | Province of Ontario, Canada |
| Contact (all data/legal requests) | support@oraixen.com · +1-313-482-0813 |
| Data the site collects | Contact-form fields: Name, Email, Company, Budget, Timeline, Message (+ standard server/analytics data) |
| Founding year | 2014 (confirm with client) |
| "Last updated" | `[Set on launch — e.g. 2026]` — replace the live stub's stale "October 2023" |

> **Bidi rule:** inside Arabic (RTL) text, keep email, phone, and URLs isolated LTR.

### 15.A Privacy Policy

> **Page meta** — Title EN: *Privacy Policy — Oraixen* · AR: *سياسة الخصوصية — أوريكسن*. Layout: H1 + **Last updated** + TL;DR card + numbered sections + optional sticky TOC.

> **TL;DR (tinted `#EDF3F6` card at top):** EN: *"In short: we only collect what you send us (like your contact-form details) and basic technical data. We never sell your personal data, we keep it only as long as we need it, and you can ask us to access or delete it anytime at support@oraixen.com."* · AR: *«باختصار: نجمع فقط ما ترسله إلينا (مثل بيانات نموذج التواصل) وبعض البيانات التقنية الأساسية. لا نبيع بياناتك الشخصية أبداً، ونحتفظ بها فقط بالقدر اللازم، ويمكنك طلب الاطلاع عليها أو حذفها في أي وقت عبر support@oraixen.com.»*

| # | Heading EN | Plain-English clause summary |
|---|---|---|
| 1 | Introduction & Who We Are | Oraixen ("we") is a software studio headquartered in Toronto, Ontario, Canada, with a delivery team across Egypt/MENA. This policy explains how we handle personal data collected through oraixen.com and when you contact us. We are the data controller; questions go to support@oraixen.com. |
| 2 | Information We Collect | (a) Information you give us — contact-form: name, email, company, budget range, project timeline, message, plus anything you email us. (b) Information collected automatically — IP, browser/device type, pages viewed, approximate location, via standard logs/analytics. We do not intentionally collect sensitive categories. |
| 3 | How We Use Your Information | To respond to and scope your inquiry, provide/improve our services and website, communicate about your request, maintain security, and meet legal obligations. Marketing only where permitted, opt-out anytime. We do not sell your personal data. |
| 4 | Legal Basis for Processing | Where EU/EEA/UK law applies: consent, legitimate interests, performance of a contract, or legal obligation. `[Counsel to confirm bases.]` |
| 5 | Cookies & Analytics | Essential cookies to run the site; analytics cookies to understand usage. Manage/disable in your browser; a consent banner (where required) lets you accept/reject non-essential cookies. `[List providers once confirmed.]` |
| 6 | How We Share Your Information | Shared only with vetted service providers/processors (hosting, email, analytics, form handling) under confidentiality/DPA terms, or where required by law. We do not sell or rent your data. |
| 7 | International Data Transfers | Data may be processed in Canada, Egypt/MENA, or with international providers. Where required, we apply safeguards (e.g., Standard Contractual Clauses). `[Counsel to confirm mechanism.]` |
| 8 | Data Retention | Kept only as long as needed for the purpose collected and legal/accounting requirements, then deleted or anonymized. `[Specify periods with counsel.]` |
| 9 | Data Security | Reasonable technical/organizational measures — access controls, encryption in transit, code reviews, secure SDLC. No method is 100% secure, so we cannot guarantee absolute security. *(No absolute "fully secure" promise.)* |
| 10 | Your Privacy Rights | Depending on location (GDPR, PIPEDA): access, correct, delete, restrict, object, portability, and withdraw consent. Email support@oraixen.com. You may complain to your local authority (Canada: Office of the Privacy Commissioner). |
| 11 | Children's Privacy | Not directed to children; we do not knowingly collect their data and will delete it if found. |
| 12 | Changes to This Policy | We may update; the "Last updated" date reflects the latest version; material changes highlighted. |
| 13 | Contact Us | Oraixen, support@oraixen.com (+1-313-482-0813), Toronto, Ontario, Canada. |

### 15.B Terms of Service

> **Page meta** — Title EN: *Terms of Service — Oraixen* · AR: *شروط الخدمة — أوريكسن*. Same layout.

> **TL;DR:** EN: *"In short: use our site fairly, our website content is ours, and any project we build for you is governed by the specific written agreement we sign with you — including who owns the code, what's covered, and how payment works."* · AR: *«باختصار: استخدم موقعنا بإنصاف، ومحتوى الموقع ملكٌ لنا، ويخضع أي مشروع نبنيه لك للاتفاق المكتوب الموقّع معك — بما في ذلك ملكية الكود وما يشمله المشروع وكيفية الدفع.»*

| # | Heading EN | Plain-English clause summary |
|---|---|---|
| 1 | Acceptance of These Terms | By accessing oraixen.com or using our services you agree to these Terms. They govern your use of the website; specific projects are also governed by a separate signed agreement (see §2/§3). |
| 2 | Our Services | We provide software, web, corporate-platform, and hardware+AI development. Exact scope, deliverables, timeline, and price are defined in a separate signed proposal/contract. We may update or discontinue website features anytime. |
| 3 | Intellectual Property & Ownership of Deliverables | (a) On full payment, the client owns the final custom code and deliverables with full IP transfer per the signed agreement. (b) Our pre-existing tools, frameworks, and reusable components remain ours (licensed as needed). (c) Website content (name, logo, text, designs, code) is owned by Oraixen. |
| 4 | Payment Terms | Fees, milestones, invoicing, and methods are in each signed agreement; invoices due on agreed dates; late payments may pause work. `[Confirm late-fee/currency terms with counsel.]` |
| 5 | Client Responsibilities | Provide timely information, approvals, content, and access, and ensure rights to materials supplied. Delays in client input may shift timelines. |
| 6 | Confidentiality | Each party keeps the other's confidential information private. We sign NDAs before detailed discussions and can keep client names/details confidential on request. |
| 7 | Warranties & Disclaimers | We perform services with professional skill and care and a documented QA process. Project-specific warranties (e.g., a post-launch support window) are in the signed agreement. Otherwise the website is provided "as is", without warranties, and we do not promise it will be error-free or uninterrupted. *(No "bug-free / 100% guaranteed" absolute — see 10.4.)* |
| 8 | Limitation of Liability | To the maximum extent permitted by law, not liable for indirect/incidental/consequential damages; total liability limited per the signed agreement (or, absent one, to amounts paid for the relevant service). `[Counsel to set the cap.]` |
| 9 | Third-Party Links & Services | We don't control and aren't responsible for third-party tools, links, or services referenced. |
| 10 | Termination | We may suspend/terminate website access for misuse. Engagements end per the signed agreement; surviving sections (IP, confidentiality, payment for work done) continue. |
| 11 | Governing Law & Disputes | Governed by the laws of the Province of Ontario, Canada; parties submit to its courts unless a signed agreement specifies otherwise. `[Confirm with counsel.]` |
| 12 | Changes to These Terms | We may revise; the "Last updated" date shows the current version; continued use means acceptance. |
| 13 | Contact Us | Oraixen, support@oraixen.com (+1-313-482-0813), Toronto, Ontario, Canada. |

### 15.C Bilingual legal heading quick-reference

| EN | AR | EN | AR |
|---|---|---|---|
| Privacy Policy | سياسة الخصوصية | Acceptance of These Terms | قبول هذه الشروط |
| Terms of Service | شروط الخدمة | Our Services | خدماتنا |
| Last updated | آخر تحديث | Intellectual Property & Ownership of Deliverables | الملكية الفكرية وملكية المُخرجات |
| Information We Collect | المعلومات التي نجمعها | Payment Terms | شروط الدفع |
| How We Use Your Information | كيف نستخدم معلوماتك | Client Responsibilities | مسؤوليات العميل |
| Cookies & Analytics | ملفات الارتباط والتحليلات | Confidentiality | السرّية |
| How We Share Your Information | مشاركة معلوماتك | Warranties & Disclaimers | الضمانات وإخلاء المسؤولية |
| International Data Transfers | نقل البيانات دولياً | Limitation of Liability | حدود المسؤولية |
| Data Retention | الاحتفاظ بالبيانات | Third-Party Links & Services | روابط وخدمات الأطراف الثالثة |
| Data Security | أمان البيانات | Termination | الإنهاء |
| Your Privacy Rights | حقوقك في الخصوصية | Governing Law & Disputes | القانون الحاكم وتسوية النزاعات |
| Children's Privacy | خصوصية الأطفال | Changes to These Terms | التغييرات على هذه الشروط |
| Changes to This Policy | التغييرات على هذه السياسة | Contact Us | تواصل معنا |
| Contact Us | تواصل معنا | | |

### 15.D Implementation notes
- Footer routes `Privacy Policy / سياسة الخصوصية` and `Terms of Service / شروط الخدمة` to the structured content above. Sitemap keeps both `/privacy` and `/terms`.
- **Stale-date fix:** replace the live `Privacy.tsx` "Last updated: October 2023" with the launch date.
- Legal pages must not repeat unsubstantiated marketing claims (no "98% retention", no "bug-free guarantee"). The Warranties section uses "documented QA process + post-launch support window".
- Compliance to confirm with counsel: PIPEDA (primary), GDPR (EU/EEA visitors), Egypt PDPL & MENA regimes, cookie-consent obligations.

---

## 16. SEO / Meta Copy

> Title ≤60 chars, description ≤155 chars. Bilingual (hreflang EN/AR). OG default image: "Oraixen — Premium Software, Web & AI Studio" / "أوريكسن — استوديو برمجيات وويب وذكاء اصطناعي". Alt-text rule: every project logo tile → `alt = "{Project} — {Industry} product by Oraixen"`.

| Page | EN title | EN description | AR title | AR description |
|---|---|---|---|---|
| Home | Oraixen — Premium Software, Web & AI Studio | Oraixen builds premium mobile apps, web platforms and AI-powered systems. 28+ shipped products across 15 industries. Toronto & MENA. | أوريكسن — استوديو برمجيات وويب وذكاء اصطناعي | تبني أوريكسن تطبيقات وويب وأنظمة مدعومة بالذكاء الاصطناعي. أكثر من 28 منتجاً عبر 15 قطاعاً. تورنتو والشرق الأوسط. |
| About | About Oraixen — Engineering Digital Excellence | Meet the premium software studio behind 28+ shipped products. Our story, mission, and the way we work — from Toronto to MENA. | من نحن — أوريكسن لهندسة التميّز الرقمي | تعرّف على استوديو البرمجيات المتميّز صاحب أكثر من 28 منتجاً. قصّتنا ورسالتنا وطريقتنا في العمل — من تورنتو إلى الشرق الأوسط. |
| Services | Services — Mobile, Web, Software & AI \| Oraixen | Mobile apps, web platforms, corporate software and hardware+AI — with timelines, deliverables and clear engagement models. | الخدمات — موبايل وويب وبرمجيات وذكاء اصطناعي \| أوريكسن | تطبيقات موبايل ومنصّات ويب وبرمجيات مؤسسية وأجهزة وذكاء اصطناعي — بمدد زمنية ومخرجات ونماذج تعاون واضحة. |
| Projects | Projects — 28 Products We've Shipped \| Oraixen | Explore Oraixen's portfolio: 28 web, mobile and platform builds across finance, healthcare, education and retail. | أعمالنا — 28 منتجاً أطلقناها \| أوريكسن | استعرض أعمال أوريكسن: 28 مشروعاً في الويب والموبايل والمنصّات عبر التمويل والرعاية الصحية والتعليم والتجزئة. |
| Project Detail *(template)* | {Project} — {Industry} Case Study \| Oraixen | How Oraixen built {Project}, a {Industry} product: the challenge, our solution, and the measurable impact. | {Project} — دراسة حالة في {Industry} \| أوريكسن | كيف بنت أوريكسن {Project}، منتج {Industry}: التحدّي، والحل، والأثر القابل للقياس. |
| Process | Our Process — How Oraixen Ships \| Oraixen | A 5-step methodology with weekly demos and a documented QA process. See how we deliver, every time. | آلية العمل — كيف تُطلق أوريكسن \| أوريكسن | منهجية من 5 خطوات مع عروض أسبوعية وعملية ضمان جودة موثّقة. شاهد كيف نُسلّم في كل مرة. |
| Contact | Contact Oraixen — Start Your Project | Tell us about your project. Email support@oraixen.com or send a brief — we reply within one business day. | تواصل مع أوريكسن — ابدأ مشروعك | أخبرنا عن مشروعك. راسلنا على support@oraixen.com أو أرسل موجزاً — نردّ خلال يوم عمل واحد. |

---

## 17. Don'ts

**Visual / light-mode (supersedes the old dark look):**
- ❌ No near-black default page backgrounds.
- ❌ **No glassmorphism / frosted-blur cards** (dark-theme device — invisible on white).
- ❌ **No colored box-shadow glows** on cards/buttons (muddy on white). Use shadow + border.
- ❌ No `#56C9E3` / `#8FE0F2` as text, links, icons-on-white, or active states; no text gradients ending in sky on white.
- ❌ No `#94A3B8` as live body/meta/placeholder text on white.
- ❌ No mixed icon stroke weights; no radii outside the ladder; no range-based type sizes.
- ❌ No two adjacent same-color sections; no second tinted band; no dark band except the final CTA.
- ❌ No big animated glowing orbs or heavy neon gradients.

**Arabic / bilingual:**
- ❌ No uppercase, negative tracking, italics, or forced kashida in Arabic.
- ❌ No auto-translated Arabic — use the exact strings in Section 14.
- ❌ No drifting numbers between EN and AR; no Eastern-Arabic numerals in metrics.

**Content integrity:**
- ❌ No invented testimonials, ratings, logos, client names, metrics, or counts.
- ❌ No banned stats (7+ years · 37+ projects · 98% retention · 15 countries · 4.9/200 reviews) anywhere.
- ❌ No absolute promises ("bug-free", "guaranteed", "100% secure").
- ❌ No fabricated legal clauses — Privacy/Terms body stays placeholder until counsel signs off.

---

*Prepared for: Oraixen website redesign · Target tool: Google Stitch · Languages: English (LTR) + Arabic (RTL) · Theme: Light / clean / modern with the signature teal accent. All numbers derive from `src/lib/projects.ts` (28 projects; Mobile 12 / Platform 8 / Web 8; 15 industries) and the JSON-LD founding year (2014) — keep them identical across EN and AR, and replace every `[PLACEHOLDER]` / `[CLIENT TO CONFIRM]` / `[LEGAL TO CONFIRM]` with verified content before launch.*
