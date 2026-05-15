# Dashboard Challenge

## Getting Started

Install dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

The dashboard is split into three separate sections: Weather, Tech News, and GitHub Trending. Each section has its own service file that handles the API request and prepares the data for the UI. The components use hooks to call those services and manage the loading, error, and data state. This keeps the sections independent, so if one API is slow or fails, the rest of the dashboard can still render normally. For Tech News, each story row fetches its own details, so one failed story only affects that row.
