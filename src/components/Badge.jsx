const TONES = {
  neutral: 'bg-forest-50 text-forest-900 border-forest-100',
  featured: 'bg-sun-400 text-ink border-sun-400',
  free: 'bg-forest-700 text-white border-forest-700',
  danger: 'bg-red-50 text-red-800 border-red-200',
}

export default function Badge({ children, tone = 'neutral' }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}
