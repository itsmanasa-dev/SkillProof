"""SQLAlchemy database models.

New models added under `app/models/` should inherit from
`app.core.database.Base`. Import models here so SQLAlchemy metadata
is aware of them (needed for create_all / alembic autogenerate).
"""