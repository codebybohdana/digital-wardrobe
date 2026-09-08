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
      <header className="flex items-start justify-between px-6 pt-10 pb-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">Outfits</p>
          {!isLoading && (
            <h1 className="font-display mt-2 text-3xl text-ink">
              {outfits.length} {outfits.length === 1 ? 'look' : 'looks'}
            </h1>
          )}
        </div>
        <Link to="/outfit/new" className="mt-1 text-sm text-ink underline underline-offset-4">
          + Create
        </Link>
      </header>

      {isLoading ? (
        <div className="px-6 py-24 text-center text-sm text-ink-faint">Loading outfits…</div>
      ) : outfits.length === 0 ? (
        <EmptyState
          title="No outfits yet"
          message="Combine pieces from your wardrobe into saved looks you can wear again."
          action={
            <Link to="/outfit/new" className="bg-ink px-6 py-3 text-sm text-paper">
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
