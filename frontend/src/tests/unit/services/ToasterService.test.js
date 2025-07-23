import { vi, describe, test, beforeEach } from "vitest";
import { expect } from "vitest";

// Mock muss vor dem Import des Services stehen
vi.mock("vue3-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    POSITION: {
      BOTTOM_CENTER: "bottom-center"
    }
  }
}));

import ToasterService from "@/services/ToasterService";
import { toast } from "vue3-toastify";

describe("ToasterService", () => {
  beforeEach(() => {
    // Mock-Funktionen vor jedem Test zurücksetzen
    vi.clearAllMocks();
  });

  test("Expect ToasterService.toastConfig to have correct default values", async () => {
    expect(ToasterService.toastConfig.autoClose).toBe(2000);
    expect(ToasterService.toastConfig.position).toBe("bottom-center");
    expect(ToasterService.toastConfig.limit).toBe(3);
  });

  test("Expect toast.error to be called if type error is specified", async () => {
    ToasterService.createToasterPopUp("error", "Error message");
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith("Error message", ToasterService.toastConfig);
  });

  test("Expect toast.success to be called if type success is specified", async () => {
    ToasterService.createToasterPopUp("success", "Success message");
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith("Success message", ToasterService.toastConfig);
  });

  test("Expect toast.info to be called if no type is specified", async () => {
    ToasterService.createToasterPopUp("", "Message without type");
    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith("Message without type", ToasterService.toastConfig);
  });

  test("Expect toast.error to be called for default error popup", async () => {
    ToasterService.createDefaultErrorPopUp();
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith("Ein unbekannter Fehler ist aufgetreten.", ToasterService.toastConfig);
  });
});