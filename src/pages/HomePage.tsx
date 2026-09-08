import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CategoryOverviewGrid } from '../components/home/CategoryOverviewGrid'
import { RecentItemsRow } from '../components/home/RecentItemsRow'
import { StatTile } from '../components/home/StatTile'
import { DeadlineCountdown } from '../components/returns/DeadlineCountdown'
import { EmptyState } from '../components/ui/EmptyState'
import { CATEGORY_LABELS } from '../constants/categories'
import { useItems } from '../hooks/useItems'
import type { ClothingCategory } from '../types/item'
import { daysRemaining } from '../utils/dates'
import { hasReturnDeadline } from '../utils/returns'

const RECENT_ITEMS_LIMIT = 4
const RETURNS_SOON_LIMIT = 3
const RETURNS_SOON_WINDOW_DAYS = 7

export function HomePage() {
  const { items, isLoading } = useItems()

  const activeItems = useMemo(() => items.filter((item) => item.returnStatus !== 'returned'), [items])

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<ClothingCategory, number>
    for (const category of Object.keys(CATEGORY_LABELS) as ClothingCategory[]) {
      counts[category] = 0
    }
    for (const item of activeItems) {
      counts[item.category] += 1
    }
    return counts
  }, [activeItems])

  const recentItems = useMemo(
    () => [...activeItems].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, RECENT_ITEMS_LIMIT),
    [activeItems],
  )

  const returnsEndingSoon = useMemo(
    () =>
      items
        .filter(hasReturnDeadline)
        .filter((item) => item.returnStatus === 'considering')
        .filter((item) => daysRemaining(item.returnDeadline) <= RETURNS_SOON_WINDOW_DAYS)
        .sort((a, b) => a.returnDeadline.localeCompare(b.returnDeadline))
        .slice(0, RETURNS_SOON_LIMIT),
    [items],
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-stone-900">Home</h1>

      {isLoading ? (
        <div className="py-24 text-center text-sm text-stone-400">Loading…</div>
      ) : activeItems.length === 0 ? (
        <EmptyState
          title="Welcome to your wardrobe"
          message="Add your first piece to see it here."
          action={
            <Link
              to="/item/new"
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white"
            >
              Add your first item
            </Link>
          }
        />
      ) : (
        <div className="mt-6 flex flex-col gap-8">
          <div className="flex gap-8">
            <StatTile value={activeItems.length} label={activeItems.length === 1 ? 'item' : 'items'} />
          </div>

          <CategoryOverviewGrid counts={categoryCounts} />

          {recentItems.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium text-stone-700">Recently added</h2>
              <RecentItemsRow items={recentItems} />
            </section>
          )}

          {returnsEndingSoon.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium text-stone-700">Returns ending soon</h2>
              <div className="flex flex-col gap-2">
                {returnsEndingSoon.map((item) => (
                  <Link
                    key={item.id}
                    to={`/item/${item.id}`}
                    className="flex items-center justify-between rounded-xl bg-stone-50 px-3 py-2.5"
                  >
                    <span className="truncate text-sm text-stone-700">{item.name}</span>
                    <DeadlineCountdown returnDeadline={item.returnDeadline} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
