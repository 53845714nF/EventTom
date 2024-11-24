import { test, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";

import SecondaryButton from "@/components/Basic/SecondaryButton.vue";
import { SecondaryButtonTypes } from "@/constants/ButtonTypes";

describe("SecondaryButton", () => {
  test("Renders RouterLink if to is specified", async () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        to: "/",
        text: "Test Button",
        type: SecondaryButtonTypes.WHITE,
      },
      global: {
        stubs: ["RouterLink"], // mocks vue internal components like RouterLink
      },
    });

    expect(wrapper.findComponent({ name: "RouterLink" }).exists()).toBeTruthy();
  });

  test("Doesn't render RouterLink if no to is specified", async () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: "Test Button",
        type: SecondaryButtonTypes.WHITE,
      },
      global: {
        stubs: ["RouterLink"],
      },
    });

    expect(wrapper.findComponent({ name: "RouterLink" }).exists()).toBeFalsy();
  });

  test("Renders correct text", async () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: "Test Button",
        type: SecondaryButtonTypes.WHITE,
      },
    });

    expect(wrapper.text()).toContain("Test Button");
  });

  test("Sets correct CSS classes", async () => {
    const wrapper = mount(SecondaryButton, {
      props: {
        text: "Test Button",
        type: SecondaryButtonTypes.WHITE,
      },
    });

    expect(wrapper.find("p").classes()).toContain("p-white");
    expect(wrapper.find("p").classes()).not.toContain("p-black");
  });
});
