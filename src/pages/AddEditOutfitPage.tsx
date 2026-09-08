import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ItemPicker } from '../components/outfits/ItemPicker'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { createOutfit, getOutfitById, updateOutfit } from '../db/outfits'
import { useItems } from '../hooks/useItems'
import type { Outfit } from '../types/outfit'

type LoadState = { status: 'loading' } | { status: 'not-found' } | { status: 'ready'; outfit?: Outfit }

const MIN_SELECTED_ITEMS = 2

export function AddEditOutfitPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const { items, isLoading: itemsLoading } = useItems()
  const activeItems = useMemo(() => items.filter((item) => item.returnStatus !== 'returned'), [items])

  const [state, setState] = useState<LoadState>(isEditMode ? { status: 'loading' } : { status: 'ready' })
  const [name, setName] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [error, setError] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isEditMode || !id) return

    let cancelled = false

    getOutfitById(id).then((found) => {
      if (cancelled) return
      if (found) {
        setState({ status: 'ready', outfit: found })
        setName(found.name)
        setSelectedIds(found.itemIds)
      } else {
        setState({ status: 'not-found' })
      }
    })

    return () => {
      cancelled = true
    }
  }, [id, isEditMode])

  function toggleItem(itemId: string) {
    setSelectedIds((prev) => (prev.includes(itemId) ? prev.filter((i) => i !== itemId) : [...prev, itemId]))
  }

  async function handleSubmit() {
    if (!name.trim()) {
      setError('Outfit name is required')
      return
    }
    if (selectedIds.length < MIN_SELECTED_ITEMS) {
      setError(`Select at least ${MIN_SELECTED_ITEMS} items`)
      return
    }

    setError(undefined)
    setIsSubmitting(true)

    try {
      if (isEditMode && id) {
        await updateOutfit(id, { name: name.trim(), itemIds: selectedIds })
        navigate(`/outfit/${id}`)
      } else {
        const outfit = await createOutfit({ name: name.trim(), itemIds: selectedIds })
        navigate(`/outfit/${outfit.id}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleCancel() {
    navigate(-1)
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

  return (
    <div className="mx-auto max-w-md pb-28">
      <PageHeader title={isEditMode ? 'Edit Outfit' : 'Create Outfit'} />

      <div className="flex flex-col gap-5 p-4">
        <div>
          <label className="text-sm font-medium text-stone-700" htmlFor="outfit-name">
            Name
          </label>
          <input
            id="outfit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Weekend brunch"
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-900 focus:border-stone-400 focus:outline-none"
          />
        </div>

        {itemsLoading ? (
          <div className="py-12 text-center text-sm text-stone-400">Loading wardrobe…</div>
        ) : activeItems.length === 0 ? (
          <p className="text-sm text-stone-500">Add wardrobe items first before creating an outfit.</p>
        ) : (
          <ItemPicker items={activeItems} selectedIds={selectedIds} onToggle={toggleItem} />
        )}

        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md gap-3 border-t border-stone-200 bg-white p-4">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 rounded-full border border-stone-300 py-3 text-sm font-medium text-stone-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-stone-900 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : isEditMode ? 'Save changes' : 'Create outfit'}
        </button>
      </div>
    </div>
  )
}
