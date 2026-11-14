const TONES = {
  info: 'border-forest-700/30 bg-forest-50 text-forest-900',
  success: 'border-forest-700/40 bg-forest-100 text-forest-900',
  error: 'border-red-300 bg-red-50 text-red-900',
}

// role="alert" interrupts screen readers (for errors); role="status" is polite.
export default function Alert({ tone = 'info', title, children, actions }) {
  const role = tone === 'error' ? 'alert' : 'status'
  return (
    <div role={role} className={`rounded-lg border p-4 ${TONES[tone]}`}>
      {title ? <p className="font-semibold">{title}</p> : null}
      {children ? <div className="mt-1 text-sm">{children}</div> : null}
      {actions ? <div className="mt-3 flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  )
}
