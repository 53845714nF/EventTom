import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { Roles } from "@/constants/Roles";

import LandingPageView from "@/views/LandingPageView.vue";

import SignUpView from "@/views/SignUpView.vue";
import LoginView from "@/views/LoginView.vue";

import EMEventsView from "@/views/EventManager/EMEventsView.vue";
import EMActivitiesView from "@/views/EventManager/EMActivitiesView.vue";

import ECEventsView from "@/views/EventCreator/ECEventsView.vue";
import ECCreateNewEventView from "@/views/EventCreator/ECCreateNewEventView.vue";

import NotImplementedView from "@/views/Errors/NotImplementedView.vue";
import NotFoundView from "@/views/Errors/NotFoundView.vue";
import NotAllowedView from "@/views/Errors/NotAllowedView.vue";

import AAddNewUserView from "@/views/Admin/AAddNewUserView.vue";
import ACreateVoucherView from "@/views/Admin/ACreateVoucherView.vue";
import AListUsersView from "@/views/Admin/AListUsersView.vue";

// Middleware, which checks if the user has the required role
function requireRole(requiredRole) {
  return (to, from, next) => {
    const authStore = useAuthStore();
    const userRole = authStore.role;

    if (userRole === requiredRole) {
      next();
    } else {
      next({ name: "notAllowed" });
    }
  };
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPageView,
    },

    // Auth
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    // Admin
    {
      path: "/admin/users",
      name: "adminListUsers",
      component: AListUsersView,
    },
    {
      path: "/admin/new_user",
      name: "adminNewUser",
      component: AAddNewUserView,
    },
    {
      path: "/admin/create_voucher",
      name: "AdminCreateVoucher",
      component: ACreateVoucherView,
    },

    // Event Manager
    {
      path: "/event-manager/events",
      name: "EMEvents",
      component: EMEventsView,
      beforeEnter: requireRole(Roles.EVENT_MANAGER),
    },
    {
      path: "/event-manager/activities",
      name: "EMActivities",
      component: EMActivitiesView,
      beforeEnter: requireRole(Roles.EVENT_MANAGER),
    },

    // Event Creator
    {
      path: "/eventcreator/events",
      name: "ECEvents",
      component: ECEventsView,
      beforeEnter: requireRole(Roles.EVENT_CREATOR),
    },
    {
      path: "/eventcreator/new_event",
      name: "ECNewEvent",
      component: ECCreateNewEventView,
      beforeEnter: requireRole(Roles.EVENT_CREATOR),
    },

    // Error pages
    {
      path: "/not_implemented",
      name: "notImplemented",
      component: NotImplementedView,
    },
    {
      path: "/not_allowed",
      name: "notAllowed",
      component: NotAllowedView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFoundView,
      meta: {
        title: "404 - Not Found",
      },
    },
  ],
});

export default router;
