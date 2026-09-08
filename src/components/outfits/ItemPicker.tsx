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
      <p className="mb-2 text-sm font-medium text-stone-700">
        {selectedIds.length} selected
      </p>
      <div className="grid grid-cols-3 gap-3">
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
    <button type="button" onClick={onToggle} className="flex flex-col items-start gap-1 text-left">
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 bg-stone-100 ${
          selected ? 'border-stone-900' : 'border-transparent'
        }`}
      >
        {photoUrl ? (
          <img src={photoUrl} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <PhotoPlaceholder iconClassName="h-6 w-6" />
        )}
        {selected && (
          <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </div>
      <p className="w-full truncate text-xs text-stone-600">{item.name}</p>
    </button>
  )
}
