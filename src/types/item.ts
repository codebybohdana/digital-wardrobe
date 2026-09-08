export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'bags'
  | 'accessories'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'all-season'

export type ReturnStatus = 'considering' | 'keep' | 'returned'

export interface ClothingItem {
  id: string
  name: string
  category: ClothingCategory
  brand?: string
  color?: string
  season?: Season
  photo?: Blob
  price?: number
  store?: string
  purchaseDate?: string
  returnDeadline?: string
  returnStatus?: ReturnStatus
  createdAt: string
  updatedAt: string
}
