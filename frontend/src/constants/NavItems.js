export const NavItems = {
  GUEST: {
    items: [
      { title: "Home", path: "/" },
      { title: "About", path: "/not_implemented" },
      { title: "Dashboard", path: "/not_implemented" },
    ],
    button: { title: "Login", path: "/login" },
  },

  CUSTOMER: {
    items: [
      { title: "Events", path: "/customer/events" },
      { title: "Gutscheine", path: "/customer/vouchers" },
      { title: "Tickets", path: "/customer/tickets" },
    ],
    button: { title: "Logout", path: "/" },
  },

  EVENT_MANAGER: {
    items: [
      { title: "Events", path: "/event-manager/events" },
      { title: "Aktivitäten", path: "/event-manager/activities" },
    ],
    button: { title: "Logout", path: "/" },
  },

  EVENT_CREATOR: {
    items: [
      { title: "Meine Events", path: "/eventcreator/events" },
      { title: "Neues Event", path: "/eventcreator/new_event" },
    ],
    button: { title: "Logout", path: "/" },
  },

  ADMIN: {
    items: [
      { title: "Benutzer Liste", path: "/admin/users" },
      { title: "Neuer Benutzer", path: "/admin/new_user" },
      { title: "Neuer Gutschein", path: "/admin/create_voucher" },
    ],
    button: { title: "Logout", path: "/" },
  },
};
