const imageUrls = import.meta.glob('./images/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const imageUrlByFilename = new Map(Object.entries(imageUrls).map(([path, url]) => [path.split('/').pop() ?? path, url]))

export async function loadDemoImage(filename: string): Promise<Blob | undefined> {
  const url = imageUrlByFilename.get(filename)
  if (!url) return undefined

  try {
    const response = await fetch(url)
    if (!response.ok) return undefined
    return await response.blob()
  } catch {
    return undefined
  }
}
