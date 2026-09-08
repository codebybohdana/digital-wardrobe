import { Link } from 'react-router-dom'
import { CATEGORY_LABELS } from '../../constants/categories'
import type { ClothingItem } from '../../types/item'
import { usePhotoUrl } from '../../utils/image'

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
          <div className="flex h-full w-full items-center justify-center text-stone-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              className="h-10 w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3a2 2 0 0 1 2 2 5 5 0 0 1 5 5l2 7a1 1 0 0 1-1 1.3H4a1 1 0 0 1-1-1.3l2-7a5 5 0 0 1 5-5 2 2 0 0 1 2-2Z"
              />
            </svg>
          </div>
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
