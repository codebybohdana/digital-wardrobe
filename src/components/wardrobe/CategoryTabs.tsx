import { CATEGORY_LABELS } from '../../constants/categories'
import type { ClothingCategory } from '../../types/item'

interface CategoryTabsProps {
  value: ClothingCategory | 'all'
  onChange: (value: ClothingCategory | 'all') => void
}

const categories: (ClothingCategory | 'all')[] = ['all', ...(Object.keys(CATEGORY_LABELS) as ClothingCategory[])]

export function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-5 overflow-x-auto scrollbar-none">
      {categories.map((category) => {
        const active = value === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={active}
            className={`shrink-0 border-b pb-1 text-sm whitespace-nowrap transition-colors duration-200 active:opacity-60 ${
              active ? 'border-ink text-ink' : 'border-transparent text-ink-faint'
            }`}
          >
            {category === 'all' ? 'All' : CATEGORY_LABELS[category]}
          </button>
        )
      })}
    </div>
  )
}
