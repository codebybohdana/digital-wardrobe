import { Link } from 'react-router-dom'
import { OutfitGrid } from '../components/outfits/OutfitGrid'
import { EmptyState } from '../components/ui/EmptyState'
import { useItems } from '../hooks/useItems'
import { useOutfits } from '../hooks/useOutfits'

export function OutfitsPage() {
  const { items } = useItems()
  const { outfits, isLoading } = useOutfits()

  return (
    <div>
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Outfits</h1>
          {!isLoading && (
            <p className="text-sm text-stone-500">
              {outfits.length} {outfits.length === 1 ? 'outfit' : 'outfits'}
            </p>
          )}
        </div>
        <Link
          to="/outfit/new"
          className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white"
        >
          Create outfit
        </Link>
      </div>

      {isLoading ? (
        <div className="px-4 py-24 text-center text-sm text-stone-400">Loading outfits…</div>
      ) : outfits.length === 0 ? (
        <EmptyState
          title="No outfits yet"
          message="Combine pieces from your wardrobe into saved looks you can wear again."
          action={
            <Link
              to="/outfit/new"
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white"
            >
              Create your first outfit
            </Link>
          }
        />
      ) : (
        <OutfitGrid outfits={outfits} items={items} />
      )}
    </div>
  )
}
