import { SecondaryButtonTypes } from "@/constants/ButtonTypes";

export default class SecondaryButtonService{

    static provideTextCssClass = (buttonType) => {
        switch (buttonType) {
            case SecondaryButtonTypes.BLACK:
                return 'p-black';
            case SecondaryButtonTypes.WHITE:
                return 'p-white';
            default:
                return 'p-black';
        }
    }
}