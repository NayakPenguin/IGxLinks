const MAX_LEN = 20;

export function trimUrl(url) {
  if (typeof url !== 'string') return '';
  return url.length > MAX_LEN ? url.slice(0, MAX_LEN) + '...' : url;
}