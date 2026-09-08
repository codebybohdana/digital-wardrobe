import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { ItemGrid } from '../components/wardrobe/ItemGrid'
import { useItems } from '../hooks/useItems'

export function WardrobePage() {
  const { items, isLoading } = useItems()
  const activeItems = items.filter((item) => item.returnStatus !== 'returned')

  return (
    <div>
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Wardrobe</h1>
          {!isLoading && (
            <p className="text-sm text-stone-500">
              {activeItems.length} {activeItems.length === 1 ? 'item' : 'items'}
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
      ) : (
        <ItemGrid items={activeItems} />
      )}
    </div>
  )
}
