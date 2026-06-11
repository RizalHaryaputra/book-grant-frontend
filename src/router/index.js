import { createRouter, createWebHistory } from "vue-router";

/* AUTH */
import LoginPage from "../pages/auth/LoginPage.vue";
import RegisterPage from "../pages/auth/RegisterPage.vue";

/* ADMIN (Module 1) */
import DashboardPage from "../pages/dashboard/DashboardPage.vue";
import UserManagementPage from "../pages/admin/UserManagementPage.vue";

/* HIBAH */
import AuthorListPage from "../pages/hibah/HibahPage.vue";

/* KONTRAK ADMIN */
import ContractPage from "../pages/contracts/ContractPage.vue";

/* KONTRAK PENULIS */
import UploadKontrakPage from "../pages/upload_kontrak/UploadContract.vue";
import ContractStatusPage from "../pages/upload_kontrak/ContractStatusPage.vue";

/* MODULE 2 (PENULIS & NASKAH) */
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

/* MODULE 3 (REVIEWER) */
const adminRoutes = [
  { path: '/admin/dashboard', name: 'AdminDashboard', component: () => import('../views/admin/DashboardView.vue'), meta: { title: 'Dashboard', roles: ['admin'] } },
  { path: '/admin/manajemen-user', name: 'AdminManajemenUser', component: () => import('../views/admin/ManajemenUserView.vue'), meta: { title: 'Manajemen User', roles: ['admin'] } },
  { path: '/admin/proposal-buku', name: 'AdminProposalBuku', component: () => import('../views/admin/ProposalBukuView.vue'), meta: { title: 'Proposal Buku', roles: ['admin'] } },
  { path: '/admin/plotting-reviewer', name: 'AdminPlottingReviewer', component: () => import('../views/admin/PlottingReviewerView.vue'), meta: { title: 'Plotting Reviewer', roles: ['admin'] } },
  { path: '/admin/monitoring-reviewer', name: 'AdminMonitoringReviewer', component: () => import('../views/admin/MonitoringReviewerView.vue'), meta: { title: 'Monitoring Reviewer', roles: ['admin'] } },
  { path: '/admin/kompilasi-hasil-review', name: 'AdminKompilasiHasilReview', component: () => import('../views/admin/KompilasiHasilReviewView.vue'), meta: { title: 'Kompilasi Hasil Review', roles: ['admin'] } },
  { path: '/admin/rubrik-penilaian', name: 'AdminRubrikPenilaian', component: () => import('../views/admin/RubrikPenilaianView.vue'), meta: { title: 'Rubrik Penilaian', roles: ['admin'] } },
  { path: '/admin/notifikasi', name: 'AdminNotifikasi', component: () => import('../views/admin/NotifikasiView.vue'), meta: { title: 'Notifikasi', roles: ['admin'] } },
  { path: '/admin/settings', name: 'AdminSettings', component: () => import('../views/admin/SettingsView.vue'), meta: { title: 'Settings', roles: ['admin'] } },
]

const reviewerRoutes = [
  { path: '/reviewer', redirect: '/reviewer/daftar-tugas' },
  { path: '/reviewer/dashboard', name: 'ReviewerDashboard', component: () => import('../views/reviewer/DashboardView.vue'), meta: { title: 'Dashboard Reviewer', roles: ['reviewer'] } },
  { path: '/reviewer/daftar-tugas', name: 'ReviewerDaftarTugas', component: () => import('../views/reviewer/DaftarTugasView.vue'), meta: { title: 'Daftar Tugas', roles: ['reviewer'] } },
  { path: '/reviewer/draft-naskah/:id', name: 'ReviewerDraftNaskah', component: () => import('../views/reviewer/DraftNaskahView.vue'), meta: { title: 'Draft Naskah', roles: ['reviewer'] } },
  { path: '/reviewer/rubrik-penilaian', name: 'ReviewerRubrikPenilaian', component: () => import('../views/reviewer/RubrikPenilaianView.vue'), meta: { title: 'Rubrik Penilaian', roles: ['reviewer'] } },
  { path: '/reviewer/riwayat-review', name: 'ReviewerRiwayatReview', component: () => import('../views/reviewer/RiwayatReviewView.vue'), meta: { title: 'Riwayat Review', roles: ['reviewer'] } },
  { path: '/reviewer/support', name: 'ReviewerSupport', component: () => import('../views/reviewer/SupportView.vue'), meta: { title: 'Support', roles: ['reviewer'] } },
  { path: '/reviewer/settings', name: 'ReviewerSettings', component: () => import('../views/reviewer/SettingsView.vue'), meta: { title: 'Settings', roles: ['reviewer'] } },
]

/* MODULE 4 (PUBLISHER) */
import DashboardPublisher from "../views/DashboardPublisher.vue";
import DaftarNaskah from "../views/DaftarNaskah.vue";
import DaftarNaskahPreview from "../views/DaftarNaskahPreview.vue";
import Pemeriksaan from "../views/Pemeriksaan.vue";
import Keputusan from "../views/Keputusan.vue";
import Rekap from "../views/Rekap.vue";
import SettingsPublisher from "../views/Settings.vue"; // rename to avoid conflict if any

const publisherRoutes = [
  { path: "/publisher/dashboard", name: "dashboard-publisher", component: DashboardPublisher, meta: { roles: ['penerbit', 'publisher'] } },
  { path: "/publisher/daftar-naskah", name: "daftar-naskah", component: DaftarNaskah, meta: { roles: ['penerbit', 'publisher'] } },
  { path: "/publisher/daftar-naskah/:id", name: "daftar-naskah-preview", component: DaftarNaskahPreview, meta: { roles: ['penerbit', 'publisher'] } },
  { path: "/publisher/pemeriksaan", name: "pemeriksaan", component: Pemeriksaan, meta: { roles: ['penerbit', 'publisher'] } },
  { path: "/publisher/keputusan", name: "keputusan", component: Keputusan, meta: { roles: ['penerbit', 'publisher'] } },
  { path: "/publisher/rekap", name: "rekap", component: Rekap, meta: { roles: ['penerbit', 'publisher'] } },
  { path: "/publisher/settings", name: "settings-publisher", component: SettingsPublisher, meta: { roles: ['penerbit', 'publisher'] } },
]

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: LoginPage, meta: { guest: true, title: "Login" } },
  { path: "/register", name: "register", component: RegisterPage, meta: { guest: true, title: "Form Kesediaan Penulis" } },

  /* ADMIN (Module 1) */
  { path: "/dashboard", name: "dashboard", component: DashboardPage, meta: { requiresAuth: true, roles: ["admin"], title: "Dashboard Admin" } },
  { path: "/hibah", name: "hibah", component: AuthorListPage, meta: { requiresAuth: true, title: "Pengajuan Hibah Buku" } },
  { path: "/users", name: "users", component: UserManagementPage, meta: { requiresAuth: true, roles: ["admin"], title: "Manajemen User" } },
  { path: "/contracts", name: "contracts", component: ContractPage, meta: { requiresAuth: true, title: "Kontrak Hibah" } },

  /* ADMIN (Module 3) */
  ...adminRoutes,

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

  /* REVIEWER (MODULE 3) */
  ...reviewerRoutes,

  /* PUBLISHER (MODULE 4) */
  ...publisherRoutes,

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
    if (role === "reviewer") return next("/reviewer/dashboard");
    if (role === "penerbit" || role === "publisher") return next("/publisher/dashboard");
    return next("/dashboard-penulis");
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
