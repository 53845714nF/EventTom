# EventTom Frontend

## Project Setup for Development

- Navigate inside frontend folder: `cd frontend`
- Install dependencies: `npm install` (run after each _git pull_)
- Run on your local machine in dev mode with hot-reload: `npm run dev`
- Run the backend container: `docker compose  --env-file .env up`

## Building Project with Docker (Not necassary for development purposes)

- Navigate inside frontend folder: `cd frontend`
- Start Docker Desktop
- Create Image: `docker build -t frontend .`
- Run Container: `docker run -it -p 8080:80 --rm --name frontend-1 frontend`
- Active Container should now appear in Docker Desktop and is running on **localhost://8080**

## Design Best Practices

### Basics

- Create your Views and Components according to the [Design Guideline](/frontend/src/assets/Design_Guideline.pdf)
- Use the [Color Variables](/frontend/src/assets/colors.css)
- Basic styling classes which can be reused all accross the page are implemented inside the [main.css](/frontend/src/assets/main.css). They can be used for Text, Margins, Containers, highlighting and much more.

### Icons

**FontAwesome**, an icon library, is integrated in this project. If you want to add a new icon, you can search for icons [here](https://fontawesome.com/icons). Make sure to only use **free icons** which are not marked as "*PRO*".

Adding icons is as simple as pasting the HTML code provided on the FontAwesome website inside the `<template>` like this:

```html
<template>
  <div class="icon-container">
    <i class="fa-solid fa-book"></i> <!--Book Icon-->
  </div>
</template>
```

## Coding Best Practices

### Options API vs. Composition API

Vue3 uses the **Composition API**, where each component / view inside a .vue file ist made up of 3 different parts in a specific order:

1. The `<script setup>` - Tag, which contains logic such as API calls made by Services
2. The `<template>` - Tag, which describes the structure of the component / view itself (HTML)
3. The `<style scoped>` - Tag, which contains styling (CSS) for the elements of the `<template>`

Vue2 used to use the **Options API** (although it is still supported in Vue3). The Options API also follows the script, template and style structure, but it is less flexible than the Composition API and makes reusing code harder. This is, why we are going to use the **Composition API** in this project. For more info on Options vs Composition API see [this article](https://www.linkedin.com/pulse/vue-3-options-api-vs-composition-whats-difference-md-najmul-hasan/)

### main.js

Main file of the project which initializes the App. **Don't make any changes here**.

### App.vue

This is the main file, which should be as universal as possible. Different Views are rendered in here by the [Router](/frontend/src/router/index.js) inside the _RouterView_ Tag. It should:

- **NOT** contain a specific View
- **NOT** contain components specific to a View
- **NOT** contain API Calls
- Cpntain basic elements (such as header and footer) which are the same for every View
- Describe the basic structore of the website which applies to **every View** such as the Header and Footer

### Views

Views are **complete pages** for a certain topic (e.g. Where the user can see all events or where the Eventmanager can see recent activities). Views are rendered according to the path (e.g. /about or /user) by the [Router](/frontend/src/router/index.js) inside the _RouterView_ Tag of the [App.vue](/frontend/src/App.vue). Views Should:

- Use [Services](/frontend/src/services/) in the _script setup_ block to make API calls
- Render Different [Components](/frontend/src/components/) which make up the UI
- **Not** contain logic on itself which can be reused in other views -> make components or services for that
- **Not** contain Header and Footer components

Every View should be structured the following way: It should contain a [PageTitleContainer](/frontend/src/components/Basic/PageTitleContainer.vue) and a div with `class="content-container"` which adds some padding to the content area and makes sure every page follows the design guidelines. A new View should look something like this:

**File:** `BookView.js`

```javascript
<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import BookList from "@/components/BookView/BookList.vue";
import OtherComponent from "@/components/BookView/OtherComponent.vue";

const myBooks = [
  { title: "Don Quixote", author: "Miguel de Cervantes" },
  { title: "Ulysses", author: "James Joyce" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];
</script>

<template>
  <PageTitleContainer title="My Books" />
  <div class="content-container">
    <BookList :books="myBooks" />
    <OtherComponent />
  </div>
</template>
```

New Views should be placed inside the [Views](/frontend/src/views/) directory and should append the **View**-suffix to its name e.g. "LandingPage**View**" or "CutomerManagement**View**". If a View is only accessible for a user with a specific role (e.g. Customer, Event Manager, Event Creator, Admin) it should be put in a separate directory named after the role of the user and should include an equivalent prefix in its filename:
- C -> Customer
- EM -> Event Manager
- EC -> Event Creator
- A -> Admin

**Example:** The View **EMEventsView** is only accessibe for Event Managers (EM) and is therefore placed inside a separate directory called **EventManager** and also includes the **EM** prefix in its filename (**EM**EventsView.vue).

### Components

Components are **small parts** of the UI (e.g. Buttons, Containers, etc.) which can be **reused** in different **Views** or **other components**. Components should ideally:

- contain no to minimal logic
- be placed inside the components folder: /frontend/src/components

New components are placed inside the [Components directory](/frontend/src/components/) and should be named after what they do and ideally have a fitting **suffix** such as "Event**Form**" or "Submit**Button**". If a component belongs to a certain View, make sure to put it in a directory named after the view. If Views are only accessible for a user with a specific role (e.g. Customer, EventManager, EventCreator, Admin), make sure to put the components for those Views inside a directory named after the Role of the user itself. Also make sure to add one of the following prefix to the filename of the component: 
- C -> Customer
- EM -> Event Manager
- EC -> Event Creator
- A -> Admin
If a component which is made up of more than 2 smaller components, place the relevant files inside a separate directory named after the parent component. 

**Example:** The View **EMEventsView** View contains the **EMEventCard** component. Since EMEventCard is part of the EMEventView, it should be placed inside a directory named *EMEventsView*. Since the EMEventsView View is only acessible for EventManagers, this directory itself should be put in a directory called **EventManager**. And since the EMEventCard ist part of a View for a user with a specific role, its filename should contain the equivalent prefix -> **EM**EventCard

To Pass information from a View to a component or from a component to another, you can use props. An example of how to define props for a component and how to pass them to another component is given here below. Here, the component "BookList" gets an Array of books from its View "BookView" (View above).

**File:** `BookList.js`

```javascript
<script setup>
import BookCard from "./BookCard.vue";

const props = defineProps({
  books: Array,
});
</script>

<template>
  <div class="book-list">
    <BookCard v-for="(book, index) in props.books" :key="index" :book="book">
    </BookCard>
  </div>
</template>
```

The "BookList" component can now loop through the Array of books and create a "BookCard" component for each book by passing a single book as props to the "BookCard" component. To show a variable as text inside a `<p>`-Tag, you can use two curly braces like this: `<p>{{ book.author }}</p>`

**File:** `BookCard.js`

```javascript
<script setup>
const props = defineProps({
  book: Object,
});
</script>

<template>
  <h3>{{ book.title }}</h3>
  <p>Written by: {{ book.author }}</p>
</template>

```

### Services

Services contain API Calls and / or logic for a specific View. Each Service is a class inside its own file and should **only** contain logic for the equivalent View. Services should be place inside the [services](/frontend/src/services/) directory.

Lets say we want the `BookView.js` View we defined above to render books we get from an API endpoint, then we could define a Service like this:

**File:** `BookService.js`

```javascript
import axios from "axios";

export default class BookService {
  static async getBooks(authStore) {
    let books = [];

    // config to make sure, user is authenticated
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${authStore.accessToken}`,
      },
    };

    // api call using axios
    await axios
      .get("/api/v1/books", {}, config)
      .then((response) => {
        books = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return books;
  }
}
```

Then, we need to make sure the books are loaded inside the View, when it is shown to the user. To do that, we use the `onBeforeMount()` Lifecycle Hook, which are defined by Vue.js itself. The `onBeforeMount()` Hook gets called, before a Component or View is _mounted_ e.g. shown to the user. You can read more about Lifecycle Hooks [here](https://vuejs.org/api/composition-api-lifecycle)

**File:** `BookView.js`

```javascript
<script setup>
import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";
import BookList from "@/components/BookView/BookList.vue";
import BookService from "@/services/BookService";
import { onBeforeMount, ref } from "vue";

