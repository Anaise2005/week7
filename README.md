# Rwanda Opportunities Explorer

A responsive React interface where learners can discover workshops, career events, community activities and short courses around Rwanda. Visitors can view, search, filter, sort and save opportunities, and add their own with a validated form.

Week 7 compulsory assignment, Advanced Frontend Web Development (React fundamentals).

> All listings are **fictional sample content**. There is no backend, database, `fetch` call or router.

**Live site:** _add your deployed URL here (optional)_

## Key features

- 14 sample opportunities across 5 categories and 5 Rwandan cities, with free/paid, featured/regular and full/available examples
- Live search by title or city (case-insensitive, extra spaces trimmed)
- Category filter, "Available only" and "Saved only" checkboxes, all working together
- Sort by earliest date, title A to Z, or most places available (sorting uses a copy, never mutates state)
- Result count, Reset filters button, and a helpful empty state with a reset action
- Save / Unsave on every card with a live saved count
- Controlled Add Opportunity form with validation messages, Clear form, and immutable insertion with a unique ID
- Loading and error states demonstrated with a local `demoStatus` switch
- Bonus: summary dashboard (total, available, featured, saved) calculated from existing data
- Accessible: labelled fields, correct button types, visible focus styles, skip link, semantic HTML

## Setup, run and build

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build into dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/
    Button.jsx, Badge.jsx, Alert.jsx, TextInput.jsx, SelectField.jsx, Checkbox.jsx   (reusable UI)
    OpportunityCard.jsx, OpportunityList.jsx, OpportunityFilters.jsx
    AddOpportunityForm.jsx, SummaryDashboard.jsx
  data/seedOpportunities.js
  App.jsx, main.jsx, index.css
```

## Components

| Component | Purpose |
| --- | --- |
| `Button`, `Badge`, `Alert`, `TextInput`, `SelectField`, `Checkbox` | Reusable, props-driven building blocks (from the Wednesday component library idea) |
| `OpportunityCard` | Shows one opportunity; receives data by props and reports Save/Unsave through `onToggleSave` |
| `OpportunityList` | Renders the cards with `map()` and stable `id` keys; handles loading, error and empty states with early returns |
| `OpportunityFilters` | Controlled search, category, sort and checkboxes; reports changes through `onChange` and `onReset` |
| `AddOpportunityForm` | Controlled form with validation; reports a valid new opportunity through `onAdd` |
| `SummaryDashboard` | Bonus counts derived from the data |

## Conditional rendering patterns used

1. Ternary: Save/Unsave label, places left vs fully booked, ready/loading text
2. `&&`: Featured, Free and Fully booked badges (left side is always a boolean, so no stray `0`)
3. `if` with early return: loading, error and empty states in `OpportunityList`
4. Lookup object: `STATUS` labels in `OpportunityCard`

## How state is handled

- `App` owns the data and all UI state with `useState`: opportunities, search, category, sort, checkboxes, saved IDs and demo status
- Visible results are **derived while rendering** (filter, then sort a copy); they are not stored in state
- Saved items are stored as IDs, so the saved flag stays with the right opportunity after sorting
- Updates are immutable: `[newItem, ...current]`, `filter()` and spread, never `push` or in-place `sort`

## Manual test checklist

- Search `kigali`, `KIGALI`, `  kigali  `: same results
- Category + Available only: both apply together
- Sort by title, then seats: order changes, saved cards stay saved
- Search `zzzz`: empty state with a Reset filters button
- Cards with 0 places show Fully booked, price 0 shows Free, no stray `0`
- Save, filter, unsave: counts and Saved only view stay correct
- Submit an empty form: messages appear and nothing is added
- Submit a valid form: new card appears without a reload
- Demo Loading and Error: messages appear; Ready restores the list
- Narrow phone width: no horizontal scrolling
