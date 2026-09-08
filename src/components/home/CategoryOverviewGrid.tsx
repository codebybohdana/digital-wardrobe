import { Link } from 'react-router-dom'
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
    <div className="flex flex-col divide-y divide-line border-t border-line">
      {categories.map((category) => (
        <Link
          key={category}
          to={`/wardrobe?category=${category}`}
          className="flex items-center justify-between py-3 text-sm text-ink transition-colors duration-200 active:opacity-60"
        >
          <span>{CATEGORY_LABELS[category]}</span>
          <span className="text-ink-faint">{counts[category]}</span>
        </Link>
      ))}
    </div>
  )
}
