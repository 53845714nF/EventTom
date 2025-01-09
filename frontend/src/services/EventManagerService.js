import ToasterService from "./ToasterService";
import { authorizedApiClient } from "@/api/apiClient";

export default class EventManagerService {
  // ### EMEventsView.vue

  static async tryGetEventsForEventManager(eventManagerId, authStore) {
    try {
      const response = await EventManagerService.fetchEventsForEventManager(eventManagerId, authStore);

      if (!response.success) {
        ToasterService.createToasterPopUp("error", "Fehler beim Laden deiner Events.");
        return;
      }

      return response.data;
    } catch (error) {
      console.error(error);
      ToasterService.createDefaultErrorPopUp();
    }
  }

  static async fetchEventsForEventManager(eventManagerId, authStore) {
    return await authorizedApiClient
      .get(`/api/v1/events/manager/${eventManagerId}`)
      .then((response) => {
        return { success: true, data: response.data.data };
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Something went wrong while fetching the events.");
        return { success: false, data: [] };
      });
  }

  // ### TicketSalesCard.vue ###

  static getPercentageOfTicketsSold(no_tickets, sold) {
    return Math.round((sold / no_tickets) * 100);
  }

  // returns how many tickets are sold in relation to the threshold as a percentage
  static getPercentageOfTicketsSoldComparedToExpected(noTicketsSold, threshold) {
    return Math.round(((noTicketsSold - threshold) / threshold) * 100);
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

  // ### EMActivitiesView ###
  static async tryGetRecentActivties(limit, authStore) {
    try {
      const response = await EventManagerService.fetchRecentActivities(limit, authStore);

      if (!response.success) {
        ToasterService.createToasterPopUp("error", "Fehler beim Laden der Aktivitäten.");
        return;
      }

      return response.data;
    } catch (error) {
      ToasterService.createDefaultErrorPopUp();
      console.error(error);
    }
  }

  static async fetchRecentActivities(limit, authStore) {
    return await authorizedApiClient
      .get(`/api/v1/tickets/activities?limit=${limit}`)
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((error) => {
        console.log(error);
        return { success: false, data: [] };
      });
  }
}
