import { daysRemaining } from '../../utils/dates'

interface DeadlineCountdownProps {
  returnDeadline: string
}

export function DeadlineCountdown({ returnDeadline }: DeadlineCountdownProps) {
  const days = daysRemaining(returnDeadline)

  const label =
    days > 1 ? `${days} days left` : days === 1 ? '1 day left' : days === 0 ? 'Due today' : 'Expired'

  const colorClass = days < 0 ? 'text-red-600' : days <= 2 ? 'text-amber-600' : 'text-stone-500'

  return <span className={`text-xs font-medium ${colorClass}`}>{label}</span>
}
