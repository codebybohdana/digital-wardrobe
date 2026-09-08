import { daysRemaining } from '../../utils/dates'

interface DeadlineCountdownProps {
  returnDeadline: string
}

export function DeadlineCountdown({ returnDeadline }: DeadlineCountdownProps) {
  const days = daysRemaining(returnDeadline)

  const label =
    days > 1 ? `${days} days left` : days === 1 ? '1 day left' : days === 0 ? 'Due today' : 'Expired'

  const colorClass = days < 0 ? 'text-urgent' : days <= 2 ? 'text-caution' : 'text-ink-muted'

  return <span className={`text-xs ${colorClass}`}>{label}</span>
}
