import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import LoginForm from "@/components/LoginView/LoginForm.vue";
import AuthService from "@/services/AuthService";
import { createCorrectUserLogin } from "../../../utils/testUtils";

describe("SingUpForm", () => {
  // MOCKING
  vi.mock("@/stores/AuthStore", () => {
    return {
      useAuthStore: vi.fn(),
    };
  });

  vi.mock(import("vue-router"), async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      RouterLink: {
        name: "RouterLink",
        props: ["to"],
        template: "<a :href='to'> <slot /> </a>",
      },
    };
  });

  vi.mock("@/services/AuthService", async (importOriginal) => {
    const actual = await importOriginal(); // Import original module
    return {
      ...actual, // Export all original exports
      default: {
        // override other exports
        provideEmptyLoginUser: vi.fn(() => ({
          email: "",
          password: "",
        })),
        tryLoginUser: vi.fn(),
      },
    };
  });

  // TESTS

  test("Initializes Form correctly for empty user", async () => {
    const wrapper = mount(LoginForm);

    const emailInput = wrapper.findAllComponents({ name: "FormInput" }).at(0);
    const passwordInput = wrapper.findAllComponents({ name: "FormInput" }).at(1);

    expect(emailInput.props().modelValue).toBe("");
    expect(passwordInput.props().modelValue).toBe("");
  });

  test("Working binding to user object", async () => {
    const wrapper = mount(LoginForm);

    const testUser = createCorrectUserLogin();

    const emailInput = wrapper.findAllComponents({ name: "FormInput" }).at(0);
    emailInput.setValue(testUser.value.email);

    const passwordInput = wrapper.findAllComponents({ name: "FormInput" }).at(1);
    passwordInput.setValue(testUser.value.password);

    expect(wrapper.vm.user).toStrictEqual(testUser.value);
  });

  test("Post User after clicking PrimaryButton", async () => {
    const wrapper = mount(LoginForm);
    const spyOnPostUser = vi.spyOn(AuthService, "tryLoginUser");

    expect(spyOnPostUser).toHaveBeenCalledTimes(0);

    // simulate click on primary button
    await wrapper.find(".primary-button").trigger("click");

    expect(spyOnPostUser).toHaveBeenCalledTimes(1);
  });
});
