import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ekosha.co.in',
  integrations: [
    tailwind(),
    sitemap({
      // Keep the 404 out of the sitemap (it's noindex anyway).
      filter: (page) => !page.endsWith('/404/') && !page.endsWith('/404'),
    }),
  ],
  output: 'static',
});
