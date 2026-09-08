import type { ClothingCategory, ReturnStatus, Season } from './item'

export interface WardrobeFilters {
  query?: string
  category?: ClothingCategory
  brand?: string
  color?: string
  season?: Season
  status?: ReturnStatus
}
