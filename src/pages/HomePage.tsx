import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CategoryOverviewGrid } from '../components/home/CategoryOverviewGrid'
import { LooksPreview } from '../components/home/LooksPreview'
import { RecentItemsRow } from '../components/home/RecentItemsRow'
import { DeadlineCountdown } from '../components/returns/DeadlineCountdown'
import { EmptyState } from '../components/ui/EmptyState'
import { CATEGORY_LABELS } from '../constants/categories'
import { useItems } from '../hooks/useItems'
import { useOutfits } from '../hooks/useOutfits'
import type { ClothingCategory } from '../types/item'
import { daysRemaining } from '../utils/dates'
import { hasReturnDeadline } from '../utils/returns'

const RECENT_ITEMS_LIMIT = 6
const LOOKS_PREVIEW_LIMIT = 6
const RETURNS_SOON_LIMIT = 3
const RETURNS_SOON_WINDOW_DAYS = 7

export function HomePage() {
  const { items, isLoading } = useItems()
  const { outfits } = useOutfits()

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

  const recentLooks = useMemo(
    () => [...outfits].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, LOOKS_PREVIEW_LIMIT),
    [outfits],
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

  if (isLoading) {
    return <div className="px-6 py-24 text-center text-sm text-ink-faint">Loading…</div>
  }

  if (activeItems.length === 0) {
    return (
      <EmptyState
        title="Welcome to your wardrobe"
        message="Add your first piece to see it here."
        action={
          <Link to="/item/new" className="bg-ink px-6 py-3 text-sm text-paper">
            Add your first item
          </Link>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-14 pb-8">
      <header className="animate-fade-in-up px-6 pt-10 pb-2">
        <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">Your Archive</p>
        <h1 className="font-display mt-3 text-4xl leading-[1.05] text-ink">
          {activeItems.length} pieces <span className="text-ink-faint">·</span> {outfits.length} looks
        </h1>
      </header>

      {recentItems.length > 0 && (
        <section className="animate-fade-in-up px-6" style={{ animationDelay: '80ms' }}>
          <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">Recently Added</p>
          <div className="mt-4">
            <RecentItemsRow items={recentItems} />
          </div>
        </section>
      )}

      {recentLooks.length > 0 && (
        <section className="animate-fade-in-up px-6" style={{ animationDelay: '140ms' }}>
          <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">Saved Looks</p>
          <div className="mt-4">
            <LooksPreview outfits={recentLooks} items={items} />
          </div>
        </section>
      )}

      <section className="animate-fade-in-up px-6" style={{ animationDelay: '200ms' }}>
        <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">Explore</p>
        <div className="mt-4">
          <CategoryOverviewGrid counts={categoryCounts} />
        </div>
      </section>

      {returnsEndingSoon.length > 0 && (
        <section className="animate-fade-in-up px-6" style={{ animationDelay: '260ms' }}>
          <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">Returns</p>
          <div className="mt-4 flex flex-col divide-y divide-line border-t border-line">
            {returnsEndingSoon.map((item) => (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="flex items-center justify-between py-3 text-sm text-ink active:opacity-60"
              >
                <span className="truncate text-ink-muted">{item.name}</span>
                <DeadlineCountdown returnDeadline={item.returnDeadline} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
