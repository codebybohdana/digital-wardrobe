import { Link } from 'react-router-dom'
import type { ClothingItem } from '../../types/item'
import type { Outfit } from '../../types/outfit'
import { usePhotoUrl } from '../../utils/image'
import { resolveOutfitItems } from '../../utils/outfits'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'

interface LooksPreviewProps {
  outfits: Outfit[]
  items: ClothingItem[]
}

const STAGGER_STEP_MS = 60

export function LooksPreview({ outfits, items }: LooksPreviewProps) {
  return (
    <div className="-mx-6 flex gap-1.5 overflow-x-auto px-6 pb-1 scrollbar-none">
      {outfits.map((outfit, index) => (
        <div
          key={outfit.id}
          className="animate-fade-in-up shrink-0"
          style={{ animationDelay: `${index * STAGGER_STEP_MS}ms` }}
        >
          <LookThumb outfit={outfit} previewItems={resolveOutfitItems(outfit.itemIds, items)} />
        </div>
      ))}
    </div>
  )
}

function LookThumb({ outfit, previewItems }: { outfit: Outfit; previewItems: ClothingItem[] }) {
  const photoUrl = usePhotoUrl(previewItems[0]?.photo)

  return (
    <Link to={`/outfit/${outfit.id}`} className="block w-36">
      <div className="aspect-3/4 w-full overflow-hidden bg-surface transition-transform duration-200 ease-out active:scale-[0.98]">
        {photoUrl ? (
          <img src={photoUrl} alt={outfit.name} className="h-full w-full object-cover" />
        ) : (
          <PhotoPlaceholder iconClassName="h-6 w-6" />
        )}
      </div>
      <p className="mt-2 truncate text-xs text-ink-muted">{outfit.name}</p>
    </Link>
  )
}
