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

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      guest: true,
      title: "Login",
    },
  },

  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      guest: true,
      title: "Form Kesediaan Penulis",
    },
  },

  /* ==========================
      ADMIN
  ========================== */

  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
      title: "Dashboard",
    },
  },

  {
    path: "/hibah",
    name: "hibah",
    component: AuthorListPage,
    meta: {
      requiresAuth: true,
      title: "Pengajuan Hibah Buku",
    },
  },

  {
    path: "/users",
    name: "users",
    component: UserManagementPage,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
      title: "Manajemen User",
    },
  },

  {
    path: "/contracts",
    name: "contracts",
    component: ContractPage,
    meta: {
      requiresAuth: true,
      title: "Kontrak Hibah",
    },
  },

  /* ==========================
      PENULIS
  ========================== */

  {
    path: "/upload-kontrak",
    name: "upload-kontrak",
    component: UploadKontrakPage,
    meta: {
      requiresAuth: true,
      roles: ["penulis", "author"],
      title: "Upload Kontrak",
    },
  },

  {
    path: "/status-kontrak",
    name: "status-kontrak",
    component: ContractStatusPage,
    meta: {
      requiresAuth: true,
      roles: ["penulis", "author"],
      title: "Status Kontrak",
    },
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
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
  
  // ==========================================
  // CARA PALING AMAN: EKSTRAK ROLE ANTI-ERROR
  // ==========================================
  let role = "";
  const currentUserRaw = localStorage.getItem("current_user");
  
  if (currentUserRaw) {
    try {
      const userObj = JSON.parse(currentUserRaw);
      
      if (userObj && userObj.role) {
        // Jika role dari Laravel berupa teks langsung (misal: "admin")
        if (typeof userObj.role === "string") {
          role = userObj.role.toLowerCase();
        } 
        // Jika role dari Laravel berupa objek (misal: {id: 1, name: "admin"})
        else if (typeof userObj.role === "object") {
          // Cover berbagai kemungkinan nama kolom dari Laravel
          const roleName = userObj.role.name || userObj.role.role_name || userObj.role.nama || "";
          role = String(roleName).toLowerCase();
        }
      }
    } catch (e) {
      console.error("Gagal membaca profil user dari Local Storage");
    }
  }

  // 1. Belum login tapi mau ke halaman terproteksi
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // 2. Sudah login tapi malah buka halaman login/register
  if (to.meta.guest && token) {
    if (role === "admin") return next("/dashboard");
    // JANGAN DIPAKSA KE UPLOAD, BIARKAN LOGIC DI HALAMAN TUJUAN YANG MENGATUR
    return next("/status-kontrak"); 
  }

  // 3. Pengecekan Hak Akses (Role)
  if (to.meta.roles && role) {
    if (!to.meta.roles.includes(role)) {
      if (role === "admin" && to.path !== "/dashboard") return next("/dashboard");
      
      // UBAH BAGIAN INI: Izinkan penulis mengakses KEDUA halaman
      if ((role === "penulis" || role === "author") && 
          to.path !== "/upload-kontrak" && 
          to.path !== "/status-kontrak") {
          return next("/status-kontrak");
      }
    }
  }

  // 4. Keamanan ekstra: Cegah infinite loop jika data role benar-benar rusak
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