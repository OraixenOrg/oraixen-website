# Project images

Public portfolio artwork. One file per project, named after the project's
**canonical slug** — the same slug used in `src/data/projects.json` and in
`PROJECT_DISPLAY_ORDER` in `src/lib/projects.ts`.

```
slug:   du-v-du
file:   du-v-du.png
JSON:   "imageUrl": "/assets/projects/du-v-du.png"
```

Files in this directory are served verbatim from the site root by Vite, so the
JSON value is a plain absolute path. No React import, no `import.meta.glob`, no
bundler asset map and no slug-specific code is involved.

## Format

PNG for the public portfolio.

- Optimize before committing; these ship to every visitor.
- Keep transparency on logos so they sit on both the light and the dark card.
- Avoid oversized sources. The grid card renders at most 280x200 CSS px and the
  case-study hero at most 500px wide, so ~1000px on the long edge is plenty.

## imageFit

Set alongside `imageUrl` in `src/data/projects.json`:

- `"contain"` — a logo or brand mark. Padded and centred, aspect ratio kept.
- `"cover"` — a screenshot or full-bleed visual. Fills the frame and crops.

Use `contain` for a logo; it is the right default for branded project artwork.

## Missing files

A project whose PNG is absent falls back to the neutral placeholder at
`/assets/project-placeholder.svg` — it does not render a broken image. Adding
the correctly named PNG here is enough to make it appear; no code change.
