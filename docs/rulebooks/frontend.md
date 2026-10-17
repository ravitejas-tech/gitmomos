# Frontend Rules

React 19 + React Router 7 (SPA mode) + TypeScript + Tailwind 4 + TanStack Query. Applies to `app/`.

## Reusability

Repeated code is a defect, not a style preference.

- **Search before writing.** Grep existing hooks/components/services for what you need. A second implementation of something that exists is the most expensive mistake here.
- **Second occurrence = extract.** Write it inline once. The second time, extract to a shared component/hook/constant and update the first caller. Never a third copy.
- **Extend, don't clone.** Needing a variant means adding a prop, not copying the file.
- **Repeated JSX is data.** Blocks differing only in text/icon/link move to an array in `app/data/` and `.map()` over one component.
- **Repeated stateful logic → hook** in `app/hooks/`.
- **Repeated pure logic → util.** One function, one place.
- **Constants declared once.** Any string, URL, key, or option list used twice gets imported, not retyped.
- **Types are composed.** Use `Pick`, `Omit`, `Partial`, `z.infer` and the generated `Tables<>` — never hand-write a second interface with the same fields.
- **Repeated Tailwind strings** mean a missing UI primitive or variant. See below.
- **Delete what you replaced.** An extraction leaving old copies behind made things worse.

**Exception:** two things that merely look alike but answer different requirements are not duplication. Reuse identical *functionality*, not coincidental resemblance.

### Matching classes are one component (non-negotiable)

**When two or more elements carry the same classes — or most of the same classes — they are one component, and both must use it.** Not the third time; the second. A near match counts: a class string that differs by a margin, a weight or one colour is the same thing drawn twice, and the difference becomes a prop or a variant.

Before writing a `className` with more than a couple of visual classes, search for it. The usual finding is that the component already exists and was bypassed.

- **What counts is visual identity:** surface (background, border, radius, padding, shadow), typography (family, size, weight, colour, tracking, case) and shape. A match on those is a component.
- **Layout glue alone does not.** `flex items-center justify-between gap-4` or a `grid-cols-*` on its own is how Tailwind is written, not a hidden component.
- **Text is a component, never a class string.** Every piece of text — `p`, `span`, `h1`–`h4`, `li`, `label` — renders through `Text` (`~/components/ui/text`) with a named `variant` and, when needed, a `tone`. Size, weight, family, colour, tracking and case live in the variant; `className` carries only layout (margin, width, visibility, alignment).
- **A variant missing is a variant added,** to `Text` or the primitive, not a class string at the call site.
- **A shared component may take `className` for placement** (margin, grid span), never to restyle what makes it that component. A new look is a variant.

**Check it with a scan, not by eye.** Before handing over UI work, compare class strings — identical strings and any two sharing three-quarters of their classes, including two in the same file — and compare JSX *structure*: the same tree of elements and classes appearing twice (a Cancel + Save footer, a label + input + hint) is one component even when no single class string repeats.

### One pattern, one look (non-negotiable)

**A pattern the app already has is built the way the app already builds it.** Before adding a page header, an empty state, an alert or a form, open two existing pages that have one and match them.

- **Every dashboard page starts with `PageHeader`** (title, optional description, optional actions on the right).
- **A page header's primary action is the rightmost button.** Secondary actions come first.
- **Empty lists render `EmptyState`**, loading renders `LoadingState`, failed queries render `ErrorState` with a retry.

## Imports

**Import the names you use, never the namespace.** `import { useState, useCallback } from 'react'`, not `import * as React from 'react'`. Types come through the same import with the `type` keyword: `import { useState, type ReactNode } from 'react'`.

**Always the `~/*` alias, never a relative path** (`~/components/ui/button`, not `../../components/ui/button`). ESLint enforces both.

## Files and components

- **One component per file**, named after the file (`report-card.tsx` exports `ReportCard`). Two components in a file fails review at any size.
- **150-line cap.** Past that, split into focused components — one file = one visual/behavioural responsibility.
- **Extract when it is a component**, not in anticipation. A panel, list item, control, or form is its own file from the moment it exists.
- **Feature components** in `components/<feature>/`. Shared primitives in `components/ui/`. The moment a feature component is used by a second feature, it moves to `ui/` — it does not get copied.
- **Split a feature folder past eight files** into subfolders by the page area the component serves, and drop the prefix the folder already states (`reports/detail/section.tsx`, not `reports/detail/report-detail-section.tsx`). The exported component name keeps its full name.

