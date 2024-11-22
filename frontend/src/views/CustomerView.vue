<template>
    <!--For the general structure of a view, please refer to Views/AuthView.vue-->
    <div> <!-- This should be class="content-container"-->
      <main> <!-- We dont need a main tag-->
        <section class="event-page">
          <h1 class="title">Ansicht Kunde</h1> <!-- Please use the existing component (components/Basic/PageTitleContainer)-->
          <div class="event-list"> 
            <div v-for="event in events" :key="event.id" class="event-card">  <!-- Please extract this into a single component and call it "EventCard" or something like that-->
              <h2>{{ event.title }} <span>Preis pro Ticket: {{ event.price }}</span></h2>
              <p>{{ event.description }}</p>
              <p>Name des Organisators: {{ event.organizer }}</p>
              <button
                :class="event.available ? 'available' : 'sold-out'"
                :disabled="!event.available"
              > <!-- Please use the existing PrimaryButton component (type=black) (components/Basic/PrimaryButton)-->
                {{ event.available ? `Noch ${event.tickets} Tickets` : 'Ausverkauft' }}
              </button> <!-- Also this button should be on the right -->
            </div>
          </div>
        </section>
      </main>
      <EvenTomFooter /> <!-- You dont have to put the footer here since it is already rendered in App.vue-->
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';  
  // Define reactive data

  // This should be fetched from the backend
  // it is okay for now to have it hardcoded, but you should try to create a Service for the CustomerView which fetches the data from a mock api (see https://mockoon.com)
  const events = reactive([
    {
      id: 1,
      title: 'Summer Festival',
      description: 'Beschreibung des Events, wow was ein cooles Erlebnis',
      organizer: 'Name des Organisators',
      price: '38€',
      tickets: 69,
      available: true,
    },
    {
      id: 2,
      title: 'Noch so ein Event',
      description: 'Beschreibung des Events, wow was ein cooles Erlebnis',
      organizer: 'Name des Organisators',
      price: '38€',
      tickets: 69,
      available: true,
    },
    {
      id: 3,
      title: 'AlgoDat Prüfung',
      description: 'Ich mach mir in die Hose',
      organizer: 'Name des Organisators',
      price: '100h Freizeit',
      tickets: 0,
      available: false,
    },
  ]);
  </script>
  
  <style scoped>
  .event-page {
    padding: 20px;
  }
  
  .title {
    background-color: black;
    color: white;
    text-align: center;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .event-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .event-card {
    background-color: #d4ffcf;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .event-card h2 {
    font-size: 18px;
    margin: 0 0 10px 0;
  }
  
  .event-card p {
    margin: 5px 0;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .available {
    background-color: #38c172;  /* use the correct color variables from assets/base.css  (--cp-pastel-green) */
    color: white;
  }
  
  .sold-out {
    background-color: gray;
    color: white;
    cursor: not-allowed;
  }
  </style>
  