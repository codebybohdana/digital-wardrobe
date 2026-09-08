import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import type { Outfit } from '../types/outfit'

export interface UseOutfitsResult {
  outfits: Outfit[]
  isLoading: boolean
}

export function useOutfits(): UseOutfitsResult {
  const outfits = useLiveQuery(() => db.outfits.toArray(), [])

  return {
    outfits: outfits ?? [],
    isLoading: outfits === undefined,
  }
}
