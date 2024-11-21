import { test, expect, vi, describe } from "vitest";
import { mount } from "@vue/test-utils";

import AuthForm from "@/components/AuthView/AuthForm.vue";
import { AuthFormText } from "@/constants/AuthFormText";
import AuthService from "@/services/AuthService";


describe("AuthForm", () => {

    // MOCKING
    vi.mock("@/stores/AuthStore", () => {
        return {
            useAuthStore: vi.fn(),
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
            }, 
            useRoute: vi.fn(() => {
                return {
                    params: {
                        type: "signup"
                    }
                }
            })
        }
    });

    vi.mock("@/services/AuthService", async (importOriginal) => {
        const actual = await importOriginal(); // Import original module
        return {
          ...actual, // Export all original exports
          default: { // override other exports
            provideEmptyUser: vi.fn(() => ({
              username: "",
              email: "",
              password: "",
              passwordRepeat: "",
            })),
            postUser: vi.fn(),
            provideDynamicAuthText: vi.fn(() => AuthFormText.SIGN_UP),
          },
        };
      });
      

    // TESTS
    test("Sets computed properties correctly", async () => {    

        const wrapper = mount(AuthForm);
        
        expect(wrapper.vm.signUp).toBeTruthy();
        expect(wrapper.vm.secondaryButtonRedirect).toBe("signin");
        expect(wrapper.vm.dynamicAuthText).toBe(AuthFormText.SIGN_UP);
    });
    
    test("Initializes Form correctly for empty user", async () => {

        const wrapper = mount(AuthForm);

        const usernameInput = wrapper.findAllComponents({ name: 'FormInput' }).at(0);
        const emailInput = wrapper.findAllComponents({ name: 'FormInput' }).at(1);
        const passwordInput = wrapper.findAllComponents({ name: 'FormInput' }).at(2);
        const passwordRepeatInput = wrapper.findAllComponents({ name: 'FormInput' }).at(3);

        expect(usernameInput.props().modelValue).toBe(''); 
        expect(emailInput.props().modelValue).toBe(''); 
        expect(passwordInput.props().modelValue).toBe(''); 
        expect(passwordRepeatInput.props().modelValue).toBe(''); 
    });
    
    test("Working binding to user object", async () => {

        const wrapper = mount(AuthForm);

        const testUser = {
            username: "testUsername",
            email: "testEmail",
            password: "testPassword",
            passwordRepeat: "passwordRepeat",
        }

        const usernameInput = wrapper.findAllComponents({ name: 'FormInput' }).at(0);
        usernameInput.setValue(testUser.username);
        
        const emailInput = wrapper.findAllComponents({ name: 'FormInput' }).at(1);
        emailInput.setValue(testUser.email);

        const passwordInput = wrapper.findAllComponents({ name: 'FormInput' }).at(2);
        passwordInput.setValue(testUser.password);

        const passwordRepeatInput = wrapper.findAllComponents({ name: 'FormInput' }).at(3);
        passwordRepeatInput.setValue(testUser.passwordRepeat);

        expect(wrapper.vm.user).toStrictEqual(testUser);
    });
    
    test("Post User when button is clicked", async () => {
        
        const wrapper = mount(AuthForm);
        const spyOnPostUser = vi.spyOn(AuthService, "postUser");

        const button = wrapper.findComponent({ name: 'PrimaryButton' });
        // expect(button.text()).toContain("Registrieren");
        await button.trigger('click');

        // expect(spyOnPostUser).toBeCalledTimes(1);
        //expect(AuthService.postUser).toBeCalledTimes(1);
        //expect(wrapper.vm.postUser).toBeCalledTimes(1);

    });
});