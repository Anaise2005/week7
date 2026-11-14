const VARIANTS = {
  primary: 'bg-forest-700 text-white hover:bg-forest-900',
  secondary: 'bg-white text-forest-900 border border-forest-700/40 hover:bg-forest-50',
  ghost: 'text-forest-700 hover:bg-forest-50',
  highlight: 'bg-sun-400 text-ink hover:bg-sun-100 border border-sun-400',
}

// Reusable button. `type` defaults to "button" so it never submits a form by accident.
export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
