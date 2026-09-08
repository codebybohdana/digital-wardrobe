import { useMemo } from 'react'
import { ReturnItemRow } from '../components/returns/ReturnItemRow'
import { EmptyState } from '../components/ui/EmptyState'
import { updateItem } from '../db/items'
import { useItems } from '../hooks/useItems'
import { hasReturnDeadline } from '../utils/returns'

export function ReturnsPage() {
  const { items, isLoading } = useItems()

  const trackedItems = useMemo(() => items.filter(hasReturnDeadline), [items])

  const activeItems = useMemo(
    () =>
      trackedItems
        .filter((item) => item.returnStatus === 'considering')
        .sort((a, b) => a.returnDeadline.localeCompare(b.returnDeadline)),
    [trackedItems],
  )

  const historyItems = useMemo(
    () =>
      trackedItems
        .filter((item) => item.returnStatus === 'returned')
        .sort((a, b) => b.returnDeadline.localeCompare(a.returnDeadline)),
    [trackedItems],
  )

  function handleKeep(id: string) {
    void updateItem(id, { returnStatus: 'keep' })
  }

  function handleReturn(id: string) {
    void updateItem(id, { returnStatus: 'returned' })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-stone-900">Returns</h1>
      <p className="mt-1 text-sm text-stone-500">
        Track return deadlines for recent purchases. This is optional — most wardrobe items don't need it.
      </p>

      {isLoading ? (
        <div className="py-24 text-center text-sm text-stone-400">Loading…</div>
      ) : trackedItems.length === 0 ? (
        <EmptyState
          title="Nothing to track"
          message="Add a return deadline when adding or editing an item to track it here."
        />
      ) : (
        <div className="mt-6 flex flex-col gap-8">
          {activeItems.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium text-stone-700">Active decisions</h2>
              <div className="flex flex-col gap-3">
                {activeItems.map((item) => (
                  <ReturnItemRow
                    key={item.id}
                    item={item}
                    onKeep={() => handleKeep(item.id)}
                    onReturn={() => handleReturn(item.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {historyItems.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium text-stone-700">History</h2>
              <div className="flex flex-col gap-3">
                {historyItems.map((item) => (
                  <ReturnItemRow key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
