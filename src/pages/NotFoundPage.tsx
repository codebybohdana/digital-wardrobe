import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'

export function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      message="This page doesn't exist or may have moved."
      action={
        <Link to="/" className="bg-ink px-6 py-3 text-sm text-paper">
          Back to Home
        </Link>
      }
    />
  )
}
