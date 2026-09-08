import { useNavigate } from 'react-router-dom'

interface PageHeaderProps {
  title: string
  onBack?: () => void
}

export function PageHeader({ title, onBack }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center gap-3 border-b border-stone-200 px-4 py-4">
      <button
        type="button"
        onClick={onBack ?? (() => navigate(-1))}
        aria-label="Back"
        className="flex h-8 w-8 items-center justify-center rounded-full text-stone-600"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <h1 className="text-lg font-semibold text-stone-900">{title}</h1>
    </header>
  )
}
