import { vi } from "vitest";
import ToasterService from "@/services/ToasterService";
import { expect } from "vitest";

describe("ToasterService", () => {
    
    vi.mock("@meforma/vue-toaster", () => {
        return {
            createToaster: vi.fn(() => {
                return {
                    duration: 2000,
                    position: "bottom",
                    maxToasts: 3,
                    error: vi.fn(),
                    success: vi.fn(),
                    info: vi.fn()
                }
            })
        };
    });

    test("Expect Toasterservice.toaster to be created on startup", async () => {    
        expect(ToasterService.toaster.duration).toBe(2000);
        expect(ToasterService.toaster.position).toBe("bottom");
        expect(ToasterService.toaster.maxToasts).toBe(3);
    });

    test("Expect ToasterService.toaster.error to be called if type error is specified", async () => {    
        const spyError = vi.spyOn(ToasterService.toaster, 'error');
        ToasterService.createToasterPopUp('error', 'Error message');
        expect(spyError).toHaveBeenCalledTimes(1);
    });
    
    test("Expect ToasterService.toaster.info to be called if no type is specified", async () => {    
        const spyInfo = vi.spyOn(ToasterService.toaster, 'info');
        ToasterService.createToasterPopUp('', 'Message without type');
        expect(spyInfo).toHaveBeenCalledTimes(1);
    });
});