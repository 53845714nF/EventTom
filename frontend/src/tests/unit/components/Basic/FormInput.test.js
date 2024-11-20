import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import FormInput from "@/components/Basic/FormInput.vue";

describe("FormInput", () => {

    test("Sets Props correctly", async () => {
        expect(FormInput).toBeTruthy();
        
        const wrapper = mount(FormInput, {
            props:{
                title: "Test Form Input",
                placeholder: "Test Placeholder",
                modelValue: "Test Model Value",
                type: "text",
            }
        });
        
        expect(wrapper.find('p').text()).toContain("Test Form Input");
        expect(wrapper.find('input').attributes().placeholder).toBe("Test Placeholder");
        expect(wrapper.find('input').attributes().type).toBe("text");
        expect(wrapper.find('input').attributes().value).toBe("Test Model Value");
    });
});