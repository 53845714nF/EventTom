// src/services/CustomerService.js
export const fetchEvents = async () => {
    // Mock data for the events
    const mockData = [
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
      {
        id: 4,
        title: 'Wegz Party',
        description: 'Sei bereit',
        organizer: 'Name des Organisators',
        price: '120€',
        tickets: 21,
        available: true,
      },
    ];
  
    // Simulate an API call with a delay
    return new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
  };
  