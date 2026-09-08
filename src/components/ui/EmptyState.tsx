import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  message: string
  action?: ReactNode
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 px-10 py-24 text-center">
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <p className="max-w-[32ch] text-sm text-ink-muted">{message}</p>
      {action}
    </div>
  )
}
