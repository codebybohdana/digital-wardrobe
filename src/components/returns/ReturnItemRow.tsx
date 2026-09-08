import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/dates'
import { usePhotoUrl } from '../../utils/image'
import type { TrackedItem } from '../../utils/returns'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'
import { DeadlineCountdown } from './DeadlineCountdown'
import { ReturnStatusBadge } from './ReturnStatusBadge'

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
            <PhotoPlaceholder iconClassName="h-6 w-6" />
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
