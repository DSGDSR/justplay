export function cleanQuery(query: string): string {
  return query
    .replace(/[^a-zA-Z0-9 ']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
