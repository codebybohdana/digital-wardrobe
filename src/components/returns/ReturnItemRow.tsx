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
    <div className="flex items-center gap-4 py-4">
      <Link to={`/item/${item.id}`} className="flex min-w-0 flex-1 items-center gap-4">
        <div className="h-16 w-14 shrink-0 overflow-hidden bg-surface">
          {photoUrl ? (
            <img src={photoUrl} alt={item.name} className="h-full w-full object-cover" />
          ) : (
            <PhotoPlaceholder iconClassName="h-5 w-5" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-ink">{item.name}</p>
          <p className="truncate text-xs text-ink-muted">
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
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <button type="button" onClick={onKeep} className="text-xs text-ink underline underline-offset-4">
            Keep
          </button>
          <button type="button" onClick={onReturn} className="text-xs text-ink-muted underline underline-offset-4">
            Return
          </button>
        </div>
      )}
    </div>
  )
}
