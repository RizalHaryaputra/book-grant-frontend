import { ref } from "vue";
import { useRouter } from "vue-router";
import * as authService from "../services/authService";

export function useAuth() {
  const router = useRouter();

  const isLoading = ref(false);
  const validationErrors = ref({});
  const errorMessage = ref("");

  /**
   * LOGIN
   */
const login = async (credentials) => {
  isLoading.value = true
  errorMessage.value = ""
  
  try {
    const data = await authService.login(credentials)

    const roleName =
      (
        data.user?.role?.name ||
        data.user?.role ||
        ""
      ).toLowerCase()

    console.log("ROLE:", roleName)

    if (roleName === "author" || roleName === "penulis") {
      router.push("/dashboard-penulis")
    }
    else if (roleName === "admin") {
      router.push("/dashboard")
    }
    else if (roleName === "reviewer") {
      router.push("/reviewer/dashboard")
    }
    else if (roleName === "penerbit" || roleName === "publisher" || roleName === "editor") {
      router.push("/publisher/dashboard")
    }
    else {
      router.push("/login")
    }
  }
  catch (error) {
    console.error("LOGIN ERROR:", error)
    if (error.response?.status === 401 || error.response?.status === 404 || error.response?.status === 422) {
      errorMessage.value = error.response.data?.message || "Email atau password salah."
    } else {
      errorMessage.value = error.response?.data?.message || "Terjadi kesalahan pada server."
    }
  } finally {
    isLoading.value = false
  }
}

  /**
   * REGISTER
   */
  const register = async (formData) => {
    isLoading.value = true;
    validationErrors.value = {};
    errorMessage.value = "";

    try {
      const response = await authService.register(formData);

      alert("Registrasi berhasil.");

      router.push("/login");

      return response;
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      if (error.response?.status === 422) {
        validationErrors.value =
          error.response.data?.errors ||
          error.response.data?.data?.errors ||
          {};

        errorMessage.value =
          error.response.data?.message ||
          "Data tidak valid.";
      } else {
        errorMessage.value =
          error.response?.data?.message ||
          "Registrasi gagal.";
      }

      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * LOGOUT
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_role");
      localStorage.removeItem("current_user");

      router.push("/login");
    }
  };

  /**
   * HELPER
   */
  const getCurrentUser = () => {
    const user = localStorage.getItem("current_user");

    if (!user) return null;

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  };

  const getToken = () => {
    return localStorage.getItem("auth_token");
  };

  const getRole = () => {
    return localStorage.getItem("user_role");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("auth_token");
  };

  return {
    login,
    register,
    logout,

    getCurrentUser,
    getToken,
    getRole,
    isAuthenticated,

    isLoading,
    validationErrors,
    errorMessage,
  };
}