import { useRef, useState } from 'react'

/**
 * Универсальный drag-and-drop для сортировки списка карточек/строк.
 * items — массив объектов с полем id, в исходном порядке.
 * onReorder(orderedIds) — вызывается при отпускании элемента.
 */
export function useDragReorder(items, onReorder) {
  const [order, setOrder] = useState(items.map((i) => i.id))
  const draggedId = useRef(null)

  // Синхронизируем локальный порядок, если список сцен/референсов изменился извне
  if (
    order.length !== items.length ||
    !order.every((id) => items.some((i) => i.id === id))
  ) {
    setOrder(items.map((i) => i.id))
  }

  const orderedItems = order
    .map((id) => items.find((i) => i.id === id))
    .filter(Boolean)

  function handleDragStart(id) {
    draggedId.current = id
  }

  function handleDragOverItem(overId) {
    if (!draggedId.current || draggedId.current === overId) return
    setOrder((prev) => {
      const from = prev.indexOf(draggedId.current)
      const to = prev.indexOf(overId)
      if (from === -1 || to === -1) return prev
      const next = [...prev]
      next.splice(from, 1)
      next.splice(to, 0, draggedId.current)
      return next
    })
  }

  function handleDragEnd() {
    draggedId.current = null
    onReorder(order)
  }

  return {
    orderedItems,
    draggedId,
    handleDragStart,
    handleDragOverItem,
    handleDragEnd,
  }
}
