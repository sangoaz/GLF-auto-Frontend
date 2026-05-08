export function imageUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `http://127.0.0.1:8000${url}`
}