# Shaivya Shashwat — Portfolio

This is the **exact** site rendered in the Design Preview — the real HTML pages,
animations, images, GIFs, and videos. Nothing has been reconstructed or
simplified.

## Run locally

```bash
npm install      # installs nothing — there are zero dependencies
npm run dev      # starts a local server
```

Then open **http://localhost:3000**.

That's it. No build step, no framework, no config.

## What's inside

| File | Purpose |
|------|---------|
| `Shaivya Portfolio - Home.dc.html` | Home page (entry point) |
| `About - Shaivya Shashwat.dc.html` | About page |
| `HealOS - Case Study.dc.html` | Case study |
| `LegalClerk - Case Study.dc.html` | Case study |
| `OpenMic - Case Study.dc.html` | Case study |
| `SalesRoleplay - Case Study.dc.html` | Case study |
| `Arnifi Motion - Case Study.dc.html` | Case study |
| `Arnifi Design System - Case Study.dc.html` | Case study |
| `support.js` | Rendering runtime (loads the pages) |
| `ui-motion.js` | Scroll reveals, hover motion, count-ups |
| `dotted-surface.js` | Animated hero background |
| `assets/` | All images, GIFs, videos, and the resume PDF |
| `server.js` | Tiny zero-dependency static server |

## Internet needed for two things

The pages load fonts from Google Fonts and the 3D library (three.js) from a CDN.
Both are standard public CDNs — just keep the machine online the first time.

## Deploy

Any static host works (Vercel, Netlify, GitHub Pages, S3). For **Vercel**:

1. Push this folder to a GitHub repo.
2. Import it in Vercel as a project.
3. Framework preset: **Other**. Build command: *(leave empty)*.
   Output directory: **`.`** (the repo root).
4. Deploy. Vercel serves the files as-is.

The home page is served at `/` automatically.
