import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { ItemCard } from '../components/wardrobe/ItemCard'
import { deleteOutfit, getOutfitById } from '../db/outfits'
import { useItems } from '../hooks/useItems'
import type { Outfit } from '../types/outfit'
import { resolveOutfitItems } from '../utils/outfits'

type LoadState = { status: 'loading' } | { status: 'not-found' } | { status: 'ready'; outfit: Outfit }

export function OutfitDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { items } = useItems()

  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    if (!id) return

    let cancelled = false

    getOutfitById(id).then((found) => {
      if (cancelled) return
      setState(found ? { status: 'ready', outfit: found } : { status: 'not-found' })
    })

    return () => {
      cancelled = true
    }
  }, [id])

  async function handleDelete() {
    if (!id) return

    const confirmed = window.confirm('Delete this outfit? This cannot be undone.')
    if (!confirmed) return

    await deleteOutfit(id)
    navigate('/outfits')
  }

  if (state.status === 'loading') {
    return (
      <div>
        <PageHeader title="Outfit" />
        <div className="px-6 py-24 text-center text-sm text-ink-faint">Loading outfit…</div>
      </div>
    )
  }

  if (state.status === 'not-found') {
    return (
      <div>
        <PageHeader title="Outfit" />
        <EmptyState
          title="Outfit not found"
          message="This outfit may have been deleted."
          action={
            <button
              type="button"
              onClick={() => navigate('/outfits')}
              className="bg-ink px-6 py-3 text-sm text-paper"
            >
              Back to outfits
            </button>
          }
        />
      </div>
    )
  }

  const { outfit } = state
  const outfitItems = resolveOutfitItems(outfit.itemIds, items)

  return (
    <div className="mx-auto max-w-md pb-28">
      <PageHeader title={outfit.name} />

      <div className="animate-fade-in-up px-6 pt-4">
        <h2 className="font-display text-3xl text-ink">{outfit.name}</h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          {outfitItems.length} {outfitItems.length === 1 ? 'piece' : 'pieces'}
        </p>

        {outfitItems.length === 0 ? (
          <p className="mt-8 text-sm text-ink-muted">None of the items in this outfit are available anymore.</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-1.5 gap-y-8">
            {outfitItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md items-center justify-between border-t border-line bg-paper px-6 py-4">
        <button type="button" onClick={handleDelete} className="text-sm text-ink-muted underline underline-offset-4">
          Delete
        </button>
        <button
          type="button"
          onClick={() => navigate(`/outfit/${outfit.id}/edit`)}
          className="bg-ink px-8 py-3 text-sm text-paper"
        >
          Edit
        </button>
      </div>
    </div>
  )
}
