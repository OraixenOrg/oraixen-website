# Partner logos

Brand marks for the partners listed in the home-page **Partnerships** section.

These are PARTNERSHIPS, not portfolio projects. This directory is deliberately
separate from `public/assets/projects/`, which holds case-study artwork and is
driven by `src/data/projects.json`. A company may legitimately appear in both
places: Maat is a published project *and* an Oraixen partner.

One file per partner, named after the partner's `id` in
`src/data/partnerships.ts`.

```
id:    maat-vip
file:  maat-vip.png
data:  logo: '/assets/partners/maat-vip.png'
```

Files here are served verbatim from the site root by Vite, so the value in
`partnerships.ts` is a plain absolute path. No React import, no
`import.meta.glob`, no bundler asset map.

## Expected files

| Partner          | File                   | Public path                             | Status  |
| ---------------- | ---------------------- | --------------------------------------- | ------- |
| Maat VIP         | `maat-vip.png`         | `/assets/partners/maat-vip.png`         | present |
| Unamed Solutions | `unamed-solutions.png` | `/assets/partners/unamed-solutions.png` | present |
| Inovara          | `inovara.png`          | `/assets/partners/inovara.png`          | present |

`maat-vip.png` is a copy of the already-approved local Maat brand asset at
`public/assets/projects/maat.png`, so the partner section does not reach into
the project asset directory for it.

Logos are supplied by the owner. They are deliberately NOT generated, invented
or downloaded from a partner's website.

## Format

PNG at **851x315** (aspect 2.702).

The card renders the file edge to edge with `object-cover` on a plate of that
exact aspect ratio, so an 851x315 asset fills the plate with nothing cropped,
and whatever background the file carries becomes that card's plate. All three
current assets are opaque and their backgrounds disagree - Maat and Inovara sit
on near-white, Unamed Solutions is white-on-black - which is precisely why the
file, not a theme token, supplies the backdrop.

An asset of some other ratio still works: it is cropped symmetrically from the
centre. Keep the mark clear of the edges. Optimize before committing; these ship
to every visitor.

## Missing files

A partner whose file is absent falls back to the neutral, unbranded placeholder
at `/assets/project-placeholder.svg`. It does not render a broken image, and the
fallback carries no mark of its own, so it can never be mistaken for the
partner's real logo. Dropping the correctly named PNG in here is enough to make
it appear; no code change is needed.
