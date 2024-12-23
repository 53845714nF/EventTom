# EventTom

## Description
This repository contains prototype for project from the master study with the goal to manage events.
This project is not intended to run in production. If you want a good alternative then use [Pretix](https://github.com/pretix/pretix).

## Frontend

### Start Tests


## Backend
The Backend use teh FastAPI Framework and uses this [Template](https://github.com/fastapi/full-stack-fastapi-template) from the core devloper of FastAPI.

### Start Tests

```bash
docker compose down -v --remove-orphans
docker compose up -d db mailcatcher
cd backend/ 
source .venv/bin/activate
set -x POSTGRES_USER postgres
set -x POSTGRES_PASSWORD postgres
set -x POSTGRES_SERVER localhost
set -x POSTGRES_DB app 
set -x FIRST_SUPERUSER admin@me.com
set -x FIRST_SUPERUSER_PASSWORD admin1234
uv run bash scripts/prestart.sh
```

or use [act](https://github.com/nektos/act):

```bash
act -W .github/workflows/backend_ci.yml
```

### Format Code for Linting
```bash
cd backend/
source .venv/bin/activate
ruff format app
```

## Infrastructure