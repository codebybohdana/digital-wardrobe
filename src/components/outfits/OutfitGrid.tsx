import type { ClothingItem } from '../../types/item'
import type { Outfit } from '../../types/outfit'
import { resolveOutfitItems } from '../../utils/outfits'
import { OutfitCard } from './OutfitCard'

interface OutfitGridProps {
  outfits: Outfit[]
  items: ClothingItem[]
}

export function OutfitGrid({ outfits, items }: OutfitGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {outfits.map((outfit) => (
        <OutfitCard key={outfit.id} outfit={outfit} previewItems={resolveOutfitItems(outfit.itemIds, items)} />
      ))}
    </div>
  )
}
