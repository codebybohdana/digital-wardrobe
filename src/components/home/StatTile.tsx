interface StatTileProps {
  value: string | number
  label: string
}

export function StatTile({ value, label }: StatTileProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-3xl font-semibold text-stone-900">{value}</span>
      <span className="text-xs text-stone-500">{label}</span>
    </div>
  )
}