## Routes

`app/routes` mirrors the URL. A reader who knows the URL must be able to name the file, and a reader who sees the file must be able to name the URL.

- **A folder only exists to hold more than one thing.** A route with a single file is that file.
- **`$` marks a dynamic segment** and **a dot is the URL's slash**, as in React Router's file conventions.
- **Layouts are `layout.tsx`, section landings are `index.tsx`,** at the folder they apply to. `route.tsx` names nothing — never use it.

| URL | File |
|---|---|
| `/` | `routes/index.tsx` |
| public pages (navbar + footer) | `routes/layout.tsx` |
| `/login` | `routes/login.tsx` |
| `/legal` (layout) | `routes/legal/layout.tsx` |
| `/legal/privacy` | `routes/legal/privacy.tsx` |
| `/releases` | `routes/releases/index.tsx` |
| `/releases/:version` | `routes/releases/$version.tsx` |
| `/dashboard` (layout) | `routes/dashboard/layout.tsx` |
| `/dashboard` | `routes/dashboard/index.tsx` |
| `/dashboard/connections/github` | `routes/dashboard/connections.github.tsx` |
| `/sitemap.xml` | `routes/sitemap[.]xml.ts` (`[.]` is a literal dot) |

**Routes are assembled explicitly in `app/routes.ts`.** A file's name has no effect on the URL it serves, so the convention is a discipline: rename the file and its `routes.ts` entry together. A file under `app/routes` that no `routes.ts` entry points at is dead code.

**Route files hold composition, not implementation.** A route wires params, data and state to components; the markup lives in `components/<feature>/`.

**Prerendered routes** (`/`, `/roadmap`, `/legal/*`, `/robots.txt` and `/sitemap.xml`, listed in `react-router.config.ts`) render at build time in Node. Nothing they import may touch `window`, `document` or `localStorage` outside an effect or event handler.

**Every public page's `meta` is `pageMeta(PAGE_SEO.<page>)`** (`~/lib/seo/page-meta`, `~/data/seo/pages`), which emits the title, description, canonical link, Open Graph and Twitter tags together. Never hand-write a title or description in a route. Keep `~/data/seo/` free of component imports: `root.tsx` and every public route load it.

## UI primitives

`app/components/ui/` holds hand-written primitives (`Button`, `Card`, `Text`, `Input`, `FormField`, `Alert`, `PageHeader`, `EmptyState`, …). Variants are declared with `cva` or a variant map inside the primitive.

- **Never restyle a primitive at the call site.** A new look is a new `variant`, added to the primitive.
- **Add on demand.** Write a primitive when a second screen needs it, not in anticipation.
- **Theme tokens only.** Primitives read the `@theme` tokens in `app/global.css` — never a stock Tailwind palette class (`bg-gray-900`, `text-red-400`, `bg-white/5`) and never a hex value.
- **Prefer an existing library or pattern** over new code. Reuse is the default; from-scratch is the exception that needs a reason.

## Theme

gitmomos is used by developers but its reports are read by people who are not: managers, clients, colleagues in other roles. The dashboard gives the developer analytics; the report reads like a document anyone can follow.

- **Type:** Plus Jakarta Sans for everything, Geist Mono only for commit SHAs. UI text is 14px (`text-sm`), report prose 16px (`text-base`).
- **Colour:** cool neutrals, one violet accent for primary actions, selection and focus, and one colour per kind of work (`kind-*` tokens) for charts and dots.
- **Surfaces:** a `bg-bg` page with white (`bg-surface`) cards; dark mode swaps the same tokens.

Decoration is limited to three utilities in `global.css`, used on marketing and auth surfaces only: `text-heading-gradient` (via `<Text tone='gradient'>` on large headings), `bg-hero-glow` and `bg-grid-lines`. Nothing else may add a gradient, glow or blur.

### Dashboard layout

