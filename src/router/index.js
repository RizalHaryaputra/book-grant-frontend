import { createRouter, createWebHistory } from "vue-router";
import DashboardPublisher from "../views/DashboardPublisher.vue";
import DaftarNaskah from "../views/DaftarNaskah.vue";
import Pemeriksaan from "../views/Pemeriksaan.vue";
import Keputusan from "../views/Keputusan.vue";
import Rekap from "../views/Rekap.vue";
import DaftarNaskahPreview from "../views/DaftarNaskahPreview.vue"; // file baru
import Settings from "../views/Settings.vue"; // file baru
import Support from "../views/Support.vue"; // file baru

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
    path: "/daftar-naskah/:id", // :id = id naskah yang diklik
    name: "daftar-naskah-preview",
    component: DaftarNaskahPreview,
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
  {
  path: "/settings",
  name: "settings",
  component: Settings,
},
{
  path: "/support",
  name: "support",
  component: Support,
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;