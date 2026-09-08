export interface DemoOutfitDefinition {
  name: string
  /** References DemoItemDefinition.key values from demoItems.ts. */
  itemKeys: string[]
}

export const DEMO_OUTFITS: DemoOutfitDefinition[] = [
  {
    name: 'Everyday',
    itemKeys: ['white-oversized-shirt', 'straight-leg-jeans', 'leather-loafers'],
  },
  {
    name: 'Dinner',
    itemKeys: ['silk-slip-dress', 'gold-hoop-earrings', 'shoulder-bag'],
  },
  {
    name: 'Work',
    itemKeys: ['ribbed-knit-sweater', 'wide-leg-trousers', 'black-wool-coat'],
  },
]
