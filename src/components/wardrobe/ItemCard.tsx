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
    <Link to={`/item/${item.id}`} className="group flex flex-col gap-2">
      <div className="aspect-3/4 w-full overflow-hidden rounded-2xl bg-stone-100">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>
      <div className="px-0.5">
        <p className="truncate text-sm font-medium text-stone-900">{item.name}</p>
        <p className="truncate text-xs text-stone-500">
          {item.brand ? `${item.brand} · ` : ''}
          {CATEGORY_LABELS[item.category]}
        </p>
      </div>
    </Link>
  )
}
