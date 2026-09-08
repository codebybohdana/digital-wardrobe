import { CATEGORY_LABELS } from '../../constants/categories'
import type { ClothingCategory } from '../../types/item'

interface CategoryTabsProps {
  value: ClothingCategory | 'all'
  onChange: (value: ClothingCategory | 'all') => void
}

const categories: (ClothingCategory | 'all')[] = ['all', ...(Object.keys(CATEGORY_LABELS) as ClothingCategory[])]

export function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const active = value === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium ${
              active ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-600'
            }`}
          >
            {category === 'all' ? 'All' : CATEGORY_LABELS[category]}
          </button>
        )
      })}
    </div>
  )
}
