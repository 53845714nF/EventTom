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
      count: "", // number of tickets availabe
      threshold: "",
      base_price: "",
      pay_fee: "", // price of event = base_price * pay_fee
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

    return await axios.get('/api/v1/users/manager', {
      headers: AuthService.getAuthorizedHeaders(authStore),
      params: {
        skip: 0,
        limit: 100
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error); // Fehlerbehandlung hier.
        ToasterService.createToasterPopUp("error", "Something went wrong while fetching the event managers.");
      });
  }

  static async tryPostNewEvent(event, authStore) {
    
    const validationRules = FormValidatorService.getValidationRules(FormTypes.NEW_EVENT);
    const validationError = FormValidatorService.validateForm(event.value, validationRules);

    if (validationError) {
      ToasterService.createToasterPopUp("error", validationError);
      return;
    }

    const result = EventCreatorService.postEvent(event, authStore);

    if (result.success) {
      event.value = EventCreatorService.provideEmptyEvent();
    }
  }

  static async postEvent(event, authStore) {

    const data = {
      title: event.value.title,
      description: event.value.description,
      count: event.value.count,
      threshold: event.value.threshold,
      base_price: event.value.base_price,
      pay_fee: event.value.pay_fee,
      manager_id: event.value.event_manager_id,
    }

    console.log(data);

    console.log(AuthService.getAuthorizedHeaders(authStore));

    const url = 'http://localhost:8000/api/v1/events/';

    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzUzNzc1NjQsInN1YiI6ImZjYWJhMDA1LTg4M2EtNGYzYS1iZWNiLWJlNTY5NDY0ZWRmZCJ9.hsaCB1z-PGsXC48BSY7VFnmYdkqUVvFWFQD00AuwwRY',
      'Content-Type': 'application/json'
    };

    return await axios.post(url, data, { headers })
      .then(response => {
        console.log(response.data); // Antwortdaten verarbeiten
      })
      .catch(error => {
        console.error('Fehler:', error.response ? error.response.data : error.message);
      });

    return await axios.post("/api/v1/events", data, {
      headers: AuthService.getAuthorizedHeaders(authStore),
    })
      .then(() => {
        return {success: true};
      })
      .catch((error) => {
        ToasterService.createToasterPopUp("error", "Something went wrong while creating the event.");
        console.error(error);
        return {success: false};
      })

  }

  static async getEventsForEventCreator(eventCreatorId, authStore) {
    return await axios.get(`/api/v1/events/creator/${eventCreatorId}`,{
      headers: AuthService.getBasicHeaders(authStore.accessToken),
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        ToasterService.createToasterPopUp("error", "Something went wrong while fetching the events.");
      });
  }
}

