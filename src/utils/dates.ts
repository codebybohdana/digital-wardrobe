export function parseIsoDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00`)
}

export function toIsoDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    parseIsoDate(isoDate),
  )
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

export function daysRemaining(returnDeadline: string): number {
  const deadline = parseIsoDate(returnDeadline)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((deadline.getTime() - today.getTime()) / MS_PER_DAY)
}

export function isoDateOffset(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toIsoDateString(date)
}
