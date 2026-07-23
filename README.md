# RepoPulse AI — Frontend Dashboard

React + Vite + TypeScript frontend dashboard for RepoPulse AI, an AI-powered GitHub Repository Health Analyzer.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with dark mode aesthetics & glassmorphism components
- **Charts**: Recharts (Commit Velocity Line/Area Chart, Category Radar Chart, Language Pie Chart, Contributor Bar Chart)
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### 1. Installation

```bash
cd frontend
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Ensure `VITE_API_BASE_URL` points to your backend URL (default: `http://localhost:5000/api`).

### 3. Run Local Dev Server

```bash
npm run dev
```

The application will launch on `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
```
