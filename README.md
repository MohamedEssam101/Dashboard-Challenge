# Dashboard Challenge

## Getting Started

Install dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

# Dashboard Architecture
 
## Structure
 
- The dashboard is split into three independent sections: **Weather**, **Tech News**, and **GitHub Trending**
- Each section loads and fails independently — one broken API does not affect the others
- The page remains usable while data is still loading
## Service Layer
 
- Each section has its own dedicated service file
- API details and response mapping are kept outside UI components
- This keeps the UI layer clean and focused on presentation
## Hooks
 
- Each section uses a custom hook to call its service and manage state
- Hooks handle loading, error, and data state consistently
- No repeated state logic across components
## Tech News — Per-Row Fetching
 
- Each story row fetches its own details independently
- A slow or failed story only affects that individual row
- Other stories continue to load and display normally
 
