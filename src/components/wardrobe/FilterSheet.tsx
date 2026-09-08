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

interface TextChipProps {
  label: string
  active: boolean
  onClick: () => void
}

function TextChip({ label, active, onClick }: TextChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b pb-0.5 text-sm transition-colors duration-200 active:opacity-60 ${
        active ? 'border-ink text-ink' : 'border-transparent text-ink-muted'
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
      <div className="flex flex-col gap-6">
        {brands.length > 0 && (
          <div>
            <p className="mb-3 text-xs tracking-[0.12em] text-ink-faint uppercase">Brand</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {brands.map((brand) => (
                <TextChip key={brand} label={brand} active={filters.brand === brand} onClick={() => toggleBrand(brand)} />
              ))}
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <div>
            <p className="mb-3 text-xs tracking-[0.12em] text-ink-faint uppercase">Color</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {colors.map((color) => (
                <TextChip key={color} label={color} active={filters.color === color} onClick={() => toggleColor(color)} />
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="mb-3 text-xs tracking-[0.12em] text-ink-faint uppercase">Season</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {(Object.keys(SEASON_LABELS) as Season[]).map((season) => (
              <TextChip
                key={season}
                label={SEASON_LABELS[season]}
                active={filters.season === season}
                onClick={() => toggleSeason(season)}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onChange({})}
            disabled={!hasActiveFilters}
            className="text-sm text-ink-muted underline underline-offset-4 disabled:opacity-30"
          >
            Clear
          </button>
          <button type="button" onClick={onClose} className="bg-ink px-6 py-2.5 text-sm text-paper">
            Done
          </button>
        </div>
      </div>
    </BottomSheet>
  )
}
