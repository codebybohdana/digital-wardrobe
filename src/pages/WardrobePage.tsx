import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { CategoryTabs } from '../components/wardrobe/CategoryTabs'
import { FilterSheet, type AdvancedFilters } from '../components/wardrobe/FilterSheet'
import { ItemGrid } from '../components/wardrobe/ItemGrid'
import { SearchBar } from '../components/wardrobe/SearchBar'
import { useItems } from '../hooks/useItems'
import type { ClothingCategory } from '../types/item'

export function WardrobePage() {
  const { items, isLoading } = useItems()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ClothingCategory | 'all'>('all')
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

  return (
    <div>
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Wardrobe</h1>
          {!isLoading && (
            <p className="text-sm text-stone-500">
              {hasAnyFilter
                ? `${filteredItems.length} of ${activeItems.length} items`
                : `${activeItems.length} ${activeItems.length === 1 ? 'item' : 'items'}`}
            </p>
          )}
        </div>
        <Link
          to="/item/new"
          className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white"
        >
          Add item
        </Link>
      </div>

      {!isLoading && activeItems.length > 0 && (
        <div className="flex flex-col gap-3 px-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <SearchBar value={query} onChange={setQuery} />
            </div>
            <button
              type="button"
              onClick={() => setFilterSheetOpen(true)}
              aria-label="Filters"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-600"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
                <path strokeLinecap="round" d="M4 7h10M18 7h2M4 17h2M8 17h12" />
                <circle cx="16" cy="7" r="2" />
                <circle cx="6" cy="17" r="2" />
              </svg>
              {advancedFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-medium text-white">
                  {advancedFilterCount}
                </span>
              )}
            </button>
          </div>

          <CategoryTabs value={category} onChange={setCategory} />

          {hasAnyFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start text-xs font-medium text-stone-500 underline underline-offset-2"
            >
              Reset filters
            </button>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="px-4 py-24 text-center text-sm text-stone-400">Loading wardrobe…</div>
      ) : activeItems.length === 0 ? (
        <EmptyState
          title="Your wardrobe is empty"
          message="Add your first piece to start building your digital wardrobe."
          action={
            <Link
              to="/item/new"
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white"
            >
              Add your first item
            </Link>
          }
        />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="No items match these filters"
          message="Try adjusting your search or filters."
          action={
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white"
            >
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