- The shell is `routes/dashboard/layout.tsx`: a sticky `Sidebar` on `bg-panel` and the page on `bg-bg`. Both are hidden when printing.
- **Every dashboard page renders `DashboardPage`** (`~/components/layout/dashboard-page`): a page title, optional description and right-aligned actions. Pages fill the width beside the sidebar and are left-aligned; only forms (`width='narrow'`, Settings) are capped. Use the extra room on wide screens for content (more grid columns, a side panel), never for empty margins or stretched reading text: report prose stays within `max-w-3xl`.
- Content sits in `Card`s. A card with a title uses `CardHeader` and `CardContent`; a list inside a card uses `divide-y divide-border` rows.
- **Charts** use Recharts. Colours, axis ticks, grid and cursor come from `~/data/activity/chart` and `WORK_KINDS` (`~/data/activity/kinds`), which point at CSS variables, so charts follow the theme. Tooltips render `ChartTooltip`.

### Reports are for non-technical readers

- `ReportDocument` is what gets shared: headline, summary, focus areas, type of work, highlights, projects and next steps. Keep jargon out of it: no SHAs, no conventional-commit prefixes, "commits" only in the meta line.
- Developer detail (the commit log) lives in the collapsed `ReportTechnicalDetails` and is hidden when printing.
- Commit messages shown anywhere in the app go through `commitTitle` (`~/lib/commits/message`), which drops the `feat(scope):` prefix.
- "PDF" is the browser's print dialog, opened with `printInLightTheme` so a dark-mode user still prints dark text on white. Anything that should not be on paper gets `print:hidden`.

The palette is defined once in `app/global.css`: raw values on `:root` (light) and `:root[data-theme='dark']`, exposed to Tailwind through `@theme inline`. Tailwind 4 is CSS-first: there is no `tailwind.config.js`.

| Token | Use |
|---|---|
| `bg-bg`, `bg-panel`, `bg-surface`, `bg-surface-muted`, `bg-field` | App chrome, the inset page panel, raised elements, hover/selected fills, inputs |
| `border-border`, `border-border-strong` | Dividers and card borders; input and control borders |
| `text-text-primary` / `text-text-secondary` / `text-text-muted` | Text hierarchy |
| `bg-accent`, `hover:bg-accent-hover`, `text-accent-foreground` | Primary action fill and its text |
| `text-accent-text`, `bg-accent-subtle` | Accent text (links, selected) and tinted backgrounds |
| `danger`, `success`, `warning` + `-subtle` | Status text and their tinted backgrounds |
| `bg-shade/50` | Modal scrim |
| `shadow-card`, `shadow-overlay`, `shadow-edge` | Raised elements (with a top-edge highlight in dark), menus/dialogs/toasts, the 1px inner highlight on filled buttons |
| `bg-kind-feature`, `bg-kind-fix`, … | One colour per kind of work (`work_kind` enum), for dots, legends and chart series |
| `var(--accent)`, `var(--kind-*)`, … | Raw values for inline styles and Recharts (`app/data/activity/chart.ts`, `app/data/activity/kinds.ts`) |

Never hardcode a hex value or reach for a stock Tailwind palette class. If a shade is missing, add it to both theme blocks in `global.css`.

**Never an arbitrary size.** No `text-[11px]`. The scale is Tailwind's (`text-xs` 12px, `text-sm` 14 for UI, `text-base` 16 for prose, `text-lg` and up for headings) plus three custom steps: `text-2xs` 11, `text-caption` 13 for secondary lines, `text-md` 15 and `text-code` 12. Custom steps must also be registered with `tailwind-merge` in `lib/utils.ts`, or `cn()` silently drops them as colour conflicts.

**An unknown colour class fails silently.** Tailwind leaves it unstyled and borders fall back to `currentColor`, which draws a harsh text-coloured line. After renaming or removing a token, grep for every use of the old name.

### Light and dark

- **Both themes come from the same tokens.** `data-theme='light' | 'dark'` on `<html>` swaps the raw values; components never branch on the theme and the `dark:` variant is never used.
- **The preference** (`system`, `light`, `dark`) lives in `localStorage` under `gitmomos-theme` and is read through `useTheme` (`~/hooks/use-theme`). `THEME_INIT_SCRIPT` in `root.tsx` applies it before first paint, so prerendered pages never flash the wrong theme.
- **Check every UI change in both themes** — screenshot light and dark before handing it over.

## Where non-component files go

