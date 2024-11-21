import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import EvenTomHeader from "@/components/Basic/EvenTomHeader.vue";
import { NavItems } from "@/constants/NavItems";

describe("EvenTomHeader", () => {
     
    // MOCKING
    vi.mock("@/stores/AuthStore", () => {
        return {
            useAuthStore: vi.fn(() => ({
                navItems: NavItems.USER,
            })),
        };
    });

    vi.mock(import("vue-router"), async (importOriginal) => {
        const actual = await importOriginal()
        return {
          ...actual,
            RouterLink: { 
                name: "RouterLink", 
                props: ["to"],
                template: "<a :href='to'> <slot /> </a>"
            }, // <slot /> is the placeholder for the content between the RouterLink tags and renders the text insider the RouterLink
        }
    })

    // TESTS
    test("Renders correctly", async () => {

        const wrapper = mount(EvenTomHeader, {
            global: {
                stubs: ["RouterLink"],
            },
        });
        expect(wrapper.find('h4').exists()).toBeTruthy();
        expect(wrapper.find('nav').exists()).toBeTruthy();
        expect(wrapper.findComponent({name: 'RouterLink'}).exists()).toBeTruthy();
        expect(wrapper.findComponent({name: 'PrimaryButton'}).exists()).toBeTruthy();
        
    });
    
    test("Renders correct navItems", async () => {
        
        const wrapper = mount(EvenTomHeader);

        // correct text in navItems
        expect(wrapper.text()).toContain("Events");
        expect(wrapper.text()).toContain("Gutscheine");

        // correct number of RouterLinks
        const navRouterLinks = wrapper.find('nav').findAllComponents({name: 'RouterLink'});
        expect(navRouterLinks).toHaveLength(NavItems.USER.items.length);
    });
});