# SkillProof Frontend

React + Vite + TypeScript frontend for SkillProof.

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS v4
- React Router
- ESLint
- Prettier

## Getting started

```bash
npm install
```

Copy `./.env.example` to `./.env.local` and adjust `VITE_API_URL` if needed:

```bash
cp .env.example .env.local
```

## Commands

```bash
npm run dev       # start the dev server on http://localhost:5173
npm run build     # type-check and build for production
npm run preview   # preview the production build
npm run lint      # lint with ESLint
npm run lint:fix  # lint and auto-fix
npm run format    # format with Prettier
```

## Project structure

```text
src/
├── assets/        # static assets imported by modules
├── components/
│   ├── ui/        # reusable primitive components (Button, Card, Input, ...)
│   ├── common/    # app-specific shared components
│   └── layout/    # page layout components (Header, Footer, AppLayout)
├── pages/         # route-level page components
├── routes/        # React Router route definitions
├── hooks/         # shared React hooks
├── services/      # feature API services (added later)
├── lib/           # low-level utilities (api client, ...)
├── types/         # shared TypeScript types
└── data/          # static/mock data (added later)
```

## API client

All backend communication is centralized in `src/lib/api.ts`. The backend base
URL is read from `VITE_API_URL` (defaults to `http://localhost:8000`).

## Environment variables

| Variable       | Description             | Default                 |
| -------------- | ----------------------- | ----------------------- |
| `VITE_API_URL` | Base URL of the backend | `http://localhost:8000` |
