import Button from './Button'
import Checkbox from './Checkbox'
import SelectField from './SelectField'
import TextInput from './TextInput'

const SORT_OPTIONS = [
  { value: 'date', label: 'Earliest date' },
  { value: 'title', label: 'Title A to Z' },
  { value: 'seats', label: 'Most places available' },
]

// Fully controlled: every value comes in as a prop, every change goes out through onChange(field, value).
export default function OpportunityFilters({
  search,
  category,
  sort,
  availableOnly,
  savedOnly,
  categories,
  onChange,
  onReset,
}) {
  const categoryOptions = [
    { value: 'all', label: 'All categories' },
    ...categories.map((name) => ({ value: name, label: name })),
  ]

  return (
    <section aria-labelledby="filters-heading" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 id="filters-heading" className="font-display text-lg font-bold text-forest-900">
        Find an opportunity
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <TextInput
          label="Search by title or city"
          type="search"
          value={search}
          placeholder="e.g. kigali"
          onChange={(event) => onChange('search', event.target.value)}
          className="sm:col-span-3"
        />
        <SelectField
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={(event) => onChange('category', event.target.value)}
        />
        <SelectField
          label="Sort by"
          options={SORT_OPTIONS}
          value={sort}
          onChange={(event) => onChange('sort', event.target.value)}
        />
        <fieldset className="flex flex-col justify-end gap-2">
          <legend className="sr-only">Show only</legend>
          <Checkbox
            label="Available only"
            checked={availableOnly}
            onChange={(event) => onChange('availableOnly', event.target.checked)}
          />
          <Checkbox
            label="Saved only"
            checked={savedOnly}
            onChange={(event) => onChange('savedOnly', event.target.checked)}
          />
        </fieldset>
      </div>

      <div className="mt-4">
        <Button variant="secondary" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </section>
  )
}
