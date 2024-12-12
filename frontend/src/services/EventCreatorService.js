import ToasterService from "./ToasterService";
import FormValidatorService from "./FormValidatorService";
import FormTypes from "@/constants/FormTypes";
import axios from "axios";
import AuthService from "./AuthService";

export default class EventCreatorService {
  static provideEmptyEvent() {
    return {
      title: "",
      description: "",
      count: 0,
      threshold: import.meta.env.VITE_TICKET_THRESHOLD,
      base_price: 0,
      pay_fee: 0,
      event_creator_id: "",
      event_manager_id: "",
      event_manager_email: "",
    };
  }

  static getEventManagerIdByEmail(email, eventManagers) {
    const eventManager = eventManagers.find((eventManager) => eventManager.email === email);
    return eventManager.id;
  }

  static async getAllEventManagers(authStore) {
    console.log(authStore);
    return [
      {
        id: 1,
        email: "1@mail.com",
      },
      {
        id: 2,
        email: "2@mail.com",
      },
      {
        id: 3,
        email: "3@mail.com",
      },
    ];
  }

  static async tryPostNewEvent(event, authStore) {
    console.log(authStore);
    const validationRules = FormValidatorService.getValidationRules(FormTypes.NEW_EVENT);
    const validationError = FormValidatorService.validateForm(event.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    console.log(event);
    ToasterService.createToasterPopUp("error", "postNewEvent() not implemented yet.");
  }

  static async getEventsForEventCreator(eventCreatorId, authStore) {
    const endpointExists = false;

    if (!endpointExists) {
      return [
        {
          title: "Event 1",
          description: "Description 1",
        },
        {
          title: "Event 1",
          description: "Description 1",
        },
        {
          title: "Event 1",
          description: "Description 1",
        },
        {
          title: "Event 1",
          description: "Description 1",
        },
        {
          title: "Event 2",
          description: "Description 2",
        },
        {
          title: "Event 3",
          description: "Description 3",
        },
      ];
    } else {
      await axios
        .post(`/api/v1/events/event-creator/${eventCreatorId}`, {}, AuthService.getConfig(authStore.accessToken))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          ToasterService.createToasterPopUp("error", "Something went wrong while fetching the events.");
        });
    }
  }
}
