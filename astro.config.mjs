import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ekosha.co.in',
  integrations: [tailwind()],
  output: 'static',
});
