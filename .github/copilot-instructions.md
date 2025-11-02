## Quick context

- This is a Next.js 16 + React 19 project using the App Router (files under `src/app`).
- Key entry points: `src/app/layout.tsx` (root layout & providers) and `src/app/page.tsx` (home).
- Components live in `src/components/` (there is a grouped folder `src/components/(home-sections)`).
- The project uses Tailwind v4, `next-themes` for light/dark themes, and CSS custom properties in `src/app/globals.css`.

## What to know before editing

- App Router semantics matter: preserve `src/app/layout.tsx` structure when adding global providers.
- Client vs server components: files that include `"use client"` (e.g. `src/components/Header.tsx`, `src/components/Footer.tsx`) must remain client components. Move state or browser-only hooks there.
- Theme is provided by `src/utils/ThemeProvider.js` (a thin wrapper around `next-themes`) and is applied in `layout.tsx`. Styling uses CSS variables such as `--primary`, `--background`, `--header-bg`, and `--header-text` (see `src/app/globals.css`).
- TypeScript path alias: `@/*` maps to `./src/*` (see `tsconfig.json`). Use `@/` imports for project-local modules.

## Build / dev / lint commands (what to run locally)

- Start dev server: `npm run dev` (runs `next dev`).
- Build for production: `npm run build` (runs `next build`).
- Start production server (after build): `npm run start` (runs `next start`).
- Linting: `npm run lint` (runs `eslint`).

Tip: the README shows standard `create-next-app` instructions — prefer `npm`/`pnpm` consistent with local developer setup.

## Project-specific conventions and patterns

- File layout: `src/app` (app router), `src/components` (reusable UI). Some folders use parentheses in their names (ex: `(home-sections)`); treat these as ordinary directories for component grouping — don't assume they are Next route groups unless under `src/app`.
- Use `next/font` (see `layout.tsx`) for font loading; keep the font setup in the root layout.
- Keep theme and global CSS variables in `src/app/globals.css`. Use `var(--...)` variables in inline styles (the Header/Footer use them extensively).
- Client components that use browser APIs or hooks must have the `"use client"` directive at the top.

## Integration points & external dependencies

- next-themes (wrapping via `ThemeProvider` in `src/utils/ThemeProvider.js`)
- Tailwind (configured via `postcss.config.mjs` and `tailwindcss` dependency)
- Fonts optimized with `next/font` in `src/app/layout.tsx`.
- Public assets live in `public/`.

## Examples for common edits

- Add a new presentational component:
  - Create `src/components/MyWidget.tsx` (no `"use client"` unless it uses hooks/browser APIs).
  - Import via `import MyWidget from '@/components/MyWidget'`.

- Add a client component that toggles theme:
  - Create file with `"use client"` at top.
  - Use `useTheme` from `next-themes` (see `Header.tsx`) and toggle `setTheme(...)`.
  - Rely on CSS vars from `globals.css` for colors.

## What to avoid / watch-outs

- Do not remove the `ThemeProvider` wrapper in `layout.tsx` — it's required for consistent theme behavior.
- Avoid moving client logic into server components (drop `use client` if you accidentally remove it, tests/build will fail).
- ESLint is configured but run without args; add config changes carefully.

## Useful files to inspect

- `src/app/layout.tsx` — root layout, providers, font setup
- `src/app/page.tsx` — home route
- `src/app/globals.css` — CSS variables and Tailwind import
- `src/utils/ThemeProvider.js` — theme wrapper (next-themes)
- `src/components/Header.tsx` and `src/components/Footer.tsx` — examples of client components and theme usage
- `tsconfig.json` — path alias `@/*`
- `package.json` — scripts and key dependencies (Next 16, React 19)

If anything here is unclear or you want additional sections (example PR checklist, recommended code style rules, or tests guidance), tell me which bits to expand and I will iterate.
