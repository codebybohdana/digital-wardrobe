import { db } from './db'
import type { Outfit } from '../types/outfit'

export type NewOutfitInput = Omit<Outfit, 'id' | 'createdAt' | 'updatedAt'>
export type OutfitUpdateInput = Partial<Omit<Outfit, 'id' | 'createdAt' | 'updatedAt'>>

export async function createOutfit(input: NewOutfitInput): Promise<Outfit> {
  const now = new Date().toISOString()
  const outfit: Outfit = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
  await db.outfits.add(outfit)
  return outfit
}

export async function getOutfitById(id: string): Promise<Outfit | undefined> {
  return db.outfits.get(id)
}

export async function getAllOutfits(): Promise<Outfit[]> {
  return db.outfits.toArray()
}

export async function updateOutfit(id: string, changes: OutfitUpdateInput): Promise<void> {
  await db.outfits.update(id, { ...changes, updatedAt: new Date().toISOString() })
}

export async function deleteOutfit(id: string): Promise<void> {
  await db.outfits.delete(id)
}
