import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import { useAuthStore } from "@/stores/AuthStore";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
import { Roles } from "@/constants/Roles";
import { createPinia, setActivePinia } from "pinia";
import { NavItems } from "@/constants/NavItems";
import { setLocalStorageItemsAndCreateAuthStore } from "@/tests/utils/testUtils";

describe("AuthStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("Initial Role set correctly", () => {
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    const store = setLocalStorageItemsAndCreateAuthStore(
      Roles.USER,
      "testToken",
    );

    expect(store.role).toBe(Roles.USER);
    expect(getItemSpy).toHaveBeenCalledWith(LocalStorageKeys.USER_ROLE);
  });

  test("Initial AccessToken set correctly", () => {
    const tokenValue = "testToken";
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    const store = setLocalStorageItemsAndCreateAuthStore(
      Roles.USER,
      tokenValue,
    );

    expect(store.accessToken).toBe(tokenValue);
    expect(getItemSpy).toHaveBeenCalledWith(LocalStorageKeys.ACCESS_TOKEN);
  });

  test("NavItems computed correctly after initialization for User", () => {
    const store = setLocalStorageItemsAndCreateAuthStore(
      Roles.USER,
      "testToken",
    );

    expect(store.navItems).toBe(NavItems.USER);
  });

  test("NavItems computed correctly after initialization for Eventcreator", () => {
    const store = setLocalStorageItemsAndCreateAuthStore(
      Roles.EVENT_CREATOR,
      "testToken",
    );

    expect(store.navItems).toBe(NavItems.EVENT_CREATOR);
  });

  test("NavItems computed correctly after initialization for Eventmanager", () => {
    const store = setLocalStorageItemsAndCreateAuthStore(
      Roles.EVENT_MANAGER,
      "testToken",
    );

    expect(store.navItems).toBe(NavItems.EVENT_MANAGER);
  });

  test("setRole() sets role correctly", () => {
    const initialRole = Roles.GUEST;
    const newRole = Roles.USER;
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const store = setLocalStorageItemsAndCreateAuthStore(
      initialRole,
      "testToken",
    );
    store.setRole(newRole);

    expect(store.role).toBe(newRole);
    expect(setItemSpy).toHaveBeenCalledWith(
      LocalStorageKeys.USER_ROLE,
      newRole,
    );
  });

  test("setAccessToken() sets accessToken correctly", () => {
    const initialToken = "initialToken";
    const newToken = "newToken";
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, initialToken);

    const store = useAuthStore();
    store.setAccessToken(newToken);

    expect(store.accessToken).toBe(newToken);
    expect(setItemSpy).toHaveBeenCalledWith(
      LocalStorageKeys.ACCESS_TOKEN,
      newToken,
    );
  });

  test("removeAccessToken() removed AccessToken correctly", () => {
    const initialToken = "initialToken";
    const removedToken = "";
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, initialToken);

    const store = useAuthStore();
    store.removeAccessToken();

    expect(store.accessToken).toBe(removedToken);
    expect(setItemSpy).toHaveBeenCalledWith(
      LocalStorageKeys.ACCESS_TOKEN,
      removedToken,
    );
  });
});
