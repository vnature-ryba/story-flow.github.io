export default function FieldError({ show, children = 'Обязательное поле' }) {
  if (!show) return null
  return (
    <p className="field-note" style={{ color: 'var(--red)', fontSize: '13px', marginTop: '5px' }}>
      {children}
    </p>
  )
}
