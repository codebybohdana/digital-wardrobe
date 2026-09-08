import { useEffect, useMemo } from 'react'

export function usePhotoUrl(photo: Blob | undefined): string | undefined {
  const url = useMemo(() => (photo ? URL.createObjectURL(photo) : undefined), [photo])

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  return url
}
