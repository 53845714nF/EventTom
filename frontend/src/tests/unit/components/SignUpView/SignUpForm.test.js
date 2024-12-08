import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import SignUpForm from "@/components/SignUpView/SignUpForm.vue";
import AuthService from "@/services/AuthService";
import { createCorrectUserSignUp } from "../../../utils/testUtils";

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
        provideEmptySignUpUser: vi.fn(() => ({
          full_name: "",
          email: "",
          password: "",
          password_repeat: "",
        })),
        trySignUpUser: vi.fn(),
      },
    };
  });

  // TESTS

  test("Initializes Form correctly for empty user", async () => {
    const wrapper = mount(SignUpForm);

    const usernameInput = wrapper.findAllComponents({ name: "FormInput" }).at(0);
    const emailInput = wrapper.findAllComponents({ name: "FormInput" }).at(1);
    const passwordInput = wrapper.findAllComponents({ name: "FormInput" }).at(2);
    const passwordRepeatInput = wrapper.findAllComponents({ name: "FormInput" }).at(3);

    expect(usernameInput.props().modelValue).toBe("");
    expect(emailInput.props().modelValue).toBe("");
    expect(passwordInput.props().modelValue).toBe("");
    expect(passwordRepeatInput.props().modelValue).toBe("");
  });

  test("Working binding to user object", async () => {
    const wrapper = mount(SignUpForm);

    const testUser = createCorrectUserSignUp();

    const usernameInput = wrapper.findAllComponents({ name: "FormInput" }).at(0);
    usernameInput.setValue(testUser.value.full_name);

    const emailInput = wrapper.findAllComponents({ name: "FormInput" }).at(1);
    emailInput.setValue(testUser.value.email);

    const passwordInput = wrapper.findAllComponents({ name: "FormInput" }).at(2);
    passwordInput.setValue(testUser.value.password);

    const passwordRepeatInput = wrapper.findAllComponents({ name: "FormInput" }).at(3);
    passwordRepeatInput.setValue(testUser.value.password_repeat);

    expect(wrapper.vm.user).toStrictEqual(testUser.value);
  });

  test("Post User after clicking PrimaryButton", async () => {
    const wrapper = mount(SignUpForm);
    const spyOnPostUser = vi.spyOn(AuthService, "trySignUpUser");

    expect(spyOnPostUser).toHaveBeenCalledTimes(0);

    // simulate click on primary button
    await wrapper.find(".primary-button").trigger("click");

    expect(spyOnPostUser).toHaveBeenCalledTimes(1);
  });
});
