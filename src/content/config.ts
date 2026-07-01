import { defineCollection, z } from 'astro:content';

// The `blog` collection is the contract for adding new articles: drop a Markdown
// file into `src/content/blog/`, fill this frontmatter, and it appears at
// `/blog/<filename>` plus the listing page and the RSS feed automatically.
const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('eKosha Team'),
      tags: z.array(z.string()).default([]),
      // Optimised at build time via `astro:assets`. Store images alongside the
      // article or in `src/assets/blog/` and reference them relatively.
      heroImage: image(),
      heroImageAlt: z.string(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
