import { ref } from "vue";
import { Roles } from "@/constants/Roles";
import AuthService from "./AuthService";
import ToasterService from "./ToasterService";
import axios from "axios";

export default class AdminService {

    static provideEmptyUser() {
        return ref({
            full_name: "",
            email: "",
            is_active: true,
            user_type: "employee",
            role: "",
            password: "",
        });
    }

    static provideRoleOptions() {
        return Object.values(Roles).filter(role => role !== Roles.GUEST);
    }

    static async postNewUser(user, authStore) {

        const data = {
            full_name: user.value.full_name,
            email: user.value.email,
            is_active: user.value.is_active,
            user_type: user.value.user_type,
            role: user.value.role,
            password: user.value.password,
          };

        const config = AuthService.getConfig(authStore);
        console.log(config)
        console.log(data)
    
        await axios
          .post("/api/v1/users", data, config)
          .then(() => {

            ToasterService.createToasterPopUp(
                "success",
                "User erfolgreich hinzugefügt",
            );

            // reset user in form
            user.value = AdminService.provideEmptyUser();
          })
          .catch((error) => {
            console.log(error);
            ToasterService.createToasterPopUp("error", "Etwas ist schief gelaufen.");
          });
      }


      static async getAllUsers(authStore) {

        const data = {};
    
        await axios
          .get("/api/v1/users", data, AuthService.getConfig(authStore))
          .then((response) => {
            console.log(response);
            ToasterService.createToasterPopUp(
                "success",
                "Alle User da",
            );

            // reset user in form
            user.value = AdminService.provideEmptyUser();
          })
          .catch((error) => {
            console.log(error);
            ToasterService.createToasterPopUp("error", "Etwas ist schief gelaufen.");
          });
      }
}