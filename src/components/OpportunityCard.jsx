import Badge from './Badge'
import Button from './Button'

// Lookup object: maps an availability status to its label (conditional rendering pattern #4).
const STATUS = {
  available: { label: 'Places available' },
  full: { label: 'Fully booked' },
}

function formatDate(isoDate) {
  // Adding a time avoids off-by-one-day errors caused by UTC parsing.
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatPrice(price) {
  return price === 0 ? 'Free' : `${price.toLocaleString('en-US')} RWF`
}

export default function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
  const { id, title, category, city, date, description, capacity, price, featured } = opportunity
  const status = capacity > 0 ? 'available' : 'full'

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <Badge>{category}</Badge>
        {/* && pattern: the left side is always a boolean, never a number, so no stray 0 */}
        {featured && <Badge tone="featured">Featured</Badge>}
        {price === 0 && <Badge tone="free">Free</Badge>}
        {capacity === 0 && <Badge tone="danger">{STATUS.full.label}</Badge>}
      </div>

      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-forest-900">{title}</h3>

      <p className="mt-1 text-sm text-muted">
        <time dateTime={date}>{formatDate(date)}</time> &middot; {city}
      </p>

      <p className="mt-3 flex-1 text-sm text-ink">{description}</p>

      <dl className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-sm">
        <div>
          <dt className="sr-only">Price</dt>
          <dd className="font-semibold text-forest-900">{formatPrice(price)}</dd>
        </div>
        <div>
          <dt className="sr-only">Availability</dt>
          {/* ternary pattern: show the number of places only when some remain */}
          <dd className="text-muted">
            {capacity > 0 ? `${capacity} places left` : STATUS[status].label}
          </dd>
        </div>
      </dl>

      <Button
        variant={isSaved ? 'highlight' : 'secondary'}
        className="mt-4 w-full"
        aria-pressed={isSaved}
        aria-label={`${isSaved ? 'Unsave' : 'Save'} ${title}`}
        onClick={() => onToggleSave(id)}
      >
        {isSaved ? 'Unsave' : 'Save'}
      </Button>
    </article>
  )
}
