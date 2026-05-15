# Dashboard Challenge

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

The dashboard uses Client Components with a reusable `useFetchData` hook so each section can manage its own loading and error state independently. API-specific code lives in `services/`, while response and app data contracts live in `types/`, keeping components focused on rendering clean data. All external requests go through `slowFetch`, preserving the required artificial 2-3 second delay, and the Hacker News rows use `useNewsStory` so each story can load or fail independently.
