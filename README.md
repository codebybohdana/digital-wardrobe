# Digital Wardrobe

A mobile-first personal wardrobe app. It solves a simple problem: clothes people own are scattered across memory, photo albums and physical closets, with no single place to browse them, put outfits together, or remember when a recent purchase needs to be returned. Digital Wardrobe gives a user one place to catalog their clothing, build outfits from it, and optionally track return deadlines for recent purchases.

This is a take-home assignment for an AI Product Builder / Developer position.

## Product concept

- **Wardrobe management is the main product.** Adding, browsing, searching and organizing clothing items is the core loop everything else is built around.
- **Return tracking is a secondary, optional feature.** Most wardrobe items have no purchase date or return deadline at all — it only applies to the few recent purchases a user is still deciding on.
- **Outfits are saved combinations of wardrobe items.** An outfit is just a named list of references to existing items, not a separate catalog.
- **Local-first MVP.** No backend, no authentication, no account system. All data lives in the browser via IndexedDB.

## Main features

- Add / edit / delete wardrobe items
- Optional photo upload per item (stored locally as a `Blob`)
- Categories, search and filters (brand, color, season)
- Item details view
- Outfits: create, edit, delete, browse saved looks
- Optional return tracking: deadline countdown, Keep / Returned decisions, return history
- Bundled demo data so the app is populated on first launch
- Mobile-first, responsive UI

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Dexie
- IndexedDB
- React Router

## Architecture

- **`ClothingItem`** and **`Outfit`** are the two domain entities. An `Outfit` stores `itemIds`, an array of references into the items table — no data is duplicated.
- **Returns is a derived view, not a separate entity.** Any item with a `returnDeadline` participates in return tracking; the Returns screen simply filters and sorts the existing items table. There is no dedicated returns table.
- **Persistence** is local, via Dexie on top of IndexedDB (`db/db.ts`, with a thin CRUD layer per entity in `db/items.ts` and `db/outfits.ts`). Components read data reactively through `dexie-react-hooks`' `useLiveQuery`, so writes anywhere in the app automatically refresh every screen that depends on that data.
- **No Redux/Zustand.** Dexie's live queries already give the app reactive, shared state; a separate state-management library would duplicate that for no benefit at this scale.
- **Filtering happens in memory.** Search, category and filter logic run as plain array operations over the already-loaded item list rather than as indexed Dexie queries — appropriate for a personal wardrobe (tens to low hundreds of items), and simpler to read and reason about than query-level filtering would be.

## AI-assisted development

This project was built with [Claude Code](https://claude.com/claude-code) as a development assistant, used deliberately and reviewed throughout rather than as a one-shot generator:

- Planning and architecture were discussed and agreed on before implementation began.
- The app was built **iteratively**, one scoped step at a time (data layer → wardrobe CRUD → search/filters → returns → outfits → demo data → visual design → QA), with each step reviewed and manually tested before moving to the next.
- AI-proposed code was reviewed at each step, not accepted blindly — several rounds of feedback (data model corrections, UX simplifications, visual direction changes) were incorporated back into the implementation.
- TypeScript checks, linting, and a production build were run after every major step to catch regressions early.
- A final, dedicated QA pass reviewed the whole app for runtime issues, edge cases, mobile layout, accessibility basics, and dead code before this README was written.

## Google Play / WebView considerations

This app is a functional mobile-first web app. It is technically possible to load it inside an Android WebView shell and distribute that shell through Google Play, but a few things are worth being explicit about if that's ever pursued:

- The app has real interactive functionality — data entry, local storage, browsing, filtering — it is not a static page or a thin wrapper around external content.
- A WebView wrapper should not be used to misrepresent what the app actually is or does. Google Play's policies restrict low-quality, template-generated, or repetitive WebView wrappers, and prohibit deceptive behavior.
- If this were ever published as an Android app, the store listing's privacy and data-safety disclosures would need to accurately reflect what the actual Android wrapper does (e.g., any permissions it requests, any data it collects beyond what this web app does locally) — not just what this repository's web code does.
- This repository does not include an Android/WebView wrapper. Building and submitting one, and confirming it meets current Google Play policy, is out of scope here.

Meeting these considerations does not guarantee Google Play approval — that depends on the actual wrapper implementation and Google's review at submission time.

## Demo content

The app seeds itself with demo wardrobe data (a dozen or so clothing items across categories, a few saved outfits, and 2–3 recent purchases with return tracking) the first time it runs against an empty database, so a reviewer can explore a populated app immediately without manual data entry. Seeding only ever runs once against an empty database — it never duplicates itself and never overwrites real user data.

In a production version of this product, demo content would not ship in the same build as user data — it would be removed entirely, or gated behind an explicit "load sample data" action, rather than auto-seeding.

## Running locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Limitations / MVP scope

- No backend
- No authentication
- No cloud sync — data lives only in the current browser's IndexedDB
- No notifications or reminders
- No AI recommendations or automatic styling
- No native Android wrapper included in this repository

## Project status

Take-home assignment / MVP.
