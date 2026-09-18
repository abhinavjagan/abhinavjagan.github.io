# Portfolio Frontend

Static Next.js 14 application for `abhinavjagan.github.io`.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
```

`npm run build` writes the GitHub Pages artifact to `out`.

## Configuration

- `NEXT_PUBLIC_SITE_URL` defaults to `https://abhinavjagan.github.io`.
- `NEXT_PUBLIC_BASE_PATH` is optional and should be empty for the user-site deployment.
- Resume and social-preview files live in `public`.
- Portfolio content lives in `utils/constants.ts`.

No contact-form backend or analytics service is required.
