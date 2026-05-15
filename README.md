# Dashboard Challenge

## Getting Started

Install dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

The dashboard is split into independent sections for Weather, Tech News, and GitHub Trending. Each section fetches its own data, shows its own loading state, and handles its own errors, so one slow or failed API does not block the rest of the page. Shared fetch behavior lives in hooks, API requests live in services, and TypeScript types describe both the raw API responses and the cleaner data shapes used by the UI.

### Code Structure

```
app/
  page.tsx                 Main dashboard page
  layout.tsx               Root app layout and fonts
  globals.css              Global Tailwind/theme styles

components/
  weather/                 Weather dashboard section
  news/                    Hacker News section and story rows
  github/                  GitHub trending section and repository cards
  ui/                      Shared loading and error UI

hooks/
  useFetchData.ts          Shared section-level loading/error/data hook
  useNewsStory.ts          Per-story Hacker News loading hook

services/
  weather.ts               Open-Meteo API request and data mapping
  hacker-news.ts           Hacker News API requests and data mapping
  github.ts                GitHub API request and data mapping

types/
  weather.ts               Weather API and UI data types
  news.ts                  Hacker News API and UI data types
  github.ts                GitHub API and UI data types

shared/
  slow-fetch.ts            Adds the required artificial API delay
```

### Runtime Behavior

When the page loads, Weather, Tech News, and GitHub start loading independently instead of waiting for one combined request. If the GitHub API fails, only the GitHub panel shows an error while Weather and Tech News can still render normally. Hacker News is more granular: the section first loads story IDs, then each story row fetches its own details, so one failed story row does not break the rest of the list.
