# eKosha Website

Static marketing site for [eKosha](https://ekosha.co.in) — a private encrypted vault
for Indian families to store and share financial assets across generations.

Built with **Astro 4.16** + **Tailwind CSS 3.4**. Deployed on Netlify.

## Local Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # builds static output to dist/
npm run preview   # preview dist/ locally before deploying
```

## Netlify Deployment

The site auto-deploys on push to `main`. Configuration lives in `netlify.toml`:

| Setting         | Value          |
|-----------------|----------------|
| Build command   | `npm run build` |
| Publish dir     | `dist`         |
| Node version    | 20             |

## DNS Configuration

| Record | Name | Value                          | Notes                    |
|--------|------|--------------------------------|--------------------------|
| A      | @    | 75.2.60.5                      | Netlify apex domain      |
| CNAME  | www  | apex-loadbalancer.netlify.com  | www redirect             |
| CNAME  | app  | (Firebase Hosting target)      | app.ekosha.co.in → app   |

## Live App

All CTA buttons on this marketing site link to the Flutter web app:

```
https://app.ekosha.co.in
```

This URL is defined as a local constant `APP_URL` in each component that links to the app:
`Nav.astro`, `Hero.astro`, `Pricing.astro`, `Footer.astro`.

If the app URL changes, update it in those four files.

## Agentic Development

- **Claude Code**: See `CLAUDE.md` for project context, brand tokens, architecture rules
- **Codex**: See `AGENTS.md` for the same info in agent-rule format
