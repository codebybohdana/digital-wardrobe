import { Link } from 'react-router-dom'
import type { ClothingItem } from '../../types/item'
import { formatDate } from '../../utils/dates'
import { usePhotoUrl } from '../../utils/image'
import { DeadlineCountdown } from './DeadlineCountdown'
import { ReturnStatusBadge } from './ReturnStatusBadge'

export type TrackedItem = ClothingItem & { returnDeadline: string }

interface ReturnItemRowProps {
  item: TrackedItem
  onKeep?: () => void
  onReturn?: () => void
}

export function ReturnItemRow({ item, onKeep, onReturn }: ReturnItemRowProps) {
  const photoUrl = usePhotoUrl(item.photo)
  const showActions = Boolean(onKeep && onReturn)

  return (
    <div className="rounded-2xl border border-stone-100 p-3">
      <Link to={`/item/${item.id}`} className="flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-stone-100">
          {photoUrl ? (
            <img src={photoUrl} alt={item.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-stone-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3a2 2 0 0 1 2 2 5 5 0 0 1 5 5l2 7a1 1 0 0 1-1 1.3H4a1 1 0 0 1-1-1.3l2-7a5 5 0 0 1 5-5 2 2 0 0 1 2-2Z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-stone-900">{item.name}</p>
          <p className="truncate text-xs text-stone-500">
            {item.brand ? `${item.brand} · ` : ''}
            {formatDate(item.returnDeadline)}
          </p>
          <div className="mt-1">
            {item.returnStatus === 'returned' ? (
              <ReturnStatusBadge status="returned" />
            ) : (
              <DeadlineCountdown returnDeadline={item.returnDeadline} />
            )}
          </div>
        </div>
      </Link>

      {showActions && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onKeep}
            className="flex-1 rounded-full border border-stone-300 py-2 text-sm font-medium text-stone-700"
          >
            Keep
          </button>
          <button
            type="button"
            onClick={onReturn}
            className="flex-1 rounded-full border border-stone-300 py-2 text-sm font-medium text-stone-700"
          >
            Returned
          </button>
        </div>
      )}
    </div>
  )
}
