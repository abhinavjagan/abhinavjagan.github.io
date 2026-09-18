# Abhinav Jagan Polimera Portfolio

Source for [abhinavjagan.github.io](https://abhinavjagan.github.io), an evidence-first portfolio for AI applications, AI infrastructure, and distributed systems work.

The site emphasizes inspectable proof:

- A public local-first multi-agent application with architecture, tests, and security boundaries
- Completed professional work spanning AI developer infrastructure, constrained inference, router systems, and telemetry
- Two published AI and computer-vision research projects with DOI links
- A concise account of the networking and distributed-systems foundation behind the AI-infrastructure direction

## Local Development

Requirements: Node.js 20 and npm.

```bash
cd portfolio-website/frontend
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
cd portfolio-website/frontend
npm ci
npm run lint
npm run build
```

The Next.js static export is written to `portfolio-website/frontend/out`. The root GitHub Actions workflow builds and deploys that directory to GitHub Pages when changes reach `main`.

## Content and Evidence Policy

Portfolio content lives in `portfolio-website/frontend/utils/constants.ts`. The candidate has approved the supplied professional details, customer names, and metrics for public use. Keep every claim source-grounded and interview-defensible; never add confidential code, credentials, or unreleased material, and document the source, calculation, and ownership for quantified results.

## Main Paths

```text
.github/workflows/nextjs.yml              GitHub Pages build and deployment
portfolio-website/frontend/app            Routes and page metadata
portfolio-website/frontend/components     Reusable interface components
portfolio-website/frontend/public         Resume and social-preview assets
portfolio-website/frontend/styles         Global visual system
portfolio-website/frontend/utils          Content, SEO, and skill catalog
```

## Technology

Next.js 14, React 18, TypeScript, Tailwind CSS, and a static GitHub Pages export.
