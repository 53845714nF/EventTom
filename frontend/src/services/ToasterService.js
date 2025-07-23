import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default class ToasterService {
  static toastConfig = {
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_CENTER,
    limit: 3,
  };

  static createToasterPopUp(type, message) {
    const options = this.toastConfig;
    
    switch (type) {
      case "error":
        toast.error(message, options);
        break;
      case "success":
        toast.success(message, options);
        break;
      default:
        toast.info(message, options);
    }
  }

  static createDefaultErrorPopUp() {
    toast.error("Ein unbekannter Fehler ist aufgetreten.", this.toastConfig);
  }
}
