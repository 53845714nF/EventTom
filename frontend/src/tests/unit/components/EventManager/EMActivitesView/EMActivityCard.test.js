import { test, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";

import EMActivityCard from "@/components/EventManager/EMActivitiesView/EMActivityCard.vue";

describe("EMActivityCard", () => {
  test("Renders props correctly", async () => {
    const testActivity = {
      timestamp: "2021-10-10 10:10:10",
      user: "Max Mustermann",
      no_tickets: 2,
      event: "Event 1",
    };

    const wrapper = mount(EMActivityCard, {
      props: {
        activity: testActivity,
      },
    });

    expect(wrapper.find("p").text()).toContain(testActivity.timestamp);
    expect(wrapper.find("p").text()).toContain(testActivity.user);
    expect(wrapper.find("p").text()).toContain(testActivity.no_tickets);
    expect(wrapper.find("p").text()).toContain(testActivity.event);
  });
});
