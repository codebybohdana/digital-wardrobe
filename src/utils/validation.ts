import type { ClothingCategory } from '../types/item'

export interface ItemFormInput {
  name: string
  category: ClothingCategory | ''
  price?: string
  purchaseDate?: string
  returnDeadline?: string
}

export interface ItemFormErrors {
  name?: string
  category?: string
  price?: string
  returnDeadline?: string
}

export function validateItemForm(input: ItemFormInput): ItemFormErrors {
  const errors: ItemFormErrors = {}

  if (!input.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!input.category) {
    errors.category = 'Category is required'
  }

  if (input.price !== undefined && input.price !== '') {
    const priceNumber = Number(input.price)
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      errors.price = 'Price must be 0 or greater'
    }
  }

  if (input.purchaseDate && input.returnDeadline && input.returnDeadline < input.purchaseDate) {
    errors.returnDeadline = 'Return deadline cannot be earlier than purchase date'
  }

  return errors
}
