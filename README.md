# SkillProof

SkillProof is an AI-powered practical skill verification platform designed to
turn claimed skills into demonstrable evidence.

The long-term concept: **Claimed Skill → Practical Challenge → Candidate
Submission → Evaluation → Evidence → Verified Skill Profile**.

**Note:** This repository currently contains only the project foundation
(frontend, backend, infrastructure, and documentation). No product features
have been implemented yet.

## Project structure

```text
skillproof/
├── frontend/        # React application
├── backend/         # FastAPI application
├── docs/            # Architecture, API contract, development, decisions
├── .github/         # GitHub configuration
├── docker-compose.yml  # Local PostgreSQL
└── README.md
```

The frontend and backend are independent applications that communicate over a
shared HTTP API. See `docs/ARCHITECTURE.md` for details.

## Technology stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Frontend   | React, Vite, TypeScript, Tailwind CSS, React Router |
| Backend    | Python, FastAPI, Pydantic, SQLAlchemy               |
| Database   | PostgreSQL                                           |
| Infra      | Docker Compose (local PostgreSQL)                    |

## Local setup

Requirements: Node.js 20+, Python 3.13+, Docker.

### 1. Database

```bash
docker compose up -d
```

Runs PostgreSQL on `localhost:5432` (db `skillproof`, user/password
`skillproof`).

### 2. Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate   |   macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Verify: http://localhost:8000/health returns `{"status":"ok"}`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:5173 — the home page confirms the frontend is running
and shows the backend connection status.

## Development workflow

- `frontend/` and `backend/` each have their own README with further details.
- Work on `feature/*` branches and open Pull Requests against `main`.
- When the API changes, update `docs/API_CONTRACT.md`.

See `docs/DEVELOPMENT.md` for the full setup and workflow guide.


