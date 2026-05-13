# eKosha Website — Claude Code Context

## Project Overview
Static marketing website for **eKosha**, a Flutter app (Android + Web) that is a private
encrypted vault for Indian families to store and share financial assets. The site is deployed
at https://ekosha.co.in and all CTAs point to the live app at https://app.ekosha.co.in.

## Tech Stack
- **Framework**: Astro 4.16.0 (static output, no JS framework)
- **Styling**: Tailwind CSS 3.4.14 via @astrojs/tailwind 5.1.3
- **Font**: Inter (400/500/600/700) from Google Fonts
- **Deployment**: Netlify (NODE_VERSION=20, publish: dist)

## Commands
```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to dist/
npm run preview  # Preview built site locally
```

## Brand Colors
All colors are available via the `brand.*` Tailwind namespace:

| Token       | Value   | Usage                          |
|-------------|---------|--------------------------------|
| brand.navy  | #0D3B66 | Primary, backgrounds, headings |
| brand.teal  | #00A896 | Accent, CTAs, highlights       |
| brand.bg    | #F3F7FB | Light section backgrounds      |
| brand.text  | #102A43 | Body text                      |
| brand.muted | #627D98 | Secondary text, icons          |

Use: `text-brand-navy`, `bg-brand-teal`, `border-brand-muted`, etc.

## File Structure
```
src/
  components/
    Nav.astro          # Sticky top nav
    Hero.astro         # Full-width hero with card mockup
    Problem.astro      # 3-card problem statement
    Features.astro     # 6-card feature grid (id="features")
    HowItWorks.astro   # 3-step process (id="how-it-works")
    Security.astro     # 2-col security section (id="security")
    Pricing.astro      # 2-card pricing (id="pricing")
    FAQ.astro          # Native details/summary accordion (id="faq")
    Footer.astro       # CTA band + bottom bar
  layouts/
    Layout.astro       # HTML shell with OG meta, Inter font
  pages/
    index.astro        # Imports all components in order
    privacy.astro      # Privacy policy stub (4 sections)
    terms.astro        # Terms of service stub (4 sections)
  env.d.ts             # /// <reference types="astro/client" />
public/
  favicon.svg          # Navy square, teal shield, white checkmark
```

## Component Patterns

### Section background alternation
- Hero: `bg-brand-navy`
- Problem: `bg-brand-bg`
- Features: `bg-white`
- HowItWorks: `bg-brand-bg`
- Security: `bg-white`
- Pricing: `bg-brand-bg`
- FAQ: `bg-white`

### Section IDs for nav scroll links
`#features`, `#how-it-works`, `#security`, `#pricing`, `#faq`

### CTA target
All buttons and "Get Started" / "Log In" links use: `https://app.ekosha.co.in`
Define as a local constant `const APP_URL = 'https://app.ekosha.co.in'` in each component.

### No client-side JavaScript
- FAQ accordion uses native `<details class="group">` / `<summary>` only
- Nav has no mobile hamburger JS — mobile shows only logo + CTA button
- `group-open:rotate-180` Tailwind variant handles chevron animation in FAQ

### TypeScript
- Strict mode via `astro/tsconfigs/strict`
- Component props typed via `interface Props` inside `---` frontmatter
- No `any` types

## Key Constraints
- Static output only — no SSR, no API routes
- No JS framework (no React/Vue/Svelte)
- All images/icons are inline SVG or emoji — no external image dependencies
- Mobile responsive: all components use `sm:` / `md:` / `lg:` breakpoints
- Run `npm run build` before committing — zero TypeScript errors required
