import { Roles } from "./Roles";

export default {
  LOGIN_REDIRECT: "/", // Redirect to this path after login
  INITIAL_ROLE: Roles.CUSTOMER, // The role you get assigned when you log in
  TICKET_THRESHOLD: 0.8, // how many percent of the total tickets are expected to be sold (used to calculate the percentages in EMEventsView)
};
