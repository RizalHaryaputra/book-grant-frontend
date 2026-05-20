import { createRouter, createWebHistory } from "vue-router";
import DashboardPublisher from "../views/DashboardPublisher.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardPublisher,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
