# SkillProof Backend

FastAPI backend for SkillProof.

## Stack

- Python 3.13
- FastAPI
- Pydantic / Pydantic Settings
- SQLAlchemy 2.0
- PostgreSQL

## Project structure

```text
app/
├── api/
│   └── routes/     # API route definitions
├── core/
│   ├── config.py   # environment-based settings
│   └── database.py # SQLAlchemy engine, session, Base
├── models/         # SQLAlchemy models (added later)
├── schemas/        # Pydantic request/response schemas
├── services/       # business logic services (added later)
├── utils/          # shared helpers
└── main.py         # FastAPI app entry point
tests/              # pytest suite
```

## Getting started

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

Copy `.env.example` to `.env` and adjust values (see `app/core/config.py`).

Start PostgreSQL, then run:

```bash
uvicorn app.main:app --reload --port 8000
```

- API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Tests

```bash
pytest
```

## Adding database models

1. Create a model module under `app/models/`, inheriting from
   `app.core.database.Base`.
2. Import it in `app/models/__init__.py` so it is registered with the
   SQLAlchemy metadata.
3. Add matching Pydantic schemas under `app/schemas/`.
4. Add business logic under `app/services/` and expose it through routes
   under `app/api/routes/`.

## Environment variables

| Variable        | Default                                                  | Description                          |
| --------------- | -------------------------------------------------------- | ------------------------------------ |
| `DATABASE_URL`  | `postgresql+psycopg://skillproof:skillproof@localhost:5432/skillproof` | SQLAlchemy connection string |
| `SECRET_KEY`    | `change-me-in-production`                                | Secret used for signing tokens       |
| `CORS_ORIGINS`  | `http://localhost:5173`                                  | Allowed CORS origins                 |