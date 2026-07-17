# Shaivya Shashwat — Portfolio

The exact site rendered in the Design Preview — the real HTML pages, animations,
images, GIFs, and videos. Nothing is reconstructed or simplified.

## Run locally

```bash
npm install      # installs nothing — there are zero dependencies
npm run dev      # starts a local static server
```

Open **http://localhost:3000**.

`server.js` is a tiny zero-dependency Node static server used **only** for local
development. It is not used in deployment.

## Deploy to Vercel

This is a **pure static site** — it targets Vercel's static file hosting (CDN).
There is **no Node server and no serverless function** in production; Vercel just
serves the files directly. `server.js` is ignored on Vercel.

`vercel.json` pins this behaviour:

```json
{
  "framework": null,
  "buildCommand": null,
  "outputDirectory": ".",
  "cleanUrls": false,
  "rewrites": [{ "source": "/", "destination": "/index.html" }]
}
```

- `framework: null` + `buildCommand: null` → Vercel runs no build and does not
  try to boot `server.js` (that was the cause of the earlier 404s).
- `outputDirectory: "."` → the project root is published as-is.
- The rewrite maps `/` to `index.html`, which redirects to the home page.

### Steps
1. Push this folder to a GitHub repo.
2. Import it in Vercel. When asked, **Framework Preset: Other** (vercel.json
   already sets everything).
3. Deploy. No build step runs; every page, asset, GIF, and MP4 is served from
   the CDN.

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Entry — redirects to the home page |
| `Shaivya Portfolio - Home.dc.html` | Home |
| `About - Shaivya Shashwat.dc.html` | About |
| `HealOS / LegalClerk / OpenMic / SalesRoleplay / Arnifi … .dc.html` | Case studies |
| `support.js` | Rendering runtime |
| `ui-motion.js` | Scroll reveals, hover motion, count-ups |
| `dotted-surface.js` | Animated hero background |
| `responsive.css` | Responsive layer (desktop unchanged; mobile/tablet rules) |
| `assets/` | All images, GIFs, videos, resume PDF |
| `server.js` | Local dev server only (not used on Vercel) |

Fonts (Google Fonts) and the 3D library (three.js) load from public CDNs, so keep
the machine online.