const myBooks = ref([]);

onBeforeMount(async () => {
  myBooks.value = await BookService.getBooks();
});

</script>

<template>
  <PageTitleContainer title="My Books" />
  <div class="content-container">
    <BookList :books="myBooks" />
    <NewBookForm />
  </div>
</template>
```

By using `const myBooks = ref([])` we make sure, that myBooks is a reactive variable. When a reactive variable is used as props for a component, this component will be rendered again if the value of the reactive variable changes. This, means, we don't have to manually tell the component that we have new books, instead, it will just render again if the value of `myBooks` changes.

### Toast Notifications

**Toast Notifications** provide visual Feedback to the user. You can use the [ToasterService](/frontend/src/services/ToasterService.js) to create toast messages by yourself.

You could use it in the `getBooks()` Method from BookService to tell the user when something went wrong like this:

**File:** `BookService.js`

```javascript
import axios from "axios";
import ToasterService from "./ToasterService";

export default class BookService {
  static async getBooks(authStore) {
    let books = [];

    // config to make sure, user is authenticated
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${authStore.accessToken}`,
      },
    };

    // api call using axios
    await axios
      .get("/api/v1/books", {}, config)
      .then((response) => {
        books = response.data;
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp(
          "error",
          "Something went wrong while fetching your books.",
        );
      });

    return books;
  }
}
```

### Stores

Stores a way to store the state of the website (e.g. which user is logged in). We use [Pinia](https://pinia.vuejs.org) to implement stores in this project.

At the moment, we only use the [AuthStore](/frontend/src/stores/AuthStore.js) to store information about the user in the current session. You can use the AuthStore in any component or view by importing it and calling `useAuthStore()`. You can either access specific attributes directly or pass the store itself to services.

```javascript
<script setup>
  import AuthService from "@/services/AuthService"; const authStore =
  useAuthStore(); console.log(authStore.role) // access attributes directly
  AuthService.logoutUser(authStore) // pass store to Service
</script>
```

### Environmant Variables

You can find environment variables regarding the development process inside the **[DevVariables.js](/frontend/src/constants/DevVariables.js)** file. You can add new variables if it makes sense for development, just make sure that they don't compromise testing (`npm run test`).

### Testing

Tests are always put inside the [test directory](/frontend/src/tests/) which mimics the actual structure of the project. Make sure to put **Unit Tests** inside the `/tests/unit/` directory and **Integration Tests** inside the `/tests/integration` directory.

For testing, we use [vitest](https://vitest.dev), because it works well with **Vue3** and **vite**. Look inside existing tests to see how to use it.

Setup or Utility Functions for different test cases can be found inside `/tests/utils/testUtils.js`

You can run tests by running `npm run test`

To see test coverage run `npm run test:coverage`

### Linting and Formatting

To run linting using **ESLint**: `npm run lint`

To run formatting using **prettier**: `npm run format`
