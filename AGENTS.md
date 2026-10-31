<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project guide

Single-page Next.js 16 App Router app in `src/app/` (the README still points at a repo-root `app/` — wrong; the app lives in `src/`). No test suite, no CI, no backend.

## Commands

- `npm run dev` — dev server (Turbopack).
- `npm run build` — production build.
- `npm run lint` — ESLint 9 (flat config).
- Typecheck: `npx tsc --noEmit` (no script defined). No test command exists — verify with lint + typecheck + build.

## next.config.ts is aggressive

All of these are enabled and change coding conventions:

- `reactCompiler: true` — do not hand-write `useMemo`/`useCallback`/memoization; the compiler does it. Follow the Rules of React strictly.
- `cacheComponents: true` — dynamic data is uncached by default: wrap dynamic rendering in `<Suspense>` and opt into caching explicitly with the `use cache` directive (prefer setting `cacheLife` at each `use cache` scope). Wrong usage fails the build, not just lint. See `node_modules/next/dist/docs/` guides (`ai-agents.md`, `use-cache.md`, `cacheComponents.md`).
- `partialPrefetching`, `agentFeedback` — leave these flags alone unless asked.

## Styling & components

- Tailwind v4, CSS-config only: theme tokens live in `src/app/globals.css` (`@theme inline`). There is no `tailwind.config.*`; the Tailwind Turbopack loader is wired manually in `next.config.ts`, so treat that block as load-bearing.
- shadcn with `components.json` style `"base-nova"`: components in `src/components/ui/` use **Base UI** (`@base-ui/react/*`) primitives, not Radix. `cn` is imported from the `cn` npm package (in `src/lib/utils.ts`), not clsx/tailwind-merge.
- Add new UI with the shadcn CLI: `npx shadcn add <component>`. `@/*` in tsconfig maps to `./src/*` (aliases in `components.json`).

## Gotchas

- `src/components/navber.tsx` and `src/components/ui/navber.tsx` exist in parallel (misspelled "navbar") — check which one a task means.
- Windows dev environment; paths in commands should be quoted if they contain spaces.
