import { useId } from 'react'

const FIELD =
  'mt-1 block w-full rounded-md border bg-white px-3 py-2 text-sm text-ink shadow-xs focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest-700'

// Labelled input. Used for text, number, date and search fields.
export default function TextInput({ label, error, hint, className = '', ...rest }) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy || undefined}
        className={`${FIELD} ${error ? 'border-red-500' : 'border-slate-300'}`}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}
