import type { ClothingItem } from '../types/item'

export type TrackedItem = ClothingItem & { returnDeadline: string }

export function hasReturnDeadline(item: ClothingItem): item is TrackedItem {
  return item.returnDeadline !== undefined
}
