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
    return Object.values(Roles).filter((role) => role !== Roles.GUEST);
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
    console.log(config);
    console.log(data);

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
        ToasterService.createToasterPopUp(
          "error",
          "Etwas ist schief gelaufen.",
        );
      });
  }

  static async getAllUsers(authStore) {
    const data = {};
    const endpointExists = true;

    if (!endpointExists){
      return [
        {
          full_name: "John Doe",
          email: "john.doe@example.com",
          password: "password123",
          user_type: "employee",
          role: "admin",
        },
        {
          full_name: "Jane Smith",
          email: "jane.smith@example.com",
          password: "password123",
          user_type: "customer",
          role: "eventcreator",
        },
        {
          full_name: "Alice Johnson",
          email: "alice.johnson@example.com",
          password: "password123",
          user_type: "employee",
          role: "customer",
        },
        {
          full_name: "Bob Brown",
          email: "bob.brown@example.com",
          password: "password123",
          user_type: "customer",
          role: "eventmanager",
        },
        {
          full_name: "Charlie Davis",
          email: "charlie.davis@example.com",
          password: "password123",
          user_type: "employee",
          role: "admin",
        },
        {
          full_name: "Diana Evans",
          email: "diana.evans@example.com",
          password: "password123",
          user_type: "customer",
          role: "eventcreator",
        },
        {
          full_name: "Eve Foster",
          email: "eve.foster@example.com",
          password: "password123",
          user_type: "employee",
          role: "customer",
        },
        {
          full_name: "Frank Green",
          email: "frank.green@example.com",
          password: "password123",
          user_type: "customer",
          role: "eventmanager",
        },
        {
          full_name: "Grace Harris",
          email: "grace.harris@example.com",
          password: "password123",
          user_type: "employee",
          role: "admin",
        },
        {
          full_name: "Henry Irving",
          email: "henry.irving@example.com",
          password: "password123",
          user_type: "customer",
          role: "eventcreator",
        },
      ];
    }

    else {
      await axios
        .get("/api/v1/users", data, AuthService.getConfig(authStore))
        .then((response) => {
          console.log(response);
          ToasterService.createToasterPopUp("success", "Alle User da");
        })
        .catch((error) => {
          console.log(error);
          ToasterService.createToasterPopUp(
            "error",
            "Etwas ist schief gelaufen.",
          );
        });
    }
  }

  static deleteUser(email) {
    ToasterService.createToasterPopUp(
      "error",
      "not implemented.",
    );
  }

  static fetchUsers = async () => {
    try {
      const response = await axios.get('/api/v1/users/', {
        params: {
          skip: 0,
          limit: 100,
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM5NTgxNDMsInN1YiI6IjUyZjliNTMwLTVhMDItNDYxNi05MDM1LTdjNGU5MDkzNjkzMCJ9.dXiG8xSPjDc7KidEpRJKC3mI8CtBlG9b67pWnM6OAGI',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
    }
  };
}
