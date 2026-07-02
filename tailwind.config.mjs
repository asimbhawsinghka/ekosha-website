import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,svelte,vue}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0E2240',
          gold: '#E0B341',
          bg: '#F6F5F0',
          text: '#1A1A1A',
          muted: '#4A4A4A',
          tertiary: '#0D3B66',
        },
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
