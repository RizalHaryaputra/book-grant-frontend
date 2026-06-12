import { ref } from "vue";
// KITA TAMBAHKAN createUser as apiCreateUser DI SINI
import { getUsers, createUser as apiCreateUser, updateUser, deleteUser as destroyUser } from "../services/userService";

export function useUser() {
  const users = ref([]);
  const loading = ref(false);
  const error = ref("");

  const fetchUsers = async (roleFilter = "") => {
    loading.value = true;
    error.value = "";
    try {
      const response = await getUsers(roleFilter !== "all" ? roleFilter : "");
      // Karena userService sudah me-return response.data, kita tangkap dengan aman
      users.value = response?.data || response || [];
    } catch (err) {
      error.value = err.response?.data?.message || "Gagal memuat data user";
    } finally {
      loading.value = false;
    }
  };

  const editUser = async (id, payload) => {
    const apiPayload = {
      name: payload.name,
      is_active: payload.status_akun === "aktif",
      email: payload.email,
      role: payload.role,
      institution: payload.institution
    };

    await updateUser(id, apiPayload);
    await fetchUsers(); // Refresh data setelah berhasil
  };

  const removeUser = async (id) => {
    await destroyUser(id);
    await fetchUsers(); // Refresh data setelah dihapus
  };

  // FUNGSI CREATE USER YANG SUDAH TERHUBUNG DENGAN API
  const createUser = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      // Memanggil fungsi kurir resmi dari userService.js
      const response = await apiCreateUser(payload); 
      return response;
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal menambahkan user baru';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    editUser,
    removeUser,
    createUser, // Fungsi sekarang sudah terdaftar dan siap dipakai!
  };
}