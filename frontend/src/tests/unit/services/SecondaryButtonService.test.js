import SecondaryButtonService from "@/services/SecondaryButtonService";
import { SecondaryButtonTypes } from "@/constants/ButtonTypes";
describe("SecondaryButtonService", () => {
    
    test("Provides correct text CSS class for given button type", async () => {    
        const expectedClass = SecondaryButtonService.provideTextCssClass(SecondaryButtonTypes.WHITE);
        expect(expectedClass).toBe("p-white");
    });
    
    test("Provides correct default text CSS class for no given button type", async () => {    
        const expectedClass = SecondaryButtonService.provideTextCssClass();
        expect(expectedClass).toBe("p-black");
    });
});