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
  return (
    <Link to={`/outfit/${outfit.id}`} className="flex flex-col gap-2">
      <div className="grid aspect-square w-full grid-cols-2 grid-rows-2 gap-1 overflow-hidden rounded-2xl bg-stone-100">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="overflow-hidden bg-stone-100">
            {previewItems[index] && <PreviewThumb item={previewItems[index]} />}
          </div>
        ))}
      </div>
      <div className="px-0.5">
        <p className="truncate text-sm font-medium text-stone-900">{outfit.name}</p>
        <p className="text-xs text-stone-500">
          {previewItems.length} {previewItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>
    </Link>
  )
}

function PreviewThumb({ item }: { item: ClothingItem }) {
  const photoUrl = usePhotoUrl(item.photo)

  return photoUrl ? (
    <img src={photoUrl} alt={item.name} className="h-full w-full object-cover" />
  ) : (
    <PhotoPlaceholder iconClassName="h-5 w-5" />
  )
}
