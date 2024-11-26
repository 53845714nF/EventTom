import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { Roles } from "@/constants/Roles";

import LandingPageView from "@/views/LandingPageView.vue";

import AuthView from "@/views/AuthView.vue";

import EventManagerEventsView from "@/views/EventManagerEventsView.vue";

import NotImplementedView from "@/views/NotImplementedView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NotAllowedView from "@/views/NotAllowedView.vue";

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
    {
      path: "/auth/:type",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/event-manager/events",
      name: "EMEvents",
      component: EventManagerEventsView,
      beforeEnter: requireRole(Roles.EVENT_MANAGER),
    },
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
