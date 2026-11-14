import { useState } from 'react'
import AddOpportunityForm from './components/AddOpportunityForm'
import Button from './components/Button'
import OpportunityFilters from './components/OpportunityFilters'
import OpportunityList from './components/OpportunityList'
import SummaryDashboard from './components/SummaryDashboard'
import { CATEGORIES, CITIES, seedOpportunities } from './data/seedOpportunities'

// Each sorter is used on a COPY of the array, so state is never mutated.
const SORTERS = {
  date: (a, b) => a.date.localeCompare(b.date),
  title: (a, b) => a.title.localeCompare(b.title),
  seats: (a, b) => b.capacity - a.capacity,
}

function createId() {
  const unique =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${performance.now().toString(36).replace('.', '')}`
  return `opp-${unique}`
}

export default function App() {
  const [opportunities, setOpportunities] = useState(seedOpportunities)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('date')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [savedIds, setSavedIds] = useState([])
  const [demoStatus, setDemoStatus] = useState('ready')

  const setters = {
    search: setSearch,
    category: setCategory,
    sort: setSort,
    availableOnly: setAvailableOnly,
    savedOnly: setSavedOnly,
  }

  function handleFilterChange(field, value) {
    setters[field](value)
  }

  function resetFilters() {
    setSearch('')
    setCategory('all')
    setSort('date')
    setAvailableOnly(false)
    setSavedOnly(false)
  }

  function toggleSave(id) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    )
  }

  function addOpportunity(fields) {
    const newOpportunity = { id: createId(), ...fields }
    setOpportunities((current) => [newOpportunity, ...current])
  }

  // Derived data: calculated while rendering, never stored in state.
  const query = search.trim().replace(/\s+/g, ' ').toLowerCase()

  const filtered = opportunities.filter((item) => {
    const matchesSearch =
      query === '' || item.title.toLowerCase().includes(query) || item.city.toLowerCase().includes(query)
    const matchesCategory = category === 'all' || item.category === category
    const matchesAvailable = !availableOnly || item.capacity > 0
    const matchesSaved = !savedOnly || savedIds.includes(item.id)
    return matchesSearch && matchesCategory && matchesAvailable && matchesSaved
  })

  const visible = [...filtered].sort(SORTERS[sort])

  const categories = [...new Set([...CATEGORIES, ...opportunities.map((item) => item.category)])]

  return (
    <>
      <a
        href="#results"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-10 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-forest-900"
      >
        Skip to results
      </a>

      <header className="bg-forest-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            Rwanda Opportunities Explorer
          </h1>
          <p className="mt-3 max-w-2xl text-forest-100">
            Workshops, career events, community activities and short courses across Rwanda. Search, filter and save
            the ones you want to attend.
          </p>
          <p className="mt-4 inline-block rounded-md bg-sun-400 px-3 py-1 text-sm font-semibold text-ink">
            Sample content: all listings are fictional.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SummaryDashboard opportunities={opportunities} savedCount={savedIds.length} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid content-start gap-6">
            <OpportunityFilters
              search={search}
              category={category}
              sort={sort}
              availableOnly={availableOnly}
              savedOnly={savedOnly}
              categories={categories}
              onChange={handleFilterChange}
              onReset={resetFilters}
            />

            <section aria-label="UI state demo" className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>Demo state:</span>
              {['ready', 'loading', 'error'].map((state) => (
                <Button
                  key={state}
                  variant={demoStatus === state ? 'primary' : 'secondary'}
                  aria-pressed={demoStatus === state}
                  onClick={() => setDemoStatus(state)}
                >
                  {state === 'ready' ? 'Ready' : state === 'loading' ? 'Loading' : 'Error'}
                </Button>
              ))}
            </section>

            <section id="results" aria-labelledby="results-heading" className="scroll-mt-4">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="results-heading" className="font-display text-xl font-bold text-forest-900">
                  Opportunities
                </h2>
                <p aria-live="polite" className="text-sm text-muted">
                  {demoStatus === 'ready'
                    ? `Showing ${visible.length} of ${opportunities.length} opportunities`
                    : 'Demo state active'}
                  {' · '}
                  {savedIds.length} saved
                </p>
              </div>

              <OpportunityList
                items={visible}
                savedIds={savedIds}
                onToggleSave={toggleSave}
                onResetFilters={resetFilters}
                status={demoStatus}
                onRetry={() => setDemoStatus('ready')}
              />
            </section>
          </div>

          <aside>
            <AddOpportunityForm
              categories={categories}
              cities={CITIES}
              onAdd={addOpportunity}
              onResetFilters={resetFilters}
            />
          </aside>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 text-sm text-muted sm:px-6">
        Week 7 weekly assignment · React + Vite + Tailwind CSS
      </footer>
    </>
  )
}
