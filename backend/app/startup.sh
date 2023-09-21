#!/bin/sh

alembic upgrade head
python -m app.db.seed_v1
uvicorn app.main:app --host 0.0.0.0 --port 8080