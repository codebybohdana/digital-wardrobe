import type { ClothingItem } from '../../types/item'
import type { Outfit } from '../../types/outfit'
import { resolveOutfitItems } from '../../utils/outfits'
import { OutfitCard } from './OutfitCard'

interface OutfitGridProps {
  outfits: Outfit[]
  items: ClothingItem[]
}

const STAGGER_STEP_MS = 30
const STAGGER_CAP_MS = 300

export function OutfitGrid({ outfits, items }: OutfitGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-1.5 gap-y-8 px-6">
      {outfits.map((outfit, index) => (
        <div
          key={outfit.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${Math.min(index * STAGGER_STEP_MS, STAGGER_CAP_MS)}ms` }}
        >
          <OutfitCard outfit={outfit} previewItems={resolveOutfitItems(outfit.itemIds, items)} />
        </div>
      ))}
    </div>
  )
}
