import { describe } from "vitest";
import { expect } from "vitest";
import AuthService from "@/services/AuthService";
import { AuthFormText } from "@/constants/AuthFormText";
import { ref } from "vue";

describe("AuthService validating User Input", () => {

    test("Expect Correct AuthForm text to be returned", async () => {    
        expect(AuthService.provideDynamicAuthText(true)).toBe(AuthFormText.SIGN_UP);
        expect(AuthService.provideDynamicAuthText(false)).toBe(AuthFormText.SIGN_IN);
    });

    test("Expect empty user object to be returned", async () => {
        const expectedUser = {
            username: "",
            email: "",
            password: "",
            passwordRepeat: ""
        };
        const user = AuthService.provideEmptyUser();
        expect(user.value).toEqual(expectedUser);
    });

    test("Expect correct user signing up to be accepted", async () => {
        const testUser = ref({
            username: "testName",
            email: "test@mail.com",
            password: "testPassword",
            passwordRepeat: "testPassword"
        });

        const result = AuthService._checkIfInputValuesCorrect(testUser, true);

        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("Expect correct user singing in to be accepted", async () => {
        const testUser = ref({
            username: "testName",
            email: "",
            password: "testPassword",
            passwordRepeat: ""
        });

        const result = AuthService._checkIfInputValuesCorrect(testUser, false);

        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("Expect user signing up with empty values to be rejected", async () => {
        const testUser = ref({
            username: "",
            email: "",
            password: "",
            passwordRepeat: ""
        });

        const result = AuthService._checkIfInputValuesCorrect(testUser, true);

        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Keine leeren Felder erlaubt.");
    });

    test("Expect user signing up with different passwords to be rejected", async () => {
        const testUser = ref({
            username: "testName",
            email: "test@mail.com",
            password: "testPassword1",
            passwordRepeat: "testPassword2"
        });

        const result = AuthService._checkIfInputValuesCorrect(testUser, true);

        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Passwörter stimmen nicht überein.");
    });
    
    test("Expect user signing up with password < 8 characters to be rejected", async () => {
        const testUser = ref({
            username: "testName",
            email: "test@mail.com",
            password: "test123",
            passwordRepeat: "test123"
        });

        const result = AuthService._checkIfInputValuesCorrect(testUser, true);

        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Passwort zu kurz. Mindestens 8 Zeichen.");     
    });
});