import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/layout/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { PhotoPlaceholder } from '../components/ui/PhotoPlaceholder'
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
        <div className="px-6 py-24 text-center text-sm text-ink-faint">Loading item…</div>
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
              className="bg-ink px-6 py-3 text-sm text-paper"
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

      <div className="animate-fade-in-up px-6 pt-6">
        <h2 className="font-display text-3xl text-ink">{item.name}</h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          {item.brand ? `${item.brand} · ` : ''}
          {CATEGORY_LABELS[item.category]}
        </p>

        <dl className="mt-8 flex flex-col divide-y divide-line border-t border-line">
          {item.color && <DetailRow label="Color" value={item.color} />}
          {item.season && <DetailRow label="Season" value={SEASON_LABELS[item.season]} />}
          {item.price !== undefined && <DetailRow label="Price" value={`$${item.price.toFixed(2)}`} />}
          {item.store && <DetailRow label="Store" value={item.store} />}
          {item.purchaseDate && <DetailRow label="Purchase date" value={formatDate(item.purchaseDate)} />}
        </dl>

        {item.returnDeadline && (
          <div className="mt-8">
            <p className="text-xs tracking-[0.14em] text-ink-faint uppercase">Return tracking</p>
            <dl className="mt-3 flex flex-col divide-y divide-line border-t border-line">
              <DetailRow label="Return deadline" value={formatDate(item.returnDeadline)} />
              {item.returnStatus && <DetailRow label="Status" value={RETURN_STATUS_LABELS[item.returnStatus]} />}
            </dl>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md items-center justify-between border-t border-line bg-paper px-6 py-4">
        <button type="button" onClick={handleDelete} className="text-sm text-ink-muted underline underline-offset-4">
          Delete
        </button>
        <button
          type="button"
          onClick={() => navigate(`/item/${item.id}/edit`)}
          className="bg-ink px-8 py-3 text-sm text-paper"
        >
          Edit
        </button>
      </div>
    </div>
  )
}

function ItemPhoto({ photo, name }: { photo?: Blob; name: string }) {
  const photoUrl = usePhotoUrl(photo)

  return (
    <div className="aspect-4/5 w-full overflow-hidden bg-surface">
      {photoUrl ? (
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <PhotoPlaceholder iconClassName="h-16 w-16" />
      )}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  )
}
