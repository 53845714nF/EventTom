import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import EMTicketSalesCard from "@/components/EventManager/EMEventsView/EMTicketSalesCard.vue";
import { getTestEvent } from "@/tests/utils/testUtils";

describe("EMTicketSalesCard", () => {
  vi.mock("@/services/EventManagerService", async (importOriginal) => {
    const actual = await importOriginal(); // Import original module
    return {
      ...actual, // Export all original exports
      default: {
        // override other exports
        getPercentageOfTicketsSold: vi.fn(() => 100),
        getPercentageOfTicketsSoldComparedToExpected: vi.fn(() => 100),
        getHighlightClass: vi.fn(() => "highlight-red"),
        getComparisonText: vi.fn(() => "weniger"),
      },
    };
  });

  test("Renders props correctly", async () => {
    const testEvent = getTestEvent();

    const wrapper = mount(EMTicketSalesCard, {
      props: {
        event: testEvent,
      },
    });

    expect(wrapper.find("p").text()).toContain(testEvent.tickets_sold);
  });

  test("switchView() switches View correctly", async () => {
    const testEvent = getTestEvent();

    const wrapper = mount(EMTicketSalesCard, {
      props: {
        event: testEvent,
      },
    });

    expect(wrapper.find("p").text()).not.toContain(testEvent.tickets);

    await wrapper.find(".switch-view-button").trigger("click");

    expect(wrapper.find("p").text()).toContain(testEvent.tickets);
  });
});
