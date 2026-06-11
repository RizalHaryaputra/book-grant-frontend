import { createRouter, createWebHistory } from "vue-router";

/* AUTH */
import LoginPage from "../pages/auth/LoginPage.vue";
import RegisterPage from "../pages/auth/RegisterPage.vue";

/* ADMIN */
import DashboardPage from "../pages/dashboard/DashboardPage.vue";
import UserManagementPage from "../pages/admin/UserManagementPage.vue";

/* HIBAH */
import AuthorListPage from "../pages/hibah/HibahPage.vue";

/* KONTRAK ADMIN */
import ContractPage from "../pages/contracts/ContractPage.vue";

/* KONTRAK PENULIS */
import UploadKontrakPage from "../pages/upload_kontrak/UploadContract.vue";
import ContractStatusPage from "../pages/upload_kontrak/ContractStatusPage.vue";

/* ========================================================
   MODULE 2 (PENULIS & NASKAH)
   ======================================================== */
import DashboardPenulis    from '../views/DashboardPenulis.vue'
import BukuSaya            from '../views/BukuSaya.vue'
import DetailBuku          from '../views/DetailBuku.vue'

// Upload Draft (alur 3 langkah)
import UploadDraft         from '../views/buku/UploadDraft.vue'
import VerifikasiDraft     from '../views/buku/VerifikasiDraft.vue'
import AtributBuku         from '../views/buku/AtributBuku.vue'

// Review & Revisi
import DokumenAdministrasi from '../views/review/DokumenAdministrasi.vue'
import RevisiNaskah        from '../views/review/UploadRevisi.vue'
import HasilReview         from '../views/review/HasilReview.vue'
import RiwayatDokumen      from '../views/RiwayatDokumen.vue'
import RevisiPraCetak      from '../views/review/RevisiPraCetak.vue'

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: LoginPage, meta: { guest: true, title: "Login" } },
  { path: "/register", name: "register", component: RegisterPage, meta: { guest: true, title: "Form Kesediaan Penulis" } },

  /* ADMIN */
  { path: "/dashboard", name: "dashboard", component: DashboardPage, meta: { requiresAuth: true, roles: ["admin"], title: "Dashboard Admin" } },
  { path: "/hibah", name: "hibah", component: AuthorListPage, meta: { requiresAuth: true, title: "Pengajuan Hibah Buku" } },
  { path: "/users", name: "users", component: UserManagementPage, meta: { requiresAuth: true, roles: ["admin"], title: "Manajemen User" } },
  { path: "/contracts", name: "contracts", component: ContractPage, meta: { requiresAuth: true, title: "Kontrak Hibah" } },

  /* KONTRAK PENULIS */
  { path: "/upload-kontrak", name: "upload-kontrak", component: UploadKontrakPage, meta: { requiresAuth: true, roles: ["penulis", "author"], title: "Upload Kontrak" } },
  { path: "/status-kontrak", name: "status-kontrak", component: ContractStatusPage, meta: { requiresAuth: true, roles: ["penulis", "author"], title: "Status Kontrak" } },

  /* DASHBOARD PENULIS (MODULE 2) */
  { path: '/dashboard-penulis', component: DashboardPenulis, meta: { requiresAuth: true, roles: ["penulis", "author"], title: "Dashboard Penulis" } },
  { path: '/buku-saya', component: BukuSaya, meta: { requiresAuth: true, roles: ["penulis", "author"], title: "Buku Saya" } },
  { path: '/detail-buku/:id', component: DetailBuku, props: true, meta: { requiresAuth: true, roles: ["penulis", "author"] } },

  { path: '/upload-draft', component: UploadDraft, meta: { requiresAuth: true, roles: ["penulis", "author"] } },
  { path: '/verifikasi-draft', component: VerifikasiDraft, meta: { requiresAuth: true, roles: ["penulis", "author"] } },
  { path: '/atribut-buku', component: AtributBuku, meta: { requiresAuth: true, roles: ["penulis", "author"] } },

  { path: '/dokumen-administrasi/:id', component: DokumenAdministrasi, props: true, meta: { requiresAuth: true, roles: ["penulis", "author"] } },
  { path: '/revisi-naskah/:id', component: RevisiNaskah, props: true, meta: { requiresAuth: true, roles: ["penulis", "author"] } },
  { path: '/hasil-review/:id', component: HasilReview, props: true, meta: { requiresAuth: true, roles: ["penulis", "author"] } },
  { path: '/riwayat-dokumen/:id', component: RiwayatDokumen, props: true, meta: { requiresAuth: true, roles: ["penulis", "author"] } },
  { path: '/revisi-pra-cetak/:id', component: RevisiPraCetak, props: true, meta: { requiresAuth: true, roles: ["penulis", "author"] } },

  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("auth_token");
  let role = "";
  const currentUserRaw = localStorage.getItem("current_user");
  
  if (currentUserRaw) {
    try {
      const userObj = JSON.parse(currentUserRaw);
      if (userObj && userObj.role) {
        if (typeof userObj.role === "string") {
          role = userObj.role.toLowerCase();
        } else if (typeof userObj.role === "object") {
          const roleName = userObj.role.name || userObj.role.role_name || userObj.role.nama || "";
          role = String(roleName).toLowerCase();
        }
      }
    } catch (e) {
      console.error("Gagal membaca profil user dari Local Storage");
    }
  }

  if (to.meta.requiresAuth && !token) return next("/login");

  if (to.meta.guest && token) {
    if (role === "admin") return next("/dashboard");
    return next("/dashboard-penulis");
  }

  if (to.meta.roles && role) {
    if (!to.meta.roles.includes(role)) {
      if (role === "admin" && to.path !== "/dashboard") return next("/dashboard");
    }
  }

  if (to.meta.requiresAuth && !role) {
     localStorage.clear();
     return next("/login");
  }
  next();
});

router.afterEach((to) => {
  document.title = to.meta.title || "Sistem Hibah Buku";
});

export default router;
