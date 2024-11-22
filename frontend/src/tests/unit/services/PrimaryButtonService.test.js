import PrimaryButtonService from "@/services/PrimaryButtonService";
import { PrimaryButtonTypes } from "@/constants/ButtonTypes";
describe("PrimaryButtonService", () => {

    test("Provides correct div CSS class for given button type", async () => {    
        const expectedClass = PrimaryButtonService.provideDivCssClass(PrimaryButtonTypes.GREEN);
        expect(expectedClass).toBe("button-green");
    });
    
    test("Provides correct default div CSS class for no given button type", async () => {    
        const expectedClass = PrimaryButtonService.provideDivCssClass();
        expect(expectedClass).toBe("button-green");
    });
    
    test("Provides correct text CSS class for given button type", async () => {    
        const expectedClass = PrimaryButtonService.provideTextCssClass(PrimaryButtonTypes.BLACK);
        expect(expectedClass).toBe("p-white");
    });
    
    test("Provides correct default text CSS class for no given button type", async () => {    
        const expectedClass = PrimaryButtonService.provideTextCssClass();
        expect(expectedClass).toBe("p-black");
    });
});