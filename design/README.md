# Design tokens (vendored)

`tokens.json` is a **vendored copy** of `ekosha-foundation/02-brand/design-language/tokens.json` (eKosha Design
Language, EDL). Never edit it here: change the foundation first, then copy it over.

`tailwind.config.mjs` reads this file, so the site's colours come from the same source as the app.
`npm run check:tokens` (also run as `prebuild`) verifies the Tailwind palette still equals the tokens and, when a
sibling checkout of the foundation exists (`../ekosha-foundation`), that this copy is identical to it.
