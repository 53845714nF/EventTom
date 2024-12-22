import AuthService from "./AuthService";
import axios from "axios";
import ToasterService from "./ToasterService";

export default class EventManagerService {
  // ### EMEventsView.vue
  static async getEventsForEventManager(eventManagerId, authStore) {
        
    return await axios.get(`/api/v1/events/manager/${eventManagerId}`,{
      headers: AuthService.getAuthorizedConfig(authStore.accessToken)
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Something went wrong while fetching the events.");
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
}
