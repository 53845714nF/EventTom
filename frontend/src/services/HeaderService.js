import AuthService from "./AuthService"

export default class HeaderService {
    static loggedOutNavItems = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/' },
        { title: 'Dashboard', path: '/dashboard' },
    ]
    static UserNavItems = [
        { title: 'Events', path: '/' },
        { title: 'Gutscheine', path: '/' },
    ]
    static EventManagerNavItems = [
        { title: 'Events', path: '/' },
        { title: 'Aktivitäten', path: '/' },
    ]
    static EventCreatorNavItems = [
        { title: 'Meine Events', path: '/' },
        { title: 'Neues Event', path: '/' },
    ]

    static logoutButtonAttributes = {title: 'Logout', path: '/'}
    static loginButtonAttributes = {title: 'Login', path: '/auth/signin'}

    // returns the navigation items for the header depending on the role of the user
    // because different roles have access to different views
    static getNavItems() {

        const role = AuthService.getUserRole() || 'guest';

        switch (role.toLowerCase()) {
            case 'user':
                return HeaderService.UserNavItems;
            case 'eventmanager':
                return HeaderService.EventManagerNavItems;
            case 'eventcreator':
                return HeaderService.EventCreatorNavItems;
            default:
                return HeaderService.loggedOutNavItems;
        }
    }

    // returns the attributes for the primary button in the header
    // so that it displays "logout" if the user is logged in and "login" if the user is logged out
    static getPrimaryButtonAttributes() {
        if (AuthService.userLoggedIn()) {
            return HeaderService.logoutButtonAttributes;
        } else {
            return HeaderService.loginButtonAttributes;
        }
    }

}