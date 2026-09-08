import { Link } from 'react-router-dom'
import type { ClothingItem } from '../../types/item'
import type { Outfit } from '../../types/outfit'
import { usePhotoUrl } from '../../utils/image'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'

interface OutfitCardProps {
  outfit: Outfit
  previewItems: ClothingItem[]
}

export function OutfitCard({ outfit, previewItems }: OutfitCardProps) {
  const photoUrl = usePhotoUrl(previewItems[0]?.photo)

  return (
    <Link to={`/outfit/${outfit.id}`} className="group flex flex-col gap-2.5">
      <div className="aspect-3/4 w-full overflow-hidden bg-surface transition-transform duration-200 ease-out active:scale-[0.98]">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={outfit.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>
      <div>
        <p className="truncate text-sm text-ink">{outfit.name}</p>
        <p className="truncate text-xs text-ink-muted">
          {previewItems.length} {previewItems.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>
    </Link>
  )
}
