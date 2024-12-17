import { expect, vi, describe, test, afterEach } from "vitest";
import AuthService from "@/services/AuthService";
import { Roles } from "@/constants/Roles";
import axios from "axios";
import ToasterService from "@/services/ToasterService";
import {
  createCorrectUserLogin,
  createEmptyLoginUser,
  createEmptySignUpUser,
  createAuthStoreLoggedOut,
  createAuthStoreLoggedInUser,
} from "../../utils/testUtils";

describe("AuthService validating User Input", () => {
  test("Expect empty sign up user object to be returned", async () => {
    const expectedUser = createEmptySignUpUser();
    const user = AuthService.provideEmptySignUpUser();
    expect(user).toEqual(expectedUser);
  });

  test("Expect empty login user object to be returned", async () => {
    const expectedUser = createEmptyLoginUser();
    const user = AuthService.provideEmptyLoginUser();
    expect(user).toEqual(expectedUser);
  });
});

describe("AuthService handling user data", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  vi.mock("axios", () => {
    return {
      default: {
        post: vi.fn(),
      },
    };
  });

  vi.mock("@/services/ToasterService", () => {
    return {
      default: {
        createToasterPopUp: vi.fn(),
      },
    };
  });

  test("Expect success toast if axios.post is successfull", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    const testUser = createCorrectUserLogin();
    const testStore = createAuthStoreLoggedOut();

    const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");

    await AuthService.tryLoginUser(testUser, testStore);

    expect(spyOnCreateToasterPopUp).toBeCalledWith("success", "Login erfolgreich!");
  });

  test.todo("Expect store to set role to correct initial role if postLoginData is successfull");

  test("Expect error toast if postLoginData is not successfull", async () => {
    axios.post.mockRejectedValue({ data: { success: false } });

    const testUser = createCorrectUserLogin();
    const testStore = createAuthStoreLoggedOut();

    const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");

    await AuthService.tryLoginUser(testUser, testStore);

    expect(spyOnCreateToasterPopUp).toBeCalledWith("error", "Falsche Email oder Passwort.");
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
    expect(spyOnCreateToasterPopUp).toBeCalledWith("success", "Logout erfolgreich!");
  });

  test("Expect error toast if testAccessToken is successfull", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    const testStore = createAuthStoreLoggedInUser();

    const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");

    await AuthService.testAccessToken(testStore);

    expect(spyOnCreateToasterPopUp).toBeCalledWith("success", `Token valid. Role: ${testStore.role}`);
    expect(spyOnCreateToasterPopUp).toBeCalledTimes(1);
  });

  test("Expect error toast if testAccessToken is not successfull", async () => {
    axios.post.mockRejectedValue({ data: { success: false } });

    const testStore = createAuthStoreLoggedInUser();

    const spyOnCreateToasterPopUp = vi.spyOn(ToasterService, "createToasterPopUp");

    await AuthService.testAccessToken(testStore);

    expect(spyOnCreateToasterPopUp).toBeCalledWith("error", "Token invalid.");
    expect(spyOnCreateToasterPopUp).toBeCalledTimes(1);
  });

  test("Expect correct config object to be returned", async () => {
    const mockStore = createAuthStoreLoggedInUser();

    const config = AuthService.getConfig(mockStore);

    expect(config).toEqual({
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${mockStore.accessToken}`,
      },
    });
  });
});
