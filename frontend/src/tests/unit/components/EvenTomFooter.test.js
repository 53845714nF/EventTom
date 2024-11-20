import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import EvenTomFooter from "@/components/Basic/EvenTomFooter.vue";

describe("EvenTom Footer", () => {

    vi.mock("@/stores/AuthStore", () => {
        return {
            useAuthStore: vi.fn(),
        };
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("Renders correctly", async () => {
        expect(EvenTomFooter).toBeTruthy();

        const wrapper = mount(EvenTomFooter);
        expect(wrapper.find('p').exists()).toBeTruthy();
        expect(wrapper.find('p').text()).toContain("2024 EvenTom");
    });
});