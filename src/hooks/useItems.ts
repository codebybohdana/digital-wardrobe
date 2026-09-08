import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import type { ClothingItem } from '../types/item'

export interface UseItemsResult {
  items: ClothingItem[]
  isLoading: boolean
}

export function useItems(): UseItemsResult {
  const items = useLiveQuery(() => db.items.toArray(), [])

  return {
    items: items ?? [],
    isLoading: items === undefined,
  }
}
