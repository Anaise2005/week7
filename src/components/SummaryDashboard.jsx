// Bonus: every number is calculated from existing data, nothing is stored separately.
export default function SummaryDashboard({ opportunities, savedCount }) {
  const total = opportunities.length
  const available = opportunities.filter((item) => item.capacity > 0).length
  const featured = opportunities.filter((item) => item.featured).length

  const stats = [
    { label: 'Total', value: total },
    { label: 'Available', value: available },
    { label: 'Featured', value: featured },
    { label: 'Saved', value: savedCount },
  ]

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <dt className="text-sm text-muted">{stat.label}</dt>
          <dd className="font-display text-2xl font-bold text-forest-900">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
