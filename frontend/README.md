# EventTom Frontend

## Project Setup for Development

- Navigate inside frontend folder: `cd frontend`
- Install dependencies: `npm install` (run after each _git pull_)
- Run on your local machine in dev mode with hot-reload: `npm run dev`

## Building Project with Docker (Not necassary for development purposes)

- Navigate inside frontend folder: `cd frontend`
- Start Docker Desktop
- Create Image: `docker build -t frontend .`
- Run Container: `docker run -it -p 8080:80 --rm --name frontend-1 frontend`
- Active Container should now appear in Docker Desktop and is running on **localhost://8080**

## Design Best Practices

- Create your Views and Components according to the [Design Guideline](/frontend/src/assets/Design_Guideline.pdf)
- Use the [Color Variables](/frontend/src/assets/base.css)
- Basic styling classes which can be reused all accross the page are implemented inside the [main.css](/frontend/src/assets/main.css)

## Coding Best Practices

### Options API vs. Composition API

Vue3 uses the **Composition API**, where each component / view inside a .vue file ist made up of 3 different parts in a specific order:

1. The `<script setup>` - Tag, which contains logic such as API calls made by Services
2. The `<template>` - Tag, which describes the structure of the component / view itself (HTML)
3. The `<style scoped>` - Tag, which contains styling (CSS) for the elements of the `<template>`

Vue2 used to use the **Options API** (although it is still supported in Vue3). The Options API also follows the script, template and style structure, but it is less flexible than the Composition API and makes reusing code harder. This is, why we are going to use the **Composition API** in this project. For more info on Options vs Composition API see [this article](https://www.linkedin.com/pulse/vue-3-options-api-vs-composition-whats-difference-md-najmul-hasan/)

### App.vue

This is the main file, which should be as universal as possible. Different Views are rendered in here by the [Router](/frontend/src/router/index.js) inside the _RouterView_ Tag. It should:

- **NOT** contain a specific View
- **NOT** contain components specific to a View
- **NOT** contain API Calls
- Cpntain basic elements (such as header and footer) which are the same for every View
- Describe the basic structore of the website which applies to **every View**

### main.js

Main file of the project which initializes the App. **Don't make any changes here**.

### Components

Components are **small parts** of the UI (e.g. Buttons, Containers, etc.) which can be **reused** in different **Views** or **other components**. Components should ideally:

- contain no to minimal logic
- be placed inside the components folder: /frontend/src/components

New components are placed inside the [Components directory](/frontend/src/components/) and should be named after what they do and ideally have a fitting **suffix** such as "Event**Form**" or "Submit**Button**". If you have a component which is made up of multiple smaller components, place the relevant files inside a separate directory named after the parent component.

### Views

Views are **complete pages** for a certain topic (e.g. Where the user can see all events or where the Eventmanager can see recent activities). Views are rendered according to the path (e.g. /about or /user) by the [Router](/frontend/src/router/index.js) inside the _RouterView_ Tag of the [App.vue](/frontend/src/App.vue). Views Should:

- Use [Services](/frontend/src/services/) in the _script setup_ block to make API calls
- Render Different [Components](/frontend/src/components/) which make up the UI
- **Not** contain logic on itself which can be reused in other views -> make components or services / (controller) for that

New Views should be placed inside the [Views](/frontend/src/views/) directory and should append the **View**-suffix to its name e.g. "LandingPage**View**" or "CutomerManagement**View**".

### Services

Services contain API Calls and logic for a specific type of object from inside the database (e.g. User, Event, Voucher). Each Service is a class inside its own file and should only contain logic for the equivalent type of object. Services should ideally be used by Views only and **not** by components.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
