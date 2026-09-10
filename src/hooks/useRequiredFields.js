import { useMemo, useState } from 'react'

// Общая стилевая заготовка для подсветки невалидного поля —
// можно переопределить в месте использования, если нужно.
export const errorFieldStyle = { borderColor: 'var(--red)' }

/**
 * Универсальная валидация «обязательных полей» для форм в модалках.
 *
 * values          — текущее состояние формы, { field: value, ... }
 * requiredFields  — список ключей, которые не должны быть пустыми
 *
 * Пустым считается: пустая строка после trim(), либо falsy-значение
 * для не-строковых полей (0, null, undefined, false).
 */
export function useRequiredFields(values, requiredFields) {
  const [touched, setTouched] = useState({})

  const errors = useMemo(() => {
    const result = {}
    requiredFields.forEach((field) => {
      const value = values[field]
      result[field] = typeof value === 'string' ? !value.trim() : !value
    })
    return result
  }, [values, requiredFields])

  const isValid = useMemo(
    () => requiredFields.every((field) => !errors[field]),
    [errors, requiredFields]
  )

  // Отдельная функция-фабрика, чтобы можно было писать onBlur={markTouched('title')}
  function markTouched(field) {
    return () => setTouched((t) => ({ ...t, [field]: true }))
  }

  // Помечает все поля как "тронутые" — используем при попытке сабмита
  // с невалидной формой, чтобы подсветить сразу все ошибки.
  function touchAll() {
    setTouched(Object.fromEntries(requiredFields.map((f) => [f, true])))
  }

  function resetTouched() {
    setTouched({})
  }

  // Показывать ли ошибку конкретного поля прямо сейчас
  function showError(field) {
    return Boolean(touched[field] && errors[field])
  }

  return { errors, touched, isValid, markTouched, touchAll, resetTouched, showError }
}
