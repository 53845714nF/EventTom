import { expect, vi, describe } from "vitest";
import AuthService from "@/services/AuthService";
import { AuthFormText } from "@/constants/AuthFormText";
import { ref } from "vue";
import { Roles } from "@/constants/Roles";
import { NavItems } from "@/constants/NavItems";
import axios from "axios";
import ToasterService from "@/services/ToasterService";
import { createCorrectUserSignUp, createEmptyUser, createCorrectUserSignIn, createUserWithPasswordsDontMatch, createUserWithPasswordTooShort, createAuthStoreLoggedOut, createAuthStoreLoggedInUser } from "../../utils/testUtils";

describe("AuthService validating User Input", () => {

    test("Expect Correct AuthForm text to be returned", async () => {    
        expect(AuthService.provideDynamicAuthText(true)).toBe(AuthFormText.SIGN_UP);
        expect(AuthService.provideDynamicAuthText(false)).toBe(AuthFormText.SIGN_IN);
    });

    test("Expect empty user object to be returned", async () => {
        const expectedUser = createEmptyUser();
        const user = AuthService.provideEmptyUser();
        expect(user).toEqual(expectedUser);
    });

    test("Expect correct user signing up to be accepted", async () => {
        const testUser = createCorrectUserSignUp();

        const result = AuthService._checkIfInputValuesCorrect(testUser, true);

        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("Expect correct user singing in to be accepted", async () => {
        const testUser = createCorrectUserSignIn();

        const result = AuthService._checkIfInputValuesCorrect(testUser, false);

        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("Expect user signing up with empty values to be rejected", async () => {
        const testUser = createEmptyUser();

        const result = AuthService._checkIfInputValuesCorrect(testUser, true);

        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Keine leeren Felder erlaubt.");
    });

    test("Expect user signing up with different passwords to be rejected", async () => {
        const testUser = createUserWithPasswordsDontMatch();

        const result = AuthService._checkIfInputValuesCorrect(testUser, true);

        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Passwörter stimmen nicht überein.");
    });
    
    test("Expect user signing up with password < 8 characters to be rejected", async () => {
        const testUser = createUserWithPasswordTooShort();

        const result = AuthService._checkIfInputValuesCorrect(testUser, true);

        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Passwort zu kurz. Mindestens 8 Zeichen.");     
    });

});

describe("AuthService handling user data", () => {

    afterEach(() => {
        vi.resetAllMocks(); 
    });

    vi.mock("axios", () => {
        return {
            default:{
                post: vi.fn(),
            }
        };
    });

    vi.mock("@/services/ToasterService", () => {
        return {
            default: {
                createToasterPopUp: vi.fn()
            }
        };
    });

    test("Expect success toast if axios.post is successfull", async () => {      

        axios.post.mockResolvedValue({ data: { success: true } });

        const testUser = createCorrectUserSignUp();
        const testStore = createAuthStoreLoggedOut();
        
        const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");

        await AuthService._postLoginData(testUser, "/test", testStore);

        expect(spyOnCreateToasterPopUp).toBeCalledWith("success", "Login erfolgreich!");
    });
    
    test("Expect store to set role to Roles.User if postLoginData is successfull", async () => {      

        axios.post.mockResolvedValue({ data: { success: true } });

        const testUser = createCorrectUserSignUp();
        const testStore = createAuthStoreLoggedOut();

        await AuthService._postLoginData(testUser, "/test", testStore);

        expect(testStore.role).toBe(Roles.USER);
    });
    
    test("Expect error toast if postLoginData is not successfull", async () => {

        axios.post.mockRejectedValue({ data: { success: false } });

        const testUser = createCorrectUserSignUp();
        const testStore = createAuthStoreLoggedOut();

        const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");

        await AuthService._postLoginData(testUser, "/test", testStore);

        expect(spyOnCreateToasterPopUp).toBeCalledWith('error', 'Falscher Username oder Passwort.');
        expect(spyOnCreateToasterPopUp).toBeCalledTimes(1);
    });

    test("Expect AuthStore token to be removed after AuthService.logoutUser is called", async () => {
        const testStore = createAuthStoreLoggedInUser();
        AuthService.logoutUser(testStore);
        expect(testStore.accessToken).toBe("");
    });
    
    test("Expect AuthStore role to be Roles.GUEST after AuthService.logoutUser is called", async () => {
        const testStore = createAuthStoreLoggedInUser();
        AuthService.logoutUser(testStore);
        expect(testStore.role).toBe(Roles.GUEST);
    });
    
    test("Expect ToasterService.createToasterPopUp to be called AuthService.logoutUser is called", async () => {
        const testStore = createAuthStoreLoggedInUser();
        const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");
        AuthService.logoutUser(testStore);
        expect(spyOnCreateToasterPopUp).toBeCalledWith('success', 'Logout erfolgreich!');
    });

   
    test("Expect error toast if testAccessToken is successfull", async () => {

        axios.post.mockResolvedValue({ data: { success: true } });

        const testStore = createAuthStoreLoggedInUser();

        const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");

        await AuthService.testAccessToken(testStore);

        expect(spyOnCreateToasterPopUp).toBeCalledWith('success', `Token valid. Role: ${testStore.role}`);
        expect(spyOnCreateToasterPopUp).toBeCalledTimes(1);
    });
    
    test("Expect error toast if testAccessToken is not successfull", async () => {

        axios.post.mockRejectedValue({ data: { success: false } });

        const testStore = createAuthStoreLoggedInUser();

        const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");

        await AuthService.testAccessToken(testStore);

        expect(spyOnCreateToasterPopUp).toBeCalledWith('error', 'Token invalid.');
        expect(spyOnCreateToasterPopUp).toBeCalledTimes(1);
    });

});