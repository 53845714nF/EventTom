# EventTom Frontend

## Project Setup for Development
- Navigate inside frontend folder: `cd frontend`
- Install dependencies: `npm install` (run after each *git pull*)
- Run on your local machine in dev mode with hot-reload: `npm run dev`


## Building Project with Docker (Not necassary for development purposes)
- Navigate inside frontend folder: `cd frontend`
- Start Docker Desktop
- Create Image: `docker build -t frontend .`
- Run Container: `docker run -it -p 8080:80 --rm --name frontend-1 frontend`
- Active Container should now appear in Docker Desktop and is running on **localhost://8080**


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).


