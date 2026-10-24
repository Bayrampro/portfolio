# Bayram Annagurbanov — Portfolio

Personal portfolio built with Next.js, React, TypeScript, Three.js, and React Three Fiber. Includes Russian and English content, interactive 3D scenes, project details, and CV downloads.

Live site: [byprogger-portfolio.vercel.app](https://byprogger-portfolio.vercel.app/).

## Local development

Run commands from the repository root:

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks and production build

```sh
npm run lint
npx tsc --noEmit
node --test tests/*.test.cjs
npm run build
npm start
```

## Deploy to Vercel

Import this repository and use:

- Root Directory: `./` (repository root)
- Framework Preset: Next.js
- Build Command: `npm run build` (default)
- Output Directory: framework default
- Install Command: automatically detected from `package-lock.json`

The app does not currently require environment variables. Files in `public/`, including models, project images, domain verification, and CV PDFs, are served with the site.

The Dockerfile remains available for Node.js container deployments; Vercel uses the Next.js project directly.

## Project layout

- `app/`: page, root layout, and global styles
- `components/`: interface and 3D components
- `lib/`: translations, project experience, skills, and shared logic
- `public/`: deployable assets; final CVs are in `public/resumes/`
- `tests/`: active-section behavior tests
- `examples/avatar/`: avatar verification scripts
- `licenses/` and `LICENSE`: third-party notices and original project license

Local avatar authoring files in `avatar-work/` are preserved and excluded from Git and Docker builds.
