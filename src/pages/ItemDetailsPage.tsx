import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { CATEGORY_LABELS } from '../constants/categories'
import { RETURN_STATUS_LABELS } from '../constants/returnStatus'
import { SEASON_LABELS } from '../constants/seasons'
import { deleteItem, getItemById } from '../db/items'
import type { ClothingItem } from '../types/item'
import { formatDate } from '../utils/dates'
import { usePhotoUrl } from '../utils/image'

type LoadState =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'ready'; item: ClothingItem }

export function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    if (!id) return

    let cancelled = false

    getItemById(id).then((found) => {
      if (cancelled) return
      setState(found ? { status: 'ready', item: found } : { status: 'not-found' })
    })

    return () => {
      cancelled = true
    }
  }, [id])

  async function handleDelete() {
    if (!id) return

    const confirmed = window.confirm('Delete this item? This cannot be undone.')
    if (!confirmed) return

    await deleteItem(id)
    navigate('/wardrobe')
  }

  if (state.status === 'loading') {
    return (
      <div>
        <PageHeader title="Item" />
        <div className="px-4 py-24 text-center text-sm text-stone-400">Loading item…</div>
      </div>
    )
  }

  if (state.status === 'not-found') {
    return (
      <div>
        <PageHeader title="Item" />
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

  const { item } = state

  return (
    <div className="mx-auto max-w-md pb-28">
      <PageHeader title={item.name} />
      <ItemPhoto photo={item.photo} name={item.name} />

      <div className="px-4 pt-4">
        <h2 className="text-2xl font-semibold text-stone-900">{item.name}</h2>
        <p className="mt-1 text-sm text-stone-500">
          {item.brand ? `${item.brand} · ` : ''}
          {CATEGORY_LABELS[item.category]}
        </p>

        <dl className="mt-6 flex flex-col gap-3">
          {item.color && <DetailRow label="Color" value={item.color} />}
          {item.season && <DetailRow label="Season" value={SEASON_LABELS[item.season]} />}
          {item.price !== undefined && <DetailRow label="Price" value={`$${item.price.toFixed(2)}`} />}
          {item.store && <DetailRow label="Store" value={item.store} />}
          {item.purchaseDate && <DetailRow label="Purchase date" value={formatDate(item.purchaseDate)} />}
        </dl>

        {item.returnDeadline && (
          <div className="mt-6 rounded-2xl bg-stone-50 p-4">
            <p className="text-xs font-medium tracking-wide text-stone-400 uppercase">Return tracking</p>
            <dl className="mt-2 flex flex-col gap-2">
              <DetailRow label="Return deadline" value={formatDate(item.returnDeadline)} />
              {item.returnStatus && (
                <DetailRow label="Status" value={RETURN_STATUS_LABELS[item.returnStatus]} />
              )}
            </dl>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md gap-3 border-t border-stone-200 bg-white p-4">
        <button
          type="button"
          onClick={() => navigate(`/item/${item.id}/edit`)}
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

function ItemPhoto({ photo, name }: { photo?: Blob; name: string }) {
  const photoUrl = usePhotoUrl(photo)

  return (
    <div className="mx-4 mt-4 aspect-4/5 overflow-hidden rounded-3xl bg-stone-100">
      {photoUrl ? (
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-stone-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="h-16 w-16">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3a2 2 0 0 1 2 2 5 5 0 0 1 5 5l2 7a1 1 0 0 1-1 1.3H4a1 1 0 0 1-1-1.3l2-7a5 5 0 0 1 5-5 2 2 0 0 1 2-2Z"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-stone-500">{label}</dt>
      <dd className="font-medium text-stone-900">{value}</dd>
    </div>
  )
}
