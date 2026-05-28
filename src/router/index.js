import { createRouter, createWebHistory } from "vue-router";
import DashboardPublisher from "../views/DashboardPublisher.vue";
import DaftarNaskah from "../views/DaftarNaskah.vue";
import Pemeriksaan from "../views/Pemeriksaan.vue";
import Keputusan from "../views/Keputusan.vue";
import Rekap from "../views/Rekap.vue";

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
  {
    path: "/keputusan",
    name: "keputusan",
    component: Keputusan,
  },
  {                                              
    path: "/rekap",
    name: "rekap",
    component: Rekap,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;