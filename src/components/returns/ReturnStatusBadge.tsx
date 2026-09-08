import { RETURN_STATUS_LABELS } from '../../constants/returnStatus'
import type { ReturnStatus } from '../../types/item'

interface ReturnStatusBadgeProps {
  status: ReturnStatus
}

export function ReturnStatusBadge({ status }: ReturnStatusBadgeProps) {
  return <span className="text-xs tracking-widest text-ink-faint uppercase">{RETURN_STATUS_LABELS[status]}</span>
}
