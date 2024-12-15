import TicketPurchaseService from "./TicketPurchaseService";

// Centralized mock data
// This array contains the mock data used for fetching event details.
// Centralizing it avoids duplication.
const mockData = [
  {
    id: 1,
    title: "Summer Festival",
    description: "Beschreibung des Events, wow was ein cooles Erlebnis",
    organizer: "Name des Organisators",
    price: 38,
    availableTickets: 69, // Tickets still available for purchase
  },
  {
    id: 2,
    title: "Noch so ein Event",
    description: "Beschreibung des Events, wow was ein cooles Erlebnis",
    organizer: "Name des Organisators",
    price: 38,
    availableTickets: 69,
  },
  {
    id: 3,
    title: "AlgoDat Prüfung",
    description: "Ich mach mir in die Hose",
    organizer: "Name des Organisators",
    price: 100,
    availableTickets: 0, // No tickets available for this event
  },
  {
    id: 4,
    title: "Wegz Party",
    description: "Sei bereit",
    organizer: "Name des Organisators",
    price: 120,
    availableTickets: 21,
  },
];
 // Fetches all events.
 // Simulates an API call by returning the mock data after a delay.
export const fetchEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 500); // Simulates a 500ms API delay
  });
};
 // Fetches details of a specific event by its ID.
 // Simulates an API call by searching the mock data for a matching event ID.
export const fetchEventById = async (eventId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockData.find((e) => e.id === Number(eventId)); // Find the event by ID
      event ? resolve(event) : reject(new Error("Event not found")); // Resolve if found, reject otherwise
    }, 500); // Simulates a 500ms API delay
  });
};
 // Validates a voucher code.
 // Uses the TicketPurchaseService to validate the voucher and return the response.
export const validateVoucher = async (voucherCode) => {
  try {
    const response = await TicketPurchaseService.validateVoucherCode(voucherCode); // Call the service to validate
    return response;  
  } catch (error) {
    console.error("Error validating voucher code:", error); // Log any errors
    return { valid: false, discount: 0 }; // Return a default invalid response in case of errors
  }
};
// Provides an empty form structure for ticket purchases for initializing the form data in components.
export const provideEmptyForm = () => {
  return {
    name: "",  
    address: "",  
    cityZip: "",  
    ticketCount: 1,  
    voucherCode: "",  
  };
};
