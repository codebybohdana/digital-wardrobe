import { db } from '../db/db'
import { createItem } from '../db/items'
import { createOutfit } from '../db/outfits'
import { isoDateOffset } from '../utils/dates'
import { DEMO_ITEMS } from './demoItems'
import { DEMO_OUTFITS } from './demoOutfits'
import { loadDemoImage } from './images'

export async function seedDemoDataIfEmpty(): Promise<void> {
  const [itemCount, outfitCount] = await Promise.all([db.items.count(), db.outfits.count()])

  if (itemCount > 0 || outfitCount > 0) {
    return
  }

  const idByKey = new Map<string, string>()

  for (const demoItem of DEMO_ITEMS) {
    const photo = demoItem.imageFile ? await loadDemoImage(demoItem.imageFile) : undefined

    const created = await createItem({
      name: demoItem.name,
      category: demoItem.category,
      brand: demoItem.brand,
      color: demoItem.color,
      season: demoItem.season,
      price: demoItem.price,
      store: demoItem.store,
      purchaseDate:
        demoItem.purchaseDaysOffset !== undefined ? isoDateOffset(demoItem.purchaseDaysOffset) : undefined,
      returnDeadline:
        demoItem.returnDeadlineDaysOffset !== undefined
          ? isoDateOffset(demoItem.returnDeadlineDaysOffset)
          : undefined,
      returnStatus: demoItem.returnStatus,
      photo,
    })

    idByKey.set(demoItem.key, created.id)
  }

  for (const demoOutfit of DEMO_OUTFITS) {
    const itemIds = demoOutfit.itemKeys
      .map((key) => idByKey.get(key))
      .filter((itemId): itemId is string => Boolean(itemId))

    if (itemIds.length < 2) continue

    await createOutfit({ name: demoOutfit.name, itemIds })
  }
}

export async function resetDemoData(): Promise<void> {
  await db.items.clear()
  await db.outfits.clear()
  await seedDemoDataIfEmpty()
}
