import { createRouter, createWebHistory } from "vue-router";

import LandingPageView from "@/views/LandingPageView.vue";

import AuthView from "@/views/AuthView.vue";

import EventManagerEventsView from "@/views/EventManagerEventsView.vue";

import NotImplementedView from "@/views/NotImplementedView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

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
    },
    {
      path: "/not_implemented",
      name: "notImplemented",
      component: NotImplementedView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not_found",
      component: NotFoundView,
      meta: {
        title: "404 - Not Found",
      },
    },
  ],
});

export default router;
