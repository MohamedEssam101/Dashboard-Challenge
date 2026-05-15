# Dashboard Challenge

## Getting Started

Install dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture Explanation

The dashboard is split into three separate sections: Weather, Tech News, and GitHub Trending, because each API can load or fail at a different time. Each section has its own service file so API details and response mapping stay outside the UI components. The components use hooks to call those services and manage loading, error, and data state without repeating the same logic in every section. This keeps the page usable while data is still loading and prevents one failed API from breaking the whole dashboard. For Tech News, each story row fetches its own details so one slow or failed story only affects that row.
