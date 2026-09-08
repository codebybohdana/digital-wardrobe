import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  message: string
  action?: ReactNode
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-8 py-24 text-center">
      <h2 className="text-lg font-medium text-stone-900">{title}</h2>
      <p className="text-sm text-stone-500">{message}</p>
      {action}
    </div>
  )
}
