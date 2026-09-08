import { SEASON_LABELS } from '../../constants/seasons'
import type { Season } from '../../types/item'
import { BottomSheet } from '../ui/BottomSheet'

export interface AdvancedFilters {
  brand?: string
  color?: string
  season?: Season
}

interface FilterSheetProps {
  open: boolean
  onClose: () => void
  brands: string[]
  colors: string[]
  filters: AdvancedFilters
  onChange: (filters: AdvancedFilters) => void
}

interface ChipProps {
  label: string
  active: boolean
  onClick: () => void
}

function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm ${
        active ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-600'
      }`}
    >
      {label}
    </button>
  )
}

export function FilterSheet({ open, onClose, brands, colors, filters, onChange }: FilterSheetProps) {
  const hasActiveFilters = Boolean(filters.brand || filters.color || filters.season)

  function toggleBrand(brand: string) {
    onChange({ ...filters, brand: filters.brand === brand ? undefined : brand })
  }

  function toggleColor(color: string) {
    onChange({ ...filters, color: filters.color === color ? undefined : color })
  }

  function toggleSeason(season: Season) {
    onChange({ ...filters, season: filters.season === season ? undefined : season })
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Filters">
      <div className="flex flex-col gap-5">
        {brands.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium text-stone-700">Brand</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Chip key={brand} label={brand} active={filters.brand === brand} onClick={() => toggleBrand(brand)} />
              ))}
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium text-stone-700">Color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <Chip key={color} label={color} active={filters.color === color} onClick={() => toggleColor(color)} />
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 text-sm font-medium text-stone-700">Season</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(SEASON_LABELS) as Season[]).map((season) => (
              <Chip
                key={season}
                label={SEASON_LABELS[season]}
                active={filters.season === season}
                onClick={() => toggleSeason(season)}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={() => onChange({})}
            disabled={!hasActiveFilters}
            className="flex-1 rounded-full border border-stone-300 py-2.5 text-sm font-medium text-stone-700 disabled:opacity-40"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-stone-900 py-2.5 text-sm font-medium text-white"
          >
            Done
          </button>
        </div>
      </div>
    </BottomSheet>
  )
}
