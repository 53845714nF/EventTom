# EventTom

## Description
This repository contains prototype for project from the master study with the goal to manage events.
This project is not intended to run in production. If you want a good alternative then use [Pretix](https://github.com/pretix/pretix).

## Getting Started

### Keeping things up to date

You have to make sure all dependencies for the frontend are available, since they only get updated inside the `node_modules` folder and aren't available on your machine by default.
- Navigate inside frontend folder: `cd frontend`
- Install dependencies: `npm install` (run after each _git pull_)

Then you have to make sure the necessary docker images are on their latest version. To do that, you have to remove the old images from your machine before starting the application: 
- Run `docker image rm eventtom-backend eventtom-prestart eventtom-frontend -f`

### Starting the application

You have to start the frontend and backend separately:
- Run frontend on your local machine in dev mode with hot-reload: `npm run dev`
- Run the backend container: `docker compose  --env-file .env up`

### First steps

Now that the frontend and backend are running, you can head to your browser and visit `http://localhost:5173/`. This is the standard address where the frontend runs. To explore the functionalities you will need **4 differnt user types** (Admin, Customer, Eventcreator, Eventmanager) since they can access different parts of the application based on their role.

**Customer**
- You can create a new Customer by clicking on "Registrieren" on the landing page and filling out the form. You should be logged in as a customer immediately after that.
- A regular customer can do the following things
    - see events
    - see his vouchers
    - buy tickets for events (not implemented yet)

**Admin**
- By default, an admin account exists in the database. Use the following credentials to log in as an admin:
    - email: `admin@me.com` 
    - password: `admin1234` 
- You can use the admin account for the following things:
    - create new users (Eventcreator, Eventmanager, Admin)
    - delete users 
    - create new vouchers for customers (You need a regular customer account first)

**Eventmanager**
- Eventmanager accounts have to be created by an admin
- Eventmanagers can do the following things:
    - See the amount of sold tickets for events that they are assigned to
    - See recent customer activities (not implemented yet)

**Eventcreator**
- Eventcreator accounts have to be created by an admin
- Eventcreators can do the following things:
    - Create new events (You'll need an Eventmanager account to do that since there has to be a manager for every event)
    - Delete new events

After having created each of these accounts you should be ready to go. The accounts are kept after restarting the application. You could also create the accounts in the API Documentation available under `http://localhost:8000/docs`

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