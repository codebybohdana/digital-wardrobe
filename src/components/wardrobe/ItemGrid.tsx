import type { ClothingItem } from '../../types/item'
import { ItemCard } from './ItemCard'

interface ItemGridProps {
  items: ClothingItem[]
}

export function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
