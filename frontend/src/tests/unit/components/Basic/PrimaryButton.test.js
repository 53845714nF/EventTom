import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import PrimaryButton from "@/components/Basic/PrimaryButton.vue";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";

describe("PrimaryButton", () => {

    test("Renders RouterLink if to is specified", async () => {
        expect(PrimaryButton).toBeTruthy();

        const wrapper = mount(PrimaryButton, { 
            props: {
                to: "/",
                text: "Test Button",
                type: PrimaryButtonTypes.GREEN,
            },
            global: {
                stubs: ["RouterLink"], // mocks vue internal components like RouterLink
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
            }
        });

        expect(wrapper.text()).toContain("Test Button");
    });

    test("Sets correct CSS classes", async () => {
        expect(PrimaryButton).toBeTruthy();

        const wrapper = mount(PrimaryButton, { 
            props: {
                text: "Test Button",
                type: PrimaryButton.GREEN,
            }
        });

        expect(wrapper.find('div').classes()).toContain("button-green");
        expect(wrapper.find('p').classes()).toContain("p-black");

        expect(wrapper.find('div').classes()).not.toContain("button-black");
        expect(wrapper.find('p').classes()).not.toContain("p-white");
    });
});