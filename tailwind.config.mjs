/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,svelte,vue}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0D3B66',
          teal: '#00A896',
          bg: '#F3F7FB',
          text: '#102A43',
          muted: '#627D98',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
