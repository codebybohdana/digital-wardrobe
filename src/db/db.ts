import Dexie, { type Table } from 'dexie'
import type { ClothingItem } from '../types/item'
import type { Outfit } from '../types/outfit'

export class WardrobeDB extends Dexie {
  items!: Table<ClothingItem, string>
  outfits!: Table<Outfit, string>

  constructor() {
    super('digital-wardrobe')
    this.version(1).stores({
      items: 'id, createdAt',
      outfits: 'id, createdAt',
    })
  }
}

export const db = new WardrobeDB()
