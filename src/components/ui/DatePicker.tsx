import { useMemo, useState } from 'react'
import { parseIsoDate, toIsoDateString } from '../../utils/dates'
import { BottomSheet } from './BottomSheet'

interface DatePickerProps {
  id?: string
  label: string
  value: string
  onChange: (value: string) => void
}

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function formatDisplayDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    parseIsoDate(value),
  )
}

function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
}

function isSameDate(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function DatePicker({ id, label, value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => (value ? parseIsoDate(value) : new Date()))

  const today = useMemo(() => new Date(), [])
  const selectedDate = value ? parseIsoDate(value) : undefined

  function openPicker() {
    setViewDate(value ? parseIsoDate(value) : new Date())
    setOpen(true)
  }

  function handleSelect(day: number) {
    onChange(toIsoDateString(new Date(viewDate.getFullYear(), viewDate.getMonth(), day)))
    setOpen(false)
  }

  function handleClear() {
    onChange('')
    setOpen(false)
  }

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = new Date(year, month, 1).getDay()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div>
      <button
        type="button"
        id={id}
        onClick={openPicker}
        className="mt-1.5 w-full border-b border-line bg-transparent pb-2 text-left text-sm text-ink focus:border-ink focus:outline-none"
      >
        {value ? formatDisplayDate(value) : <span className="text-ink-faint">Select date</span>}
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title={label}>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
            aria-label="Previous month"
            className="p-1 text-ink-muted transition-opacity duration-150 active:opacity-60"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <p className="text-sm text-ink">{formatMonthLabel(viewDate)}</p>
          <button
            type="button"
            onClick={() => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
            aria-label="Next month"
            className="p-1 text-ink-muted transition-opacity duration-150 active:opacity-60"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-y-2 border-t border-line pt-4 text-center">
          {WEEKDAY_LABELS.map((weekday) => (
            <span key={weekday} className="text-xs text-ink-faint">
              {weekday}
            </span>
          ))}

          {cells.map((day, index) => {
            if (day === null) {
              return <span key={`blank-${index}`} aria-hidden="true" />
            }

            const cellDate = new Date(year, month, day)
            const isSelected = selectedDate ? isSameDate(cellDate, selectedDate) : false
            const isToday = isSameDate(cellDate, today)

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleSelect(day)}
                aria-selected={isSelected}
                className={`mx-auto flex h-8 w-8 items-center justify-center text-sm transition-colors duration-150 ${
                  isSelected
                    ? 'bg-ink text-paper'
                    : isToday
                      ? 'text-ink underline underline-offset-4'
                      : 'text-ink hover:bg-surface'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="mt-5 text-sm text-ink-muted underline underline-offset-4"
          >
            Clear date
          </button>
        )}
      </BottomSheet>
    </div>
  )
}
