import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ItemForm, type ItemFormSubmitValues } from '../components/item-form/ItemForm'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { createItem, getItemById, updateItem } from '../db/items'
import type { ClothingItem } from '../types/item'

type LoadState =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'ready'; item?: ClothingItem }

export function AddEditItemPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [state, setState] = useState<LoadState>(isEditMode ? { status: 'loading' } : { status: 'ready' })

  useEffect(() => {
    if (!isEditMode || !id) {
      return
    }

    let cancelled = false

    getItemById(id).then((found) => {
      if (cancelled) return
      setState(found ? { status: 'ready', item: found } : { status: 'not-found' })
    })

    return () => {
      cancelled = true
    }
  }, [id, isEditMode])

  async function handleSubmit(values: ItemFormSubmitValues) {
    if (isEditMode && id) {
      const existing = state.status === 'ready' ? state.item : undefined
      let returnStatus = existing?.returnStatus

      if (!values.returnDeadline) {
        returnStatus = undefined
      } else if (!returnStatus) {
        returnStatus = 'considering'
      }

      await updateItem(id, { ...values, returnStatus })
      navigate(`/item/${id}`)
    } else {
      const returnStatus = values.returnDeadline ? 'considering' : undefined
      await createItem({ ...values, returnStatus })
      navigate('/wardrobe')
    }
  }

  function handleCancel() {
    navigate(-1)
  }

  if (state.status === 'loading') {
    return (
      <div>
        <PageHeader title="Edit Item" />
        <div className="px-4 py-24 text-center text-sm text-stone-400">Loading item…</div>
      </div>
    )
  }

  if (state.status === 'not-found') {
    return (
      <div>
        <PageHeader title="Edit Item" />
        <EmptyState
          title="Item not found"
          message="This item may have been deleted."
          action={
            <button
              type="button"
              onClick={() => navigate('/wardrobe')}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white"
            >
              Back to wardrobe
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md">
      <PageHeader title={isEditMode ? 'Edit Item' : 'Add Item'} />
      <ItemForm
        initialItem={state.item}
        submitLabel={isEditMode ? 'Save changes' : 'Add item'}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
}
