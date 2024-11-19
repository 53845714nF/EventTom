import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import PrimaryButton from "@/components/Basic/PrimaryButton.vue";

describe("Primary Button", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });
    
    // Mock the router since it is required for the Button component  
    vi.mock("vue-router", async () => {
        return {
            RouterLink: { // Mock for RouterLink since it's not available in the test environment but used in the Button
            name: "RouterLink",
            props: ["to"], // Mock for props of RouterLink
            template: '<a :href="to"><slot /></a>', // Mock for template of RouterLink
            }
        };
    });

    test("Mount Button with correct Text", async () => {
        expect(PrimaryButton).toBeTruthy();

        // wrapper 
        const wrapper = mount(PrimaryButton, { 
            props: {
                to: "/",
                text: "Test Button",
                type: "green",
            },
        });

        expect(wrapper.text()).toContain("Test Button");
    });
});