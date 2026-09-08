import { Link } from 'react-router-dom'
import { CATEGORY_LABELS } from '../../constants/categories'
import type { ClothingItem } from '../../types/item'
import { usePhotoUrl } from '../../utils/image'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'

interface ItemCardProps {
  item: ClothingItem
}

export function ItemCard({ item }: ItemCardProps) {
  const photoUrl = usePhotoUrl(item.photo)

  return (
    <Link to={`/item/${item.id}`} className="group flex flex-col gap-2.5">
      <div className="aspect-3/4 w-full overflow-hidden bg-surface transition-transform duration-200 ease-out active:scale-[0.98]">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>
      <div>
        <p className="truncate text-sm text-ink">{item.name}</p>
        <p className="truncate text-xs text-ink-muted">
          {item.brand ? `${item.brand} · ` : ''}
          {CATEGORY_LABELS[item.category]}
        </p>
      </div>
    </Link>
  )
}