| Kind | Location | Import as |
|---|---|---|
| Hooks (queries, mutations, stateful logic) | `app/hooks/<feature>/` | `~/hooks/...` |
| Constants, static data, copy tables | `app/data/<feature>/` | `~/data/...` |
| Pure helpers | `app/lib/` | `~/lib/...` |
| Types | `app/types/` | `~/types/...` |
| Supabase client and data access | `app/services/` | `~/services/...` |
| Zod schemas | `app/schemas/` | `~/schemas/...` |

Never inline these in component files. `hooks/`, `data/` and `lib/` mirror `components/<feature>/`; a file is placed by **the feature it is about, not the feature that imports it**. Only code that belongs to no feature stays at the root (`lib/format.ts`, `data/navigation.ts`).

Query and mutation hooks are created with `react-query-kit` in `hooks/<feature>/queries.ts` and `hooks/<feature>/mutations.ts`.

## Data access

**Supabase is reached only through `app/services/`.** Components and hooks never call `supabase.from(...)` or `functions.invoke` directly.

- The client is typed with the generated `Database` (`~/types/database`). Row types come from the select string or from `Tables<'name'>` — never a hand-written interface mirroring a table.
- Postgres enums (`Enums<'provider_name'>`) are the one definition of an option set; never retype their values as a string union.
- Edge function responses are typed once in `app/types/` and returned from the service that invokes the function.
- The browser may only write the columns the migration grants it. A new writable column is a migration, not a frontend change.

## Mutations

**Use `mutate`, never `mutateAsync`.** `mutateAsync` returns a rejecting promise, which forces a `try/catch` at every call site.

- **No `try/catch` in components.**
- **Handle outcomes in the hook.** `onSuccess` / `onError` on the `createMutation` options is the default home for toasts and cache invalidation. Per-call callbacks (`mutate(vars, { onSuccess })`) are for call-site-specific outcomes such as closing a dialog.
- **Always toast on mutation success and error** (`react-hot-toast`).
- **Never mirror mutation state into `useState`.** Render from `isPending` and `error`, and call `reset()` when the user backs out.
- **The only exception is a genuine sequence** — a second request that needs the first one's response. Even then, chain in `onSuccess`.

## Application rules

- **State:** local state or URL params first. There is no global store.
- **Server state:** `@tanstack/react-query` via `react-query-kit`.
- **Forms:** `react-hook-form` + Zod (`@hookform/resolvers/zod`), schemas in `app/schemas/`. No per-field `useState`.
- **A one- or two-line handler belongs in the JSX.** Name it only when it grows past a couple of statements, is used twice, or needs `useCallback`.
- **Performance:** do not create new objects or functions inline in JSX when the prop feeds a memoized child, a dependency array, or a list row. A trivial inline arrow on a DOM element is fine.
- **Styling:** Tailwind only, theme tokens only.

## UI copy never explains the system

Inside the dashboard, copy tells the user what they are looking at and what they can do. It never says where data comes from, how it is calculated, or what happens behind the screen: subtitles, empty states, helper text and dialog bodies.

| Never | Instead |
|---|---|
| "Every night gitmomos collects your commits and writes the day's report." | no subtitle |
| "Edited reports are never overwritten by the nightly sync." | nothing |
| "The token is stored encrypted." | nothing |

- **When a slot has nothing user-facing to say, drop it.**
- The exception is a setting's helper text saying what that setting controls ("Your daily report is written just after midnight in this timezone"). The user is configuring the behaviour, so describing it is the point.
- The landing page and legal pages exist to explain the product; this rule does not apply to them.

## Library CSS loads globally

**A library stylesheet is `@import`ed in `app/global.css`, never imported from a module.** In the production build a CSS import inside a route's module graph becomes that route's stylesheet, and React Router removes it when the route stops matching. Check a styling fix like this with `yarn build && yarn preview`, not `yarn dev`.

## Dates

- A report's `date` is a calendar day (`YYYY-MM-DD`) in the user's profile timezone. Format it with `formatDay` from `~/lib/format`; never `new Date('YYYY-MM-DD')`, which parses as UTC midnight and shows the previous day west of Greenwich.
- Instants (`committed_at`, `last_synced_at`) are shown relative with `timeAgo` or formatted with `Intl` in the browser's zone.
