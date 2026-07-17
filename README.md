# Shaivya Shashwat — Portfolio

A pure static website. The exact site from the Design Preview — real HTML pages,
animations, images, GIFs, and videos. No build step, no server, no dependencies.

## Pages

| URL | File |
|-----|------|
| `/` | `index.html` (home) |
| `/about.html` | About |
| `/healos.html` | HealOS case study |
| `/legalclerk.html` | LegalClerk case study |
| `/openmic.html` | OpenMic case study |
| `/salesroleplay.html` | SalesRoleplay case study |
| `/arnifi-motion.html` | Arnifi Motion case study |
| `/arnifi-design-system.html` | Arnifi Design System case study |

## Deploy to Vercel

This is a static site — Vercel serves the files straight from its CDN. There is
**no server and no build**.

1. Push this folder to a GitHub repo.
2. Import it in Vercel. Framework Preset: **Other** (nothing to configure).
3. Deploy.

Opening `https://your-domain.com/` renders `index.html` immediately — no redirect.

## Preview locally

Any static file server works. The simplest, with Node installed:

```bash
npx serve .
```

…or open the folder with the VS Code "Live Server" extension. (A server is only
needed so the browser fetches sibling files over http:// rather than file://.)

## Files

- `index.html` + the seven page files — the site
- `support.js` — rendering runtime
- `ui-motion.js` — scroll reveals, hover motion, count-ups
- `dotted-surface.js` — animated hero background
- `responsive.css` — responsive layer (desktop unchanged; tablet/mobile rules)
- `assets/` — all images, GIFs, videos, resume PDF

Fonts (Google Fonts) and three.js load from public CDNs, so stay online.
