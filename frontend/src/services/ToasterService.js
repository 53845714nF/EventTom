import { createToaster } from "@meforma/vue-toaster";

export default class ToasterService {
    static toaster = createToaster({
        position: "bottom",
        maxToasts: 3,
    });

    static createToasterPopUp(type, message){
        switch (type) {
            case 'error': 
                ToasterService.toaster.error(message); 
                break;
            case 'success':
                ToasterService.toaster.success(message);
                break;
            default:
                ToasterService.toaster.info(message);
        }
    }
}