import { useState } from 'react'
import Alert from './Alert'
import Button from './Button'
import Checkbox from './Checkbox'
import SelectField from './SelectField'
import TextInput from './TextInput'

const EMPTY_FORM = {
  title: '',
  category: '',
  city: '',
  date: '',
  capacity: '',
  price: '',
  description: '',
  featured: false,
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

function validate(values) {
  const errors = {}

  if (values.title.trim() === '') errors.title = 'Enter a title.'
  else if (values.title.trim().length < 3) errors.title = 'The title must be at least 3 characters.'

  if (values.category === '') errors.category = 'Choose a category.'

  if (values.city.trim() === '') errors.city = 'Enter a city.'

  if (values.date === '') errors.date = 'Choose a date.'
  else if (!isValidDate(values.date)) errors.date = 'Enter a valid date.'

  if (values.capacity === '') errors.capacity = 'Enter the number of places (0 or more).'
  else if (!Number.isInteger(Number(values.capacity)) || Number(values.capacity) < 0)
    errors.capacity = 'Places must be a whole number, 0 or more.'

  if (values.price === '') errors.price = 'Enter a price in RWF (0 for free).'
  else if (Number.isNaN(Number(values.price)) || Number(values.price) < 0)
    errors.price = 'Price must be a number, 0 or more.'

  return errors
}

export default function AddOpportunityForm({ categories, cities, onAdd, onResetFilters }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [justAdded, setJustAdded] = useState(false)

  const categoryOptions = [{ value: '', label: 'Choose a category' }, ...categories]

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    // Clear the message for the field being edited.
    setErrors((current) => ({ ...current, [field]: undefined }))
    setJustAdded(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setJustAdded(false)
      return
    }

    onAdd({
      title: values.title.trim(),
      category: values.category,
      city: values.city.trim(),
      date: values.date,
      description: values.description.trim() || 'No description provided.',
      capacity: Number(values.capacity),
      price: Number(values.price),
      featured: values.featured,
    })
    setValues(EMPTY_FORM)
    setErrors({})
    setJustAdded(true)
  }

  function handleClear() {
    setValues(EMPTY_FORM)
    setErrors({})
    setJustAdded(false)
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <section aria-labelledby="add-heading" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 id="add-heading" className="font-display text-lg font-bold text-forest-900">
        Add an opportunity
      </h2>

      <form noValidate onSubmit={handleSubmit} className="mt-4 grid gap-4">
        {errorCount > 0 && (
          <Alert tone="error" title="Please fix the highlighted fields">
            {errorCount} {errorCount === 1 ? 'field needs' : 'fields need'} your attention. No opportunity was added.
          </Alert>
        )}

        {justAdded && (
          <Alert
            tone="success"
            title="Opportunity added"
            actions={
              <Button variant="secondary" onClick={onResetFilters}>
                Reset filters
              </Button>
            }
          >
            It is now in the list. If you can't see it, your filters may be hiding it.
          </Alert>
        )}

        <TextInput
          label="Title"
          value={values.title}
          error={errors.title}
          onChange={(event) => handleChange('title', event.target.value)}
        />
        <SelectField
          label="Category"
          options={categoryOptions}
          value={values.category}
          error={errors.category}
          onChange={(event) => handleChange('category', event.target.value)}
        />
        <TextInput
          label="City"
          list="city-options"
          value={values.city}
          error={errors.city}
          onChange={(event) => handleChange('city', event.target.value)}
        />
        <datalist id="city-options">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
        <TextInput
          label="Date"
          type="date"
          value={values.date}
          error={errors.date}
          onChange={(event) => handleChange('date', event.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Places available"
            type="number"
            min="0"
            step="1"
            value={values.capacity}
            error={errors.capacity}
            onChange={(event) => handleChange('capacity', event.target.value)}
          />
          <TextInput
            label="Price (RWF)"
            type="number"
            min="0"
            step="500"
            value={values.price}
            error={errors.price}
            hint="Enter 0 for free."
            onChange={(event) => handleChange('price', event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-ink">
            Description (optional)
          </label>
          <textarea
            id="description"
            rows={3}
            value={values.description}
            onChange={(event) => handleChange('description', event.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-ink shadow-xs focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest-700"
          />
        </div>

        <Checkbox
          label="Mark as featured"
          checked={values.featured}
          onChange={(event) => handleChange('featured', event.target.checked)}
        />

        <div className="flex flex-wrap gap-2">
          <Button type="submit">Add opportunity</Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear form
          </Button>
        </div>
      </form>
    </section>
  )
}
