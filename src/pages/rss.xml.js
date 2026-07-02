import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// RSS feed at /rss.xml — free, official @astrojs/rss. Regenerates on every build.
export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: 'The eKosha Blog',
    description:
      'Practical, calm guidance on family financial preparedness — organising what your family owns, where it lives, and who should know.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en-in</language>',
  });
}
