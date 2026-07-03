// Build-time only helper: asks PostHog which /blog/<slug> pages got the most
// pageviews recently, so the homepage carousel can show "most read" instead of
// just "latest". Runs during `astro build` (Node), never in the browser — the
// API key required here must NOT carry the PUBLIC_ prefix.
//
// Deliberately fails soft: no key configured, a network error, a timeout, or
// an unexpected response all resolve to an empty array rather than throwing,
// so a PostHog outage or missing credential can never break the site build.
// Callers are expected to fall back to latest-by-date when this returns [].

const PROJECT_ID = import.meta.env.POSTHOG_PROJECT_ID || '200149';
const API_HOST = import.meta.env.POSTHOG_QUERY_HOST || 'https://eu.posthog.com';
const API_KEY = import.meta.env.POSTHOG_QUERY_API_KEY;
const REQUEST_TIMEOUT_MS = 5000;
const LOOKBACK_DAYS = 90;

/** Ordered most-viewed first. Slugs only (no leading /blog/). */
export async function fetchPopularBlogSlugs(limit = 10): Promise<string[]> {
  if (!API_KEY) return [];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_HOST}/api/projects/${PROJECT_ID}/query/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: `
            SELECT properties.$pathname AS path, count() AS views
            FROM events
            WHERE event = '$pageview'
              AND properties.$pathname LIKE '/blog/%'
              AND properties.$pathname != '/blog/'
              AND properties.$pathname != '/blog'
              AND timestamp > now() - INTERVAL ${LOOKBACK_DAYS} DAY
            GROUP BY path
            ORDER BY views DESC
            LIMIT ${limit}
          `,
        },
      }),
      signal: controller.signal,
    });

    if (!res.ok) return [];

    const data: { results?: [string, number][] } = await res.json();
    return (data.results ?? [])
      .map(([path]) => path.replace(/^\/blog\//, '').replace(/\/$/, ''))
      .filter(Boolean);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
