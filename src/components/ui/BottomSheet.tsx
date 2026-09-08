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
        className="absolute inset-0 bg-ink/30"
      />
      <div className="relative mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto bg-paper p-6 pb-10">
        {title && <h2 className="font-display mb-5 text-xl text-ink">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
