export default class EventManagerService {
  // ### TicketSalesCard.vue ###

  static getPercentageOfTicketsSold(no_tickets, sold) {
    return Math.round((sold / no_tickets) * 100);
  }

  // returns how many tickets are sold in relation to the threshold as a percentage
  static getPercentageOfTicketsSoldComparedToExpected(
    noTickets,
    noTicketsSold,
    threshold,
  ) {
    const expectedNoTicketsSold = noTickets * threshold;
    return Math.round(
      ((noTicketsSold - expectedNoTicketsSold) / expectedNoTicketsSold) * 100,
    );
  }

  // static getPercentageOfTicketsSoldComparedToExpected(actual, expected) {
  //   return Math.round(((actual - expected) / expected) * 100);
  // }

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
