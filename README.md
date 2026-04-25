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
| `dist/` | **Created by `npm run build`** (Vite output: `index.html` + hashed JS/CSS). Gitignored; GitHub Pages deploy uploads this folder. Safe to delete locally—rebuild recreates it. |

Entry: `src/main.jsx` → `index.html`.
