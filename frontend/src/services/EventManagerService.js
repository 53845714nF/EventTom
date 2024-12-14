import AuthService from "./AuthService";
import axios from "axios";
import ToasterService from "./ToasterService";

export default class EventManagerService {
  // ### EMEventsView.vue
  static async getEventsForEventManager(eventManagerId, authStore) {
    const endpointExists = false;

    if (!endpointExists) {
      return [
        {
          title: "Event 1",
          description: "Description 1",
          tickets: 100,
          tickets_sold: 80,
        },
        {
          title: "Event 1",
          description: "Description 1",
          tickets: 100,
          tickets_sold: 88,
        },
        {
          title: "Event 1",
          description: "Description 1",
          tickets: 100,
          tickets_sold: 72,
        },
        {
          title: "Event 1",
          description: "Description 1",
          tickets: 100,
          tickets_sold: 90,
        },
        {
          title: "Event 2",
          description: "Description 2",
          tickets: 100,
          tickets_sold: 70,
        },
        {
          title: "Event 3",
          description: "Description 3",
          tickets: 100,
          tickets_sold: 10,
        },
      ];
    } else {
      await axios
        .post(`/api/v1/events/event-manager/${eventManagerId}`, {}, AuthService.getConfig(authStore.accessToken))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          ToasterService.createToasterPopUp("error", "Something went wrong while fetching the events.");
        });
    }
  }

  // ### TicketSalesCard.vue ###

  static getPercentageOfTicketsSold(no_tickets, sold) {
    return Math.round((sold / no_tickets) * 100);
  }

  // returns how many tickets are sold in relation to the threshold as a percentage
  static getPercentageOfTicketsSoldComparedToExpected(noTickets, noTicketsSold, threshold) {
    const expectedNoTicketsSold = noTickets * threshold;
    return Math.round(((noTicketsSold - expectedNoTicketsSold) / expectedNoTicketsSold) * 100);
  }

  static getHighlightClass(percentage) {
    if (percentage >= 10) {
      return { text: "highlight-red", bar: "bg-highlight-red" };
    } else if (percentage <= -10) {
      return { text: "highlight-green", bar: "bg-highlight-green" };
    } else {
      return { text: "white", bar: "bg-white" };
    }
  }

  static getComparisonText(percentage) {
    if (percentage < 0) {
      return "weniger";
    } else {
      return "mehr";
    }
  }
}
