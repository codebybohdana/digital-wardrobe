import type { ClothingItem } from '../../types/item'
import { usePhotoUrl } from '../../utils/image'
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder'

interface ItemPickerProps {
  items: ClothingItem[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

export function ItemPicker({ items, selectedIds, onToggle }: ItemPickerProps) {
  return (
    <div>
      <p className="text-xs tracking-[0.14em] text-ink-faint uppercase">{selectedIds.length} selected</p>
      <div className="mt-3 grid grid-cols-3 gap-x-1.5 gap-y-4">
        {items.map((item) => (
          <PickerTile
            key={item.id}
            item={item}
            selected={selectedIds.includes(item.id)}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface PickerTileProps {
  item: ClothingItem
  selected: boolean
  onToggle: () => void
}

function PickerTile({ item, selected, onToggle }: PickerTileProps) {
  const photoUrl = usePhotoUrl(item.photo)

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={item.name}
      className="flex flex-col items-start gap-1.5 text-left"
    >
      <div
        className={`aspect-3/4 w-full overflow-hidden bg-surface transition-opacity duration-200 ease-out ${
          selected ? 'opacity-100 ring-1 ring-inset ring-ink' : 'opacity-45'
        }`}
      >
        {photoUrl ? (
          <img src={photoUrl} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <PhotoPlaceholder iconClassName="h-6 w-6" />
        )}
      </div>
      <p className="w-full truncate text-xs text-ink-muted">{item.name}</p>
    </button>
  )
}
