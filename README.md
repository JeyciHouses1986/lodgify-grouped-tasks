# Lodgify Grouped Tasks Widget

Widget for displaying grouped tasks with progress tracking.

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- Pure CSS (no UI frameworks as requested)

## Running the Project

```bash
npm install
npm run dev
```

Should work out of the box. No environment variables or special setup needed.

The dev server runs on `http://localhost:5173/`

## Project Structure

```
src/
├── components/       # UI components (ProgressBar, TaskGroup, TaskCheckbox)
├── hooks/           # Custom hook for data fetching
├── types/           # TypeScript interfaces
├── utils/           # Helper functions (progress calculation)
└── App.tsx          # Main app component
```

## Implementation Notes

### Progress Calculation

The progress bar uses a normalized calculation based on task values. Following the formula from the requirements:

Nt = Vt × 100 / Σ(Vt)

Basically, each task has a weight (value), and we calculate what percentage of the total weight has been completed.

### State Management

Went with React hooks (`useState`, `useEffect`) since the app is relatively simple. Created a custom hook `useTasksData` to handle the API call and task toggling logic - keeps things clean and reusable.

### Styling

Everything was built from scratch with CSS to match the Figma design. No libraries :)

### Accessibility

I added keyboard navigation (Tab, Enter, Space), ARIA labels for screen readers, and proper focus indicators. The accordion pattern follows ARIA best practices.

## Things I'd Add With More Time

- Unit tests (probably with Vitest)
- localStorage to persist task state between sessions
- Better error states and retry logic
- Loading skeleton instead of just "Loading..."
- Maybe some animations for the accordion expand/collapse
