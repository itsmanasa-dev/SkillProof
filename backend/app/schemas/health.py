from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Response payload for the GET /health endpoint."""

    status: str