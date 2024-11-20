import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";

describe("Primary Button", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });
    
    // chill sebastian, das ist nur damit ich mich dran erinnere wie das geht
    
    // Components can also be mocked with a custom template like this:
    // vi.mock("vue-router", () => ({
    //     RouterLink: { 
    //         name: "RouterLink", 
    //         props: ["to"],
    //         template: "<a :href='to'><slot /></a>"},
    // }));

    test("Renders RouterLink if to is specified", async () => {
        expect(PrimaryButton).toBeTruthy();

        const wrapper = mount(PrimaryButton, { 
            props: {
                to: "/",
                text: "Test Button",
                type: PrimaryButtonTypes.GREEN,
            },
            global: {
                stubs: ["RouterLink"],
            },
        });
        
        expect(wrapper.findComponent({ name: "RouterLink" }).exists()).toBeTruthy();
    });
    
    test("Doesn't render RouterLink if no to is specified", async () => {
        expect(PrimaryButton).toBeTruthy();

        const wrapper = mount(PrimaryButton, { 
            props: {
                text: "Test Button",
                type: PrimaryButtonTypes.GREEN,
            },
            global: {
                stubs: ["RouterLink"],
            },
        });
    
        
        expect(wrapper.findComponent({ name: "RouterLink" }).exists()).toBeFalsy();
    });
    
    test("Renders correct text", async () => {
        expect(PrimaryButton).toBeTruthy();

        const wrapper = mount(PrimaryButton, { 
            props: {
                // to: "/", will render a RouterLink and therefore all child components (also p, where the text ist) won't be rendered because of the mock
                text: "Test Button",
                type: PrimaryButtonTypes.GREEN,
            },
            global: {
                stubs: ["RouterLink"],
            },
        });

        expect(wrapper.text()).toContain("Test Button");
    });
});