import type { ReactNode } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40"
      />
      <div className="relative mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-4 pb-8">
        {title && <h2 className="mb-4 text-lg font-semibold text-stone-900">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
