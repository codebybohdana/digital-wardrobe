import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { CategoryTabs } from '../components/wardrobe/CategoryTabs'
import { FilterSheet, type AdvancedFilters } from '../components/wardrobe/FilterSheet'
import { ItemGrid } from '../components/wardrobe/ItemGrid'
import { SearchBar } from '../components/wardrobe/SearchBar'
import { CATEGORY_LABELS } from '../constants/categories'
import { useItems } from '../hooks/useItems'
import type { ClothingCategory } from '../types/item'

function isClothingCategory(value: string | null): value is ClothingCategory {
  return value !== null && value in CATEGORY_LABELS
}

export function WardrobePage() {
  const { items, isLoading } = useItems()
  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ClothingCategory | 'all'>(() => {
    const initial = searchParams.get('category')
    return isClothingCategory(initial) ? initial : 'all'
  })
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({})
  const [isFilterSheetOpen, setFilterSheetOpen] = useState(false)

  const activeItems = useMemo(() => items.filter((item) => item.returnStatus !== 'returned'), [items])

  const brandOptions = useMemo(
    () =>
      Array.from(
        new Set(activeItems.map((item) => item.brand).filter((brand): brand is string => Boolean(brand))),
      ).sort(),
    [activeItems],
  )
  const colorOptions = useMemo(
    () =>
      Array.from(
        new Set(activeItems.map((item) => item.color).filter((color): color is string => Boolean(color))),
      ).sort(),
    [activeItems],
  )

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return activeItems.filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      if (advancedFilters.brand && item.brand !== advancedFilters.brand) return false
      if (advancedFilters.color && item.color !== advancedFilters.color) return false
      if (advancedFilters.season && item.season !== advancedFilters.season) return false

      if (normalizedQuery) {
        const haystack = [item.name, item.brand, item.color].filter(Boolean).join(' ').toLowerCase()
        if (!haystack.includes(normalizedQuery)) return false
      }

      return true
    })
  }, [activeItems, category, advancedFilters, query])

  const advancedFilterCount = [advancedFilters.brand, advancedFilters.color, advancedFilters.season].filter(
    Boolean,
  ).length
  const hasAnyFilter = Boolean(query.trim()) || category !== 'all' || advancedFilterCount > 0

  function resetFilters() {
    setQuery('')
    setCategory('all')
    setAdvancedFilters({})
  }

  const summary = hasAnyFilter
    ? `${filteredItems.length} of ${activeItems.length} pieces`
    : `${activeItems.length} ${activeItems.length === 1 ? 'piece' : 'pieces'}`

  return (
    <div>
      <header className="flex items-start justify-between px-6 pt-10 pb-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">Wardrobe</p>
          {!isLoading && <h1 className="font-display mt-2 text-3xl text-ink">{summary}</h1>}
        </div>
        <Link to="/item/new" className="mt-1 text-sm text-ink underline underline-offset-4">
          + Add
        </Link>
      </header>

      {!isLoading && activeItems.length > 0 && (
        <div className="flex flex-col gap-5 px-6 pb-6">
          <SearchBar value={query} onChange={setQuery} />

          <CategoryTabs value={category} onChange={setCategory} />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setFilterSheetOpen(true)}
              className="text-sm text-ink-muted underline-offset-4 active:opacity-60"
            >
              Filters{advancedFilterCount > 0 ? ` (${advancedFilterCount})` : ''}
            </button>

            {hasAnyFilter && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm text-ink-muted underline underline-offset-4 active:opacity-60"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="px-6 py-24 text-center text-sm text-ink-faint">Loading wardrobe…</div>
      ) : activeItems.length === 0 ? (
        <EmptyState
          title="Your wardrobe is empty"
          message="Add your first piece to start building your digital wardrobe."
          action={
            <Link to="/item/new" className="bg-ink px-6 py-3 text-sm text-paper">
              Add your first item
            </Link>
          }
        />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="No matches"
          message="Try adjusting your search or filters."
          action={
            <button type="button" onClick={resetFilters} className="bg-ink px-6 py-3 text-sm text-paper">
              Clear filters
            </button>
          }
        />
      ) : (
        <ItemGrid items={filteredItems} />
      )}

      <FilterSheet
        open={isFilterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        brands={brandOptions}
        colors={colorOptions}
        filters={advancedFilters}
        onChange={setAdvancedFilters}
      />
    </div>
  )
}
