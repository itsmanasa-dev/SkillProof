# SkillProof Architecture

## Overview

SkillProof is split into two independent applications (frontend and backend)
that communicate over a shared HTTP API.

```text
Frontend (React + Vite + TS)
   ↓  HTTP / JSON
API (FastAPI — REST over HTTP)
   ↓  SQLAlchemy
Database (PostgreSQL)
```

## Components

### Frontend (`frontend/`)

- React 19 + Vite + TypeScript.
- Tailwind CSS for styling with a token-based design foundation.
- React Router for client-side routing.
- All backend communication goes through the centralized API client in
  `frontend/src/lib/api.ts`.
- Feature-specific API services will live in `frontend/src/services/`.

### Backend (`backend/`)

- FastAPI application exposing a REST API.
- Pydantic schemas for request/response validation.
- SQLAlchemy 2.0 for database access (PostgreSQL).
- Route handlers in `backend/app/api/routes/` stay thin and delegate to
  services in `backend/app/services/`.

### Database

- PostgreSQL, run locally via `docker-compose.yml` (`db` service).

## Integration boundary

The HTTP API contract (`docs/API_CONTRACT.md`) is the agreed boundary between
the two applications. Frontend and backend teams should agree on it before
implementing cross-cutting features.

## Directory layout

```text
skillproof/
├── frontend/   # React application (owner: Person 1)
├── backend/    # FastAPI application (owner: Person 2)
├── docs/       # shared documentation
├── docker-compose.yml  # local PostgreSQL
└── README.md
```

## Rules

- No backend logic in the frontend, and no frontend code in the backend.
- Business logic lives in services, not in route files or UI components.
- Configuration is provided through environment variables.
- No secrets are committed to the repository.