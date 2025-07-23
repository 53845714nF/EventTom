import { vi, describe, test, beforeEach } from "vitest";
import ToasterService from "@/services/ToasterService";
import { expect } from "vitest";

describe("ToasterService", () => {
  let mockToast;

  beforeEach(() => {
    // Mock für vue3-toastify
    mockToast = {
      error: vi.fn(),
      success: vi.fn(),
      info: vi.fn(),
      POSITION: {
        BOTTOM_CENTER: "bottom-center"
      }
    };

    vi.mock("vue3-toastify", () => ({
      toast: mockToast
    }));
  });

  test("Expect ToasterService.toastConfig to have correct default values", async () => {
    expect(ToasterService.toastConfig.autoClose).toBe(2000);
    expect(ToasterService.toastConfig.position).toBe("bottom-center");
    expect(ToasterService.toastConfig.limit).toBe(3);
  });

  test("Expect toast.error to be called if type error is specified", async () => {
    ToasterService.createToasterPopUp("error", "Error message");
    expect(mockToast.error).toHaveBeenCalledTimes(1);
    expect(mockToast.error).toHaveBeenCalledWith("Error message", ToasterService.toastConfig);
  });

  test("Expect toast.success to be called if type success is specified", async () => {
    ToasterService.createToasterPopUp("success", "Success message");
    expect(mockToast.success).toHaveBeenCalledTimes(1);
    expect(mockToast.success).toHaveBeenCalledWith("Success message", ToasterService.toastConfig);
  });

  test("Expect toast.info to be called if no type is specified", async () => {
    ToasterService.createToasterPopUp("", "Message without type");
    expect(mockToast.info).toHaveBeenCalledTimes(1);
    expect(mockToast.info).toHaveBeenCalledWith("Message without type", ToasterService.toastConfig);
  });

  test("Expect toast.error to be called for default error popup", async () => {
    ToasterService.createDefaultErrorPopUp();
    expect(mockToast.error).toHaveBeenCalledTimes(1);
    expect(mockToast.error).toHaveBeenCalledWith("Ein unbekannter Fehler ist aufgetreten.", ToasterService.toastConfig);
  });
});