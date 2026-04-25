# portfolio

Spider-Verse inspired portfolio (Vite + React + Three.js).

## Layout

| Path | Role |
|------|------|
| `src/app/` | Root React app (`App.jsx`) and mode routing. |
| `src/modes/` | One folder per experience: `home/` (picker), `story/`, `crisp/`, `cv/`. |
| `src/lib/pretext/` | Text layout engine used by the story flow and CV pretext blocks. |
| `src/shared/` | Cross-mode utilities (e.g. `palette.js`). |
| `src/styles/` | Global stylesheet (`global.css`). |
| `public/` | Static tree: `public/assets/fonts/` (all webfonts), `public/assets/media/` (raster images + Miles GLB), `public/assets/docs/` (resume PDF). |
| `dist/` | **Created by `npm run build`** (Vite output: `index.html` + hashed JS/CSS). Gitignored; CI deploys upload this folder (e.g. Cloudflare Pages). Safe to delete locally—rebuild recreates it. |

Entry: `src/main.jsx` → `index.html`.

## Deploy (Cloudflare Pages)

This repo includes:

- `wrangler.toml` with `pages_build_output_dir = "dist"`
- `.github/workflows/cloudflare-pages.yml` which runs `npm ci`, `npm run build`, then `wrangler pages deploy`

Configure these GitHub Actions **repository secrets**:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PAGES_PROJECT_NAME` (must match the Pages project name; defaults to `abhinavjagan-github-io` in `wrangler.toml`)

Cloudflare docs: [Pages Wrangler configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/).
