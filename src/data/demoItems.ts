import type { ClothingCategory, ReturnStatus, Season } from '../types/item'

export interface DemoItemDefinition {
  key: string
  name: string
  category: ClothingCategory
  brand?: string
  color?: string
  season?: Season
  price?: number
  store?: string
  /** Relative to seeding time, so demo dates stay meaningful over time. */
  purchaseDaysOffset?: number
  returnDeadlineDaysOffset?: number
  returnStatus?: ReturnStatus
  /** Filename expected in src/data/images/. Falls back to no photo if missing. */
  imageFile?: string
}

export const DEMO_ITEMS: DemoItemDefinition[] = [
  {
    key: 'white-oversized-shirt',
    name: 'White Oversized Shirt',
    category: 'tops',
    brand: 'Everlane',
    color: 'White',
    season: 'all-season',
    price: 58,
    store: 'Everlane',
    imageFile: 'white-oversized-shirt.jpg',
  },
  {
    key: 'ribbed-knit-sweater',
    name: 'Ribbed Knit Sweater',
    category: 'tops',
    brand: 'Uniqlo',
    color: 'Cream',
    season: 'autumn',
    imageFile: 'ribbed-knit-sweater.jpg',
  },
  {
    key: 'straight-leg-jeans',
    name: 'Straight-Leg Jeans',
    category: 'bottoms',
    brand: "Levi's",
    color: 'Indigo',
    season: 'all-season',
    price: 89,
    imageFile: 'straight-leg-jeans.jpg',
  },
  {
    key: 'wide-leg-trousers',
    name: 'Wide-Leg Tailored Trousers',
    category: 'bottoms',
    brand: 'Massimo Dutti',
    color: 'Charcoal',
    season: 'autumn',
    imageFile: 'wide-leg-trousers.jpg',
  },
  {
    key: 'silk-slip-dress',
    name: 'Silk Slip Dress',
    category: 'dresses',
    brand: 'Reformation',
    color: 'Emerald',
    season: 'summer',
    price: 148,
    store: 'Reformation',
    imageFile: 'silk-slip-dress.jpg',
  },
  {
    key: 'black-wool-coat',
    name: 'Black Wool Coat',
    category: 'outerwear',
    brand: 'COS',
    color: 'Black',
    season: 'winter',
    price: 220,
    imageFile: 'black-wool-coat.jpg',
  },
  {
    key: 'denim-jacket',
    name: 'Denim Jacket',
    category: 'outerwear',
    brand: "Levi's",
    color: 'Light Blue',
    season: 'spring',
    price: 98,
    store: "Levi's Store",
    purchaseDaysOffset: -10,
    returnDeadlineDaysOffset: 4,
    returnStatus: 'considering',
    imageFile: 'denim-jacket.jpg',
  },
  {
    key: 'leather-loafers',
    name: 'Leather Loafers',
    category: 'shoes',
    brand: 'Clarks',
    color: 'Brown',
    season: 'spring',
    imageFile: 'leather-loafers.jpg',
  },
  {
    key: 'white-sneakers',
    name: 'White Leather Sneakers',
    category: 'shoes',
    brand: 'Veja',
    color: 'White',
    season: 'all-season',
    price: 140,
    store: 'Veja',
    purchaseDaysOffset: -3,
    returnDeadlineDaysOffset: 11,
    returnStatus: 'considering',
    imageFile: 'white-sneakers.jpg',
  },
  {
    key: 'shoulder-bag',
    name: 'Structured Shoulder Bag',
    category: 'bags',
    brand: 'Mango',
    color: 'Tan',
    imageFile: 'shoulder-bag.jpg',
  },
  {
    key: 'gold-hoop-earrings',
    name: 'Gold Hoop Earrings',
    category: 'accessories',
    color: 'Gold',
    imageFile: 'gold-hoop-earrings.jpg',
  },
  {
    key: 'wool-scarf',
    name: 'Wool Scarf',
    category: 'accessories',
    color: 'Grey',
    season: 'winter',
    price: 35,
    purchaseDaysOffset: -20,
    returnDeadlineDaysOffset: -6,
    returnStatus: 'returned',
    imageFile: 'wool-scarf.jpg',
  },
]
