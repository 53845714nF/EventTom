<template>
    <div>
      <main>
        <section class="event-page">
          <h1 class="title">Ansicht Kunde</h1>
          <div class="event-list">
            <div v-for="event in events" :key="event.id" class="event-card">
              <h2>{{ event.title }} <span>Preis pro Ticket: {{ event.price }}</span></h2>
              <p>{{ event.description }}</p>
              <p>Name des Organisators: {{ event.organizer }}</p>
              <button
                :class="event.available ? 'available' : 'sold-out'"
                :disabled="!event.available"
              >
                {{ event.available ? `Noch ${event.tickets} Tickets` : 'Ausverkauft' }}
              </button>
            </div>
          </div>
        </section>
      </main>
      <EvenTomFooter />
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';  
  // Define reactive data
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
    background-color: #38c172;
    color: white;
  }
  
  .sold-out {
    background-color: gray;
    color: white;
    cursor: not-allowed;
  }
  </style>
  