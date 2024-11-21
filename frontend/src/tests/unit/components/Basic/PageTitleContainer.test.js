import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import PageTitleContainer from "@/components/Basic/PageTitleContainer.vue";

describe("PageTitleContainer", () => {

    test("Renders text correctly", async () => {
        
        const wrapper = mount(PageTitleContainer, {
            props:{
                title: "Page Title Test",
            }
        });
        
        expect(wrapper.find('h2').exists()).toBeTruthy();
        expect(wrapper.text()).toContain("Page Title Test");
    });
});