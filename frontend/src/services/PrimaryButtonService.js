import { PrimaryButtonTypes } from "@/constants/ButtonTypes";

export default class PrimaryButtonService{
    static provideTextCssClass = (buttonType) => {
        switch (buttonType) {
            case PrimaryButtonTypes.BLACK:
                return 'p-white';
            case PrimaryButtonTypes.GREEN:
                return 'p-black';
            default:
                return 'p-black';
        }
    }

    static provideDivCssClass = (buttonType) => {
        switch (buttonType) {
            case PrimaryButtonTypes.BLACK:
                return 'button-black';
            case PrimaryButtonTypes.GREEN:
                return 'button-green';
            default:
                return 'button-green';
        }
    }
}