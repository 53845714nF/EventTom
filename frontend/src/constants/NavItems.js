export const NavItems = {
  GUEST: {
    items: [
      { title: "Home", path: "/" },
      { title: "About", path: "/not_implemented" },
      { title: "Dashboard", path: "/not_implemented" },
    ],
    button: { title: "Login", path: "/auth/signin" },
  },

  USER: {
    items: [
      { title: "Events", path: "/not_implemented" },
      { title: "Gutscheine", path: "/not_implemented" },
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
      { title: "Meine Events", path: "/not_implemented" },
      { title: "Neues Event", path: "/not_implemented" },
    ],
    button: { title: "Logout", path: "/" },
  },
  
  ADMIN: {
    items: [
      { title: "Benutzerübersicht", path: "/not_implemented" },
      { title: "Neuer Benutzer", path: "/not_implemented" },
    ],
    button: { title: "Logout", path: "/" },
  },
};
