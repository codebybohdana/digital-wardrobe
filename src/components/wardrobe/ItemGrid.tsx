import type { ClothingItem } from '../../types/item'
import { ItemCard } from './ItemCard'

interface ItemGridProps {
  items: ClothingItem[]
}

const STAGGER_STEP_MS = 30
const STAGGER_CAP_MS = 300

export function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-1.5 gap-y-8 px-6">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${Math.min(index * STAGGER_STEP_MS, STAGGER_CAP_MS)}ms` }}
        >
          <ItemCard item={item} />
        </div>
      ))}
    </div>
  )
}
