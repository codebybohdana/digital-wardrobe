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
    <div>
      <header className="px-6 pt-10 pb-6">
        <p className="text-xs tracking-[0.2em] text-ink-muted uppercase">Returns</p>
        <p className="mt-2 max-w-[38ch] text-sm text-ink-muted">
          Return tracking is optional — only for the few pieces you're still deciding on.
        </p>
      </header>

      {isLoading ? (
        <div className="px-6 py-24 text-center text-sm text-ink-faint">Loading…</div>
      ) : trackedItems.length === 0 ? (
        <EmptyState
          title="Nothing to track"
          message="Add a return deadline when adding or editing an item to track it here."
        />
      ) : (
        <div className="flex flex-col gap-10 px-6 pb-10">
          {activeItems.length > 0 && (
            <section>
              <p className="text-xs tracking-[0.2em] text-ink-faint uppercase">Active</p>
              <div className="mt-2 flex flex-col divide-y divide-line border-t border-line">
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
              <p className="text-xs tracking-[0.2em] text-ink-faint uppercase">History</p>
              <div className="mt-2 flex flex-col divide-y divide-line border-t border-line">
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
