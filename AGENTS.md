# eKosha Website — Codex Agent Context

## Project
Static marketing website for eKosha (https://ekosha.co.in).
eKosha is a Flutter app (Android + Web) — a private encrypted vault for Indian families.
All CTAs link to: https://app.ekosha.co.in

## Stack
- Astro 4.16.0
- @astrojs/tailwind 5.1.3, Tailwind CSS 3.4.14
- TypeScript (strict via astro/tsconfigs/strict), no client-side JS framework
- Output: static (no SSR, no API routes)
- Node 20, deployed via Netlify

## Dev Commands
```bash
npm run dev      # dev server at localhost:4321
npm run build    # build to dist/
npm run preview  # preview build
```

## Brand Colors — Tailwind `brand.*` namespace
| Token       | Hex     |
|-------------|---------|
| brand.navy  | #0D3B66 |
| brand.teal  | #00A896 |
| brand.bg    | #F3F7FB |
| brand.text  | #102A43 |
| brand.muted | #627D98 |

Never hardcode hex values in Tailwind classes. Always use `text-brand-navy`, `bg-brand-teal`, etc.

## Source Files
```
src/env.d.ts
src/layouts/Layout.astro
src/pages/index.astro, privacy.astro, terms.astro
src/components/Nav.astro, Hero.astro, Problem.astro, Features.astro,
               HowItWorks.astro, Security.astro, Pricing.astro, FAQ.astro, Footer.astro
public/favicon.svg
```

## Rules for Agents

1. **No client-side JavaScript.** All interactivity must use HTML/CSS only. The FAQ uses native `<details>`/`<summary>`. No JS event listeners, no `<script>` tags.

2. **Always use brand.* Tailwind color tokens.** Never hardcode hex values in class names.

3. **All app links must use `href="https://app.ekosha.co.in"`.** Define as local const `APP_URL` in each component that needs it.

4. **Mobile responsive.** Use `sm:` / `md:` / `lg:` breakpoints. Test at 375px, 768px, 1280px viewport widths.

5. **Strict TypeScript.** Define `interface Props` inside `---` frontmatter for every component that accepts props. No `any` types.

6. **FAQ must use `<details>`/`<summary>`.** No accordion JS libraries. The `<details>` element must have `class="group"` for the `group-open:rotate-180` Tailwind chevron animation to work.

7. **Section IDs must match nav hrefs exactly:** `#features`, `#how-it-works`, `#security`, `#pricing`. The `/#faq` ID exists on the page but is not in the nav.

8. **Run `npm run build` before any commit.** Zero TypeScript errors and zero Astro build errors required.

9. **No new external dependencies** without explicit approval. All icons are inline SVG or emoji. No image files except favicon.svg.

10. **index.astro is a thin orchestrator.** It only imports and renders components. No markup in index.astro beyond the Layout/Nav/main/Footer structure.

## Architecture Notes
- Layout.astro provides the HTML shell, OG meta, canonical URL, and Google Fonts loading
- Each section component is self-contained with no shared state
- `new Date().getFullYear()` in Footer.astro runs at build time (SSG) — intentional
- Inter font is loaded via Google Fonts with `rel="preconnect"` hints for performance
- The SVG `<pattern id="grid">` in Hero.astro has a page-scoped ID — safe because Hero renders once
