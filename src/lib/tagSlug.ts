// Shared tag -> URL slug mapping, e.g. "Family Finance" -> "family-finance".
// Used by /blog/tag/[tag] pages and every place a tag pill links out.
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
