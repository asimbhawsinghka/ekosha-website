import { readFileSync } from 'node:fs';
import { URL } from 'node:url';
import typography from '@tailwindcss/typography';

// EDL tokens (vendored from ekosha-foundation; see design/README.md).
const tokens = JSON.parse(readFileSync(new URL('./design/tokens.json', import.meta.url), 'utf-8'));
const light = tokens.colors.light;
const tones = tokens.colors.tones.light;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,svelte,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // Existing brand names, now sourced from the EDL tokens (values unchanged).
        brand: {
          navy: light.navy,
          gold: light.spark,
          bg: light.ivory,
          text: light.ink,
          muted: light.ink2,
          tertiary: light.navyMid,
          // Added with EDL: gold-coloured TEXT/ICONS on light surfaces (>= 4.5:1).
          // `brand.gold` is a fill (or text on navy only) — never text on white/ivory.
          goldInk: light.goldInk,
          line: light.line,
          lineStrong: light.lineStrong,
        },
        // Calm semantic tones (EDL §3.1.3): foreground on soft container.
        tone: Object.fromEntries(
          Object.entries(tones).map(([name, v]) => [name, { fg: v.fg, bg: v.bg }]),
        ),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Brand-tuned prose used by the blog article body (`prose prose-ekosha`).
      typography: ({ theme }) => ({
        ekosha: {
          css: {
            '--tw-prose-body': theme('colors.brand.text'),
            '--tw-prose-headings': theme('colors.brand.navy'),
            '--tw-prose-links': theme('colors.brand.navy'),
            '--tw-prose-bold': theme('colors.brand.navy'),
            '--tw-prose-quotes': theme('colors.brand.navy'),
            '--tw-prose-quote-borders': theme('colors.brand.gold'),
            '--tw-prose-bullets': theme('colors.brand.gold'),
            '--tw-prose-counters': theme('colors.brand.muted'),
            '--tw-prose-captions': theme('colors.brand.muted'),
            a: { textDecoration: 'underline', textDecorationColor: theme('colors.brand.gold') },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
