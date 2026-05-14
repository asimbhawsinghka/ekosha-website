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
    },
  },
  plugins: [],
};
