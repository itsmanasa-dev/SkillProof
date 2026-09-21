# API Contract

This document is the integration boundary between the frontend and the
backend. Endpoints are added here as they are agreed upon during feature
development.

## Conventions

- Base URL: `http://localhost:8000` (configurable via `VITE_API_URL` on the
  frontend and `DATABASE_URL`/CORS settings on the backend).
- Content type: `application/json`.
- Errors follow the FastAPI `{ "detail": ... }` shape.

---

## Endpoint: GET /health

### Method

`GET`

### Request

No parameters.

### Response

```json
{
  "status": "ok"
}
```

### Errors

None.

---

## Template for future endpoints

```markdown
## Endpoint: METHOD /path

### Method

`METHOD`

### Request

(Body, path, and query parameters)

### Response

(Success response shape and status code)

### Errors

(Possible error status codes and payloads)
```