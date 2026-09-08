import { Link } from 'react-router-dom'
import type { ClothingItem } from '../../types/item'
import { usePhotoUrl } from '../../utils/image'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'

interface RecentItemsRowProps {
  items: ClothingItem[]
}

export function RecentItemsRow({ items }: RecentItemsRowProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <RecentItemThumb key={item.id} item={item} />
      ))}
    </div>
  )
}

function RecentItemThumb({ item }: { item: ClothingItem }) {
  const photoUrl = usePhotoUrl(item.photo)

  return (
    <Link to={`/item/${item.id}`} className="w-20 shrink-0">
      <div className="aspect-3/4 w-full overflow-hidden rounded-xl bg-stone-100">
        {photoUrl ? (
          <img src={photoUrl} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <PhotoPlaceholder iconClassName="h-6 w-6" />
        )}
      </div>
      <p className="mt-1 truncate text-xs text-stone-600">{item.name}</p>
    </Link>
  )
}
