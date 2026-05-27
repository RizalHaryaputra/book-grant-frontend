import { createRouter, createWebHistory } from "vue-router";
import DashboardPublisher from "../views/DashboardPublisher.vue";
import DaftarNaskah from "../views/DaftarNaskah.vue";
import Pemeriksaan from "../views/Pemeriksaan.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardPublisher,
  },
  {
    path: "/daftar-naskah",
    name: "daftar-naskah",
    component: DaftarNaskah,
  },
  {
    path: "/pemeriksaan",
    name: "pemeriksaan",
    component: Pemeriksaan,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
