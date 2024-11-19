import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import PrimaryButton from "@/components/Basic/PrimaryButton.vue";

test("Mount Primary Button", async () => {
    expect(PrimaryButton).toBeTruthy();

    const wrapper = mount(PrimaryButton, {
        props: {
            to: "/",
            text: "Test Button",
            type: "green",
        },
    });

    expect(wrapper.text()).toContain("Test Button");
});