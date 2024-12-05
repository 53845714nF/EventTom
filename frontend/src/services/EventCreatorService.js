export default class EventCreatorService {
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
            .post(
              `/api/v1/events/event-creator/${eventCreatorId}`,
              {},
              AuthService.getConfig(authStore.accessToken),
            )
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error);
              ToasterService.createToasterPopUp(
                "error",
                "Something went wrong while fetching the events.",
              );
            });
        }
      }
    
}