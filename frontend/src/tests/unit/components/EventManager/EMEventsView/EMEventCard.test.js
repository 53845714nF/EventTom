import { test, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";

import EMEventCard from "@/components/EventManager/EMEventsView/EMEventCard.vue";
import { getTestEvent } from "@/tests/utils/testUtils";

describe("EMEventCard", () => {
  test("Renders props correctly", async () => {
    const testEvent = getTestEvent();

    const wrapper = mount(EMEventCard, {
      props: {
        event: testEvent,
      },
    });

    expect(wrapper.find("h4").text()).toContain(testEvent.title);
    expect(wrapper.find("p").text()).toContain(testEvent.description);
  });
});
