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
| `docs/` | **Created by `npm run build:gh`** (Vite build output for GitHub Pages, committed to `main`). This avoids serving the dev `index.html` that points at `/src/main.jsx` (browsers will not execute JSX as JS). |
| `dist/` | **Created by `npm run build`** (generic Vite output for local `vite preview` / ad-hoc hosting). Not required for the `docs/`-based GitHub Pages flow. |

Entry: `src/main.jsx` → `index.html`.

## GitHub Pages (user site repo like `abhinavjagan.github.io`)

1. In GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**
2. **Branch: `main` / Folder: `/docs`**
3. After changing the site, run `npm run build:gh` and commit the updated `docs/` folder to `main`.

**Why:** GitHub serves whatever HTML you commit. The dev `index.html` loads `src/main.jsx` via Vite; GitHub will serve that as `text/jsx`, which cannot run as a module, producing a white page + MIME type errors. The `docs/` output contains compiled `*.js` assets.
