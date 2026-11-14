import { useId } from 'react'

// Labelled <select>. `options` is an array of strings, or of { value, label } objects.
export default function SelectField({ label, options, error, className = '', ...rest }) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1 block w-full rounded-md border bg-white px-3 py-2 text-sm text-ink shadow-xs focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest-700 ${error ? 'border-red-500' : 'border-slate-300'}`}
        {...rest}
      >
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const text = typeof option === 'string' ? option : option.label
          return (
            <option key={value} value={value}>
              {text}
            </option>
          )
        })}
      </select>
      {error ? (
        <p id={errorId} className="mt-1 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}
