import { useState, type FormEvent } from 'react'
import { CATEGORY_LABELS } from '../../constants/categories'
import { SEASON_LABELS } from '../../constants/seasons'
import type { ClothingCategory, ClothingItem, Season } from '../../types/item'
import { validateItemForm, type ItemFormErrors } from '../../utils/validation'
import { DatePicker } from '../ui/DatePicker'
import { PhotoPicker } from './PhotoPicker'

export interface ItemFormSubmitValues {
  name: string
  category: ClothingCategory
  brand?: string
  color?: string
  season?: Season
  price?: number
  store?: string
  purchaseDate?: string
  returnDeadline?: string
  photo?: Blob
}

interface ItemFormValues {
  name: string
  category: ClothingCategory | ''
  brand: string
  color: string
  season: Season | ''
  price: string
  store: string
  purchaseDate: string
  returnDeadline: string
  photo?: Blob
}

interface ItemFormProps {
  initialItem?: ClothingItem
  submitLabel: string
  onSubmit: (values: ItemFormSubmitValues) => void | Promise<void>
  onCancel: () => void
}

function toFormValues(item?: ClothingItem): ItemFormValues {
  return {
    name: item?.name ?? '',
    category: item?.category ?? '',
    brand: item?.brand ?? '',
    color: item?.color ?? '',
    season: item?.season ?? '',
    price: item?.price !== undefined ? String(item.price) : '',
    store: item?.store ?? '',
    purchaseDate: item?.purchaseDate ?? '',
    returnDeadline: item?.returnDeadline ?? '',
    photo: item?.photo,
  }
}

const inputClass =
  'mt-1.5 w-full border-b border-line bg-transparent pb-2 text-sm text-ink focus:border-ink focus:outline-none'
const labelClass = 'text-xs tracking-[0.14em] text-ink-faint uppercase'

export function ItemForm({ initialItem, submitLabel, onSubmit, onCancel }: ItemFormProps) {
  const [values, setValues] = useState<ItemFormValues>(() => toFormValues(initialItem))
  const [errors, setErrors] = useState<ItemFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField<K extends keyof ItemFormValues>(key: K, value: ItemFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const validationErrors = validateItemForm({
      name: values.name,
      category: values.category,
      price: values.price,
      purchaseDate: values.purchaseDate,
      returnDeadline: values.returnDeadline,
    })
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        name: values.name.trim(),
        category: values.category as ClothingCategory,
        brand: values.brand.trim() || undefined,
        color: values.color.trim() || undefined,
        season: values.season || undefined,
        price: values.price !== '' ? Number(values.price) : undefined,
        store: values.store.trim() || undefined,
        purchaseDate: values.purchaseDate || undefined,
        returnDeadline: values.returnDeadline || undefined,
        photo: values.photo,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6 pb-28">
      <PhotoPicker photo={values.photo} onChange={(photo) => updateField('photo', photo)} />

      <div>
        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="e.g. White cotton shirt"
          className={inputClass}
        />
        {errors.name && <p className="mt-1.5 text-xs text-urgent">{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={values.category}
          onChange={(e) => updateField('category', e.target.value as ClothingCategory | '')}
          className={inputClass}
        >
          <option value="">Select category</option>
          {(Object.keys(CATEGORY_LABELS) as ClothingCategory[]).map((category) => (
            <option key={category} value={category}>
              {CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1.5 text-xs text-urgent">{errors.category}</p>}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelClass} htmlFor="brand">
            Brand
          </label>
          <input
            id="brand"
            type="text"
            value={values.brand}
            onChange={(e) => updateField('brand', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="color">
            Color
          </label>
          <input
            id="color"
            type="text"
            value={values.color}
            onChange={(e) => updateField('color', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="season">
          Season
        </label>
        <select
          id="season"
          value={values.season}
          onChange={(e) => updateField('season', e.target.value as Season | '')}
          className={inputClass}
        >
          <option value="">Not specified</option>
          {(Object.keys(SEASON_LABELS) as Season[]).map((season) => (
            <option key={season} value={season}>
              {SEASON_LABELS[season]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelClass} htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={values.price}
            onChange={(e) => updateField('price', e.target.value)}
            className={inputClass}
          />
          {errors.price && <p className="mt-1.5 text-xs text-urgent">{errors.price}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="store">
            Store
          </label>
          <input
            id="store"
            type="text"
            value={values.store}
            onChange={(e) => updateField('store', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelClass} htmlFor="purchaseDate">
            Purchase date
          </label>
          <DatePicker
            id="purchaseDate"
            label="Purchase date"
            value={values.purchaseDate}
            onChange={(date) => updateField('purchaseDate', date)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="returnDeadline">
            Return deadline
          </label>
          <DatePicker
            id="returnDeadline"
            label="Return deadline"
            value={values.returnDeadline}
            onChange={(date) => updateField('returnDeadline', date)}
          />
          {errors.returnDeadline && <p className="mt-1.5 text-xs text-urgent">{errors.returnDeadline}</p>}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md items-center justify-between border-t border-line bg-paper px-6 py-4">
        <button type="button" onClick={onCancel} className="text-sm text-ink-muted underline underline-offset-4">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-ink px-8 py-3 text-sm text-paper disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
