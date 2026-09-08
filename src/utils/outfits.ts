import type { ClothingItem } from '../types/item'

export function resolveOutfitItems(itemIds: string[], items: ClothingItem[]): ClothingItem[] {
  const itemsById = new Map(items.map((item) => [item.id, item]))

  return itemIds
    .map((id) => itemsById.get(id))
    .filter((item): item is ClothingItem => item !== undefined && item.returnStatus !== 'returned')
}
