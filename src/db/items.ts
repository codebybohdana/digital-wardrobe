import { db } from './db'
import type { ClothingItem } from '../types/item'

export type NewItemInput = Omit<ClothingItem, 'id' | 'createdAt' | 'updatedAt'>
export type ItemUpdateInput = Partial<Omit<ClothingItem, 'id' | 'createdAt' | 'updatedAt'>>

export async function createItem(input: NewItemInput): Promise<ClothingItem> {
  const now = new Date().toISOString()
  const item: ClothingItem = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
  await db.items.add(item)
  return item
}

export async function getItemById(id: string): Promise<ClothingItem | undefined> {
  return db.items.get(id)
}

export async function getAllItems(): Promise<ClothingItem[]> {
  return db.items.toArray()
}

export async function updateItem(id: string, changes: ItemUpdateInput): Promise<void> {
  await db.items.update(id, { ...changes, updatedAt: new Date().toISOString() })
}

export async function deleteItem(id: string): Promise<void> {
  await db.items.delete(id)
}
