import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { thinTagSlugs } from './src/lib/tagIndexing.mjs';

const thinTags = thinTagSlugs('./src/content/blog');

export default defineConfig({
  site: 'https://ekosha.co.in',
  integrations: [
    tailwind(),
    sitemap({
      // Keep noindex pages (404, the /invite/ conversion page, thin tag pages)
      // out of the sitemap so Search Console is not told to crawl them.
      filter: (page) => {
        const path = new URL(page).pathname;
        if (path === '/404/' || path === '/404' || path === '/invite/') return false;
        const tag = path.match(/^\/blog\/tag\/([^/]+)\/?$/);
        return !(tag && thinTags.has(tag[1]));
      },
    }),
  ],
  output: 'static',
});
