export const NavItems = {
  GUEST: {
    items: [
      {title: 'Home', path: '/'},
      {title: 'About', path: '/not_implemented'},
      {title: 'Dashboard', path: '/dashboard'},
    ],
    button: {title: 'Login', path: '/auth/signin'},
  },

  USER: {
    items: [
      { title: 'Events', path: '/not_implemented' },
      { title: 'Gutscheine', path: '/not_implemented' },
    ],
    button: {title: 'Logout', path: '/'},
  },

  EVENT_MANAGER: {
    items: [
      { title: 'Events', path: '/not_implemented' },
      { title: 'Aktivitäten', path: '/not_implemented' },
    ],
    button: {title: 'Logout', path: '/'},
  },

  EVENT_CREATOR: {
    items: [
      { title: 'Meine Events', path: '/not_implemented' },
      { title: 'Neues Event', path: '/not_implemented' },
    ],
    button: {title: 'Logout', path: '/'},
  }
};