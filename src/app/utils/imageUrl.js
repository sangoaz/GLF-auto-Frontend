export function imageUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`
}