// Tag pages with fewer posts than this are thin (a heading plus one or two
// cards), so they are marked noindex and left out of the sitemap. Shared by
// the tag page template and astro.config.mjs so both always agree.
import { readdirSync, readFileSync } from 'node:fs';

/** Minimum number of articles a tag needs before its page is indexable. */
export const MIN_POSTS_FOR_INDEXABLE_TAG = 3;

/** Same mapping as src/lib/tagSlug.ts (duplicated so the config can run without TS). */
function slugOf(tag) {
  return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Returns the set of tag slugs used by fewer than MIN_POSTS_FOR_INDEXABLE_TAG
 * non-draft posts, by reading the blog frontmatter directly.
 */
export function thinTagSlugs(blogDir) {
  const counts = new Map();
  for (const file of readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
    const fm = readFileSync(`${blogDir}/${file}`, 'utf8').split('---')[1] ?? '';
    if (/^draft:\s*true\s*$/m.test(fm)) continue;
    const m = fm.match(/^tags:\s*\[(.*)\]\s*$/m);
    if (!m) continue;
    for (const raw of m[1].split(',')) {
      const slug = slugOf(raw.replace(/["']/g, ''));
      if (slug) counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }
  return new Set([...counts].filter(([, n]) => n < MIN_POSTS_FOR_INDEXABLE_TAG).map(([s]) => s));
}
