import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ItemCard } from '../components/wardrobe/ItemCard'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
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
        <div className="px-4 py-24 text-center text-sm text-stone-400">Loading outfit…</div>
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
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white"
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

      <div className="px-4 pt-4">
        <h2 className="text-2xl font-semibold text-stone-900">{outfit.name}</h2>
        <p className="mt-1 text-sm text-stone-500">
          {outfitItems.length} {outfitItems.length === 1 ? 'item' : 'items'}
        </p>

        {outfitItems.length === 0 ? (
          <p className="mt-6 text-sm text-stone-500">None of the items in this outfit are available anymore.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {outfitItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md gap-3 border-t border-stone-200 bg-white p-4">
        <button
          type="button"
          onClick={() => navigate(`/outfit/${outfit.id}/edit`)}
          className="flex-1 rounded-full bg-stone-900 py-3 text-sm font-medium text-white"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="flex-1 rounded-full border border-red-200 py-3 text-sm font-medium text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
