import EventManagerService from "@/services/EventManagerService";
import { describe, test, expect } from "vitest";
describe("EventManagerService", () => {
  test("getPercentageOfTicketsSold() returns correct result", async () => {
    expect(EventManagerService.getPercentageOfTicketsSold(100, 80)).toBe(80);
    expect(EventManagerService.getPercentageOfTicketsSold(100, 20)).toBe(20);
    expect(EventManagerService.getPercentageOfTicketsSold(100, 0)).toBe(0);
    expect(EventManagerService.getPercentageOfTicketsSold(123, 76)).toBe(62);
  });

  test("getPercentageOfTicketsSoldComparedToExpected() returns correct result", async () => {
    expect(EventManagerService.getPercentageOfTicketsSoldComparedToExpected(100, 80, 0.8)).toBe(0);
    expect(EventManagerService.getPercentageOfTicketsSoldComparedToExpected(100, 88, 0.8)).toBe(10);
    expect(EventManagerService.getPercentageOfTicketsSoldComparedToExpected(100, 72, 0.8)).toBe(-10);
  });

  test("getHighlightClass() returns correct class given a percentage", async () => {
    expect(EventManagerService.getHighlightClass(0)).toStrictEqual({
      text: "white",
      bar: "bg-white",
    });
    expect(EventManagerService.getHighlightClass(9)).toStrictEqual({
      text: "white",
      bar: "bg-white",
    });
    expect(EventManagerService.getHighlightClass(-9)).toStrictEqual({
      text: "white",
      bar: "bg-white",
    });

    expect(EventManagerService.getHighlightClass(10)).toStrictEqual({
      text: "highlight-red",
      bar: "bg-highlight-red",
    });
    expect(EventManagerService.getHighlightClass(-10)).toStrictEqual({
      text: "highlight-green",
      bar: "bg-highlight-green",
    });
  });

  test("getComparisonText() returns correct text given a percentage", async () => {
    expect(EventManagerService.getComparisonText(0)).toBe("mehr");
    expect(EventManagerService.getComparisonText(1)).toBe("mehr");
    expect(EventManagerService.getComparisonText(10)).toBe("mehr");

    expect(EventManagerService.getComparisonText(-1)).toBe("weniger");
    expect(EventManagerService.getComparisonText(-10)).toBe("weniger");
  });
});
