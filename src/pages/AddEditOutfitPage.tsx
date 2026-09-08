import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/layout/PageHeader'
import { ItemPicker } from '../components/outfits/ItemPicker'
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

  return (
    <div className="mx-auto max-w-md pb-28">
      <PageHeader title={isEditMode ? 'Edit Outfit' : 'Create Outfit'} />

      <div className="flex flex-col gap-6 px-6">
        <div>
          <label className="text-xs tracking-[0.14em] text-ink-faint uppercase" htmlFor="outfit-name">
            Name
          </label>
          <input
            id="outfit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Weekend brunch"
            className="mt-1.5 w-full border-b border-line bg-transparent pb-2 text-sm text-ink focus:border-ink focus:outline-none"
          />
        </div>

        {itemsLoading ? (
          <div className="py-12 text-center text-sm text-ink-faint">Loading wardrobe…</div>
        ) : activeItems.length === 0 ? (
          <p className="text-sm text-ink-muted">Add wardrobe items first before creating an outfit.</p>
        ) : (
          <ItemPicker items={activeItems} selectedIds={selectedIds} onToggle={toggleItem} />
        )}

        {error && <p className="text-xs text-urgent">{error}</p>}
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md items-center justify-between border-t border-line bg-paper px-6 py-4">
        <button type="button" onClick={handleCancel} className="text-sm text-ink-muted underline underline-offset-4">
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-ink px-8 py-3 text-sm text-paper disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : isEditMode ? 'Save changes' : 'Create outfit'}
        </button>
      </div>
    </div>
  )
}
