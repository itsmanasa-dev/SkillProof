# Development Setup

This guide describes how to get SkillProof running locally from a fresh clone.

## Prerequisites

- Node.js 20+ (tested with Node 24)
- Python 3.13+
- Docker (for PostgreSQL)
- Git

## 1. Clone the repository

```bash
git clone <repository-url>
cd skillproof
```

## 2. Start PostgreSQL

PostgreSQL runs in Docker. From the repository root:

```bash
docker compose up -d
```

This starts a `skillproof` database on `localhost:5432` with:

- user: `skillproof`
- password: `skillproof`
- database: `skillproof`

Stop it with `docker compose down`.

> **Port already in use?** If `docker compose up -d` fails with
> `Bind for 0.0.0.0:5432 failed: port is already allocated`, another
> PostgreSQL instance is already running on your machine. Stop it (or change
> the host port in `docker-compose.yml` and the matching port in
> `DATABASE_URL`) and retry.

## 3. Configure the backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```bash
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

Create the environment file and adjust values if needed:

```bash
cp .env.example .env
```

## 4. Run the backend

```bash
uvicorn app.main:app --reload --port 8000
```

- API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## 5. Configure the frontend

```bash
cd frontend
npm install
```

Create the environment file:

```bash
cp .env.example .env.local
```

`VITE_API_URL` defaults to `http://localhost:8000`, matching the backend.

## 6. Run the frontend

```bash
npm run dev
```

The frontend is available at http://localhost:5173.

## Verification

With everything running:

1. Open http://localhost:5173 — the home page should load.
2. The home page shows the backend API status; it should read "Connected".
3. Open http://localhost:8000/health — it should return `{"status":"ok"}`.

## Commands reference

### Frontend (`frontend/`)

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Dev server on http://localhost:5173      |
| `npm run build`    | Type-check and build for production      |
| `npm run preview`  | Serve the production build               |
| `npm run lint`     | Lint with ESLint                         |
| `npm run format`   | Format with Prettier                     |

### Backend (`backend/`)

| Command                          | Description                  |
| -------------------------------- | ---------------------------- |
| `uvicorn app.main:app --reload`  | Dev server on :8000          |
| `pytest`                         | Run the test suite           |

## Development workflow

The repository is a two-person monorepo:

- `frontend/` — owner: Person 1
- `backend/` — owner: Person 2

Suggested workflow:

1. Create a `feature/<name>` branch from `main`.
2. Implement the change in the relevant directory.
3. Open a Pull Request against `main`.
4. The API contract in `docs/API_CONTRACT.md` is the integration boundary;
   update it when the API changes.