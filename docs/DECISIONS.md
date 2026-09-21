# Decisions Log

Record of architectural and technology decisions for SkillProof.

---

## Initial project setup

**Status:** Accepted (foundation)

### Frontend

| Decision            | Choice                                   |
| ------------------- | ---------------------------------------- |
| Framework           | React 19                                 |
| Build tool          | Vite 8                                   |
| Language            | TypeScript                               |
| Styling             | Tailwind CSS v4                          |
| Routing             | React Router                             |
| Linting             | ESLint                                   |
| Formatting          | Prettier                                 |

Future-ready (not installed yet): Motion, Three.js / React Three Fiber,
Monaco Editor, Recharts. These will be added only when a feature requires
them.

### Backend

| Decision    | Choice     |
| ----------- | ---------- |
| Framework   | FastAPI    |
| Language    | Python 3.13 |
| Validation  | Pydantic + Pydantic Settings |
| ORM         | SQLAlchemy 2.0 |
| Server      | Uvicorn    |

### Database

| Decision      | Choice                              |
| ------------- | ----------------------------------- |
| Engine        | PostgreSQL                          |
| Access layer  | SQLAlchemy 2.0 (declarative)        |

### Version Control

| Decision      | Choice          |
| ------------- | --------------- |
| Hosting       | GitHub          |
| Workflow      | `feature/*` branches + Pull Requests to `main` |

### Architecture

| Decision      | Choice                                 |
| ------------- | -------------------------------------- |
| Repository    | Monorepo with separated `frontend/` and `backend/` |
| Integration   | HTTP API contract (`docs/API_CONTRACT.md`) |
| Configuration | Environment variables (`.env`) per application |