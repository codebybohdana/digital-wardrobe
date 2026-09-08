import { CATEGORY_LABELS } from '../../constants/categories'
import type { ClothingCategory } from '../../types/item'

interface CategoryOverviewGridProps {
  counts: Record<ClothingCategory, number>
}

export function CategoryOverviewGrid({ counts }: CategoryOverviewGridProps) {
  const categories = (Object.keys(CATEGORY_LABELS) as ClothingCategory[]).filter((category) => counts[category] > 0)

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <div key={category} className="rounded-full bg-stone-100 px-3 py-1.5 text-xs text-stone-600">
          <span className="font-medium text-stone-900">{counts[category]}</span> {CATEGORY_LABELS[category]}
        </div>
      ))}
    </div>
  )
}
