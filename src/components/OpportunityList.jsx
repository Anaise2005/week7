import Alert from './Alert'
import Button from './Button'
import OpportunityCard from './OpportunityCard'

// Early-return pattern (#3): handle each non-"ready" UI state first, then render the list.
export default function OpportunityList({ items, savedIds, onToggleSave, onResetFilters, status, onRetry }) {
  if (status === 'loading') {
    return (
      <div role="status" className="rounded-lg border border-slate-200 bg-white p-8 text-center text-muted">
        <p className="font-semibold text-forest-900">Loading opportunities&hellip;</p>
        <p className="mt-1 text-sm">This is a local demo of the loading state. No data is being fetched.</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <Alert
        tone="error"
        title="We couldn't load the opportunities"
        actions={<Button onClick={onRetry}>Back to ready</Button>}
      >
        This is a local demo of the error state. Switch back to ready to see the list again.
      </Alert>
    )
  }

  if (items.length === 0) {
    return (
      <Alert
        title="No opportunities match your search"
        actions={<Button onClick={onResetFilters}>Reset filters</Button>}
      >
        Try a different keyword, another category, or clear the checkboxes.
      </Alert>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((opportunity) => (
        <li key={opportunity.id}>
          <OpportunityCard
            opportunity={opportunity}
            isSaved={savedIds.includes(opportunity.id)}
            onToggleSave={onToggleSave}
          />
        </li>
      ))}
    </ul>
  )
}
