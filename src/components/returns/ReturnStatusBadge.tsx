import { RETURN_STATUS_LABELS } from '../../constants/returnStatus'
import type { ReturnStatus } from '../../types/item'

interface ReturnStatusBadgeProps {
  status: ReturnStatus
}

export function ReturnStatusBadge({ status }: ReturnStatusBadgeProps) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">
      {RETURN_STATUS_LABELS[status]}
    </span>
  )
}
