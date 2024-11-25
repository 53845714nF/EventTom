export default class EventManagerService {
  static getPercentageOfTicketsSoldComparedToExpected(actual, expected) {
    return ((actual - expected) / expected) * 100;
  }

  static getHighlightClass(percentage) {
    if (percentage >= 10) {
      return "highlight-red";
    } else if (percentage <= -10) {
      return "highlight-green";
    } else {
      return "";
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
