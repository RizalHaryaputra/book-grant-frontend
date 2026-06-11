<template>
  <AdminLayout>
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-600 rounded-[20px] p-4 mb-6"
    >
      {{ error }}
    </div>

    <div class="space-y-6">
      <div class="bg-white rounded-[28px] shadow-sm px-8 py-6 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-[#2B211C]">Manajemen User</h1>
          <p class="text-gray-500 mt-1">Kelola seluruh pengguna sistem hibah buku</p>
        </div>
        <div class="text-sm text-gray-500">
          Total User : <span class="font-bold text-[#4B3027]">{{ filteredUsers.length }}</span>
        </div>
      </div>

      <div class="bg-white rounded-[28px] shadow-sm p-8">
        <div class="flex flex-wrap gap-3 mb-8">
          <button
            v-for="role in roles"
            :key="role.value"
            @click="selectedRole = role.value"
            class="px-6 py-3 rounded-full border transition-all"
            :class="selectedRole === role.value ? 'bg-[#4B3027] text-white border-[#4B3027]' : 'border-[#4B3027] text-[#4B3027]'"
          >
            {{ role.label }}
          </button>
        </div>

        <div class="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            v-model="search"
            type="text"
            placeholder="Cari nama atau email..."
            class="w-full h-12 border rounded-xl px-4 outline-none focus:border-[#4B3027]"
          />

          <button
            v-if="selectedRole !== 'penulis'"
            @click="openAddModal"
            class="h-12 px-6 bg-[#4B3027] text-white rounded-xl hover:bg-[#3A241C] transition whitespace-nowrap font-medium"
          >
            + Tambah {{ capitalize(selectedRole) }}
          </button>
        </div>

        <div v-if="loading" class="text-center py-12 text-[#8B8178]">
          Memuat data user...
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-[#F4EFEA] text-left">
                <th
                  v-for="column in tableColumns"
                  :key="column.key"
                  :class="column.headerClass"
                  class="p-4"
                >
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedUsers.length === 0">
                <td :colspan="tableColumns.length" class="text-center py-10 text-[#8B8178]">
                  Belum ada data user.
                </td>
              </tr>

              <tr v-for="user in paginatedUsers" :key="user.id" class="border-b">
                <td class="p-4 font-medium">{{ user.name }}</td>
                <td class="p-4">{{ user.email }}</td>

                <template v-if="selectedRole === 'penulis'">
                  <td class="p-4">{{ user.institution || '-' }}</td>
                  <td class="p-4">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-semibold"
                      :class="contractStatusClass(getContractStatus(user))"
                    >
                      {{ getContractStatusLabel(user) }}
                    </span>
                  </td>
                </template>

                <td class="p-4">
                  <div class="flex justify-center gap-2">
                    <button
                      @click="openEdit(user)"
                      class="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      @click="handleDelete(user.id)"
                      class="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-between items-center mt-8">
          <p class="text-gray-500 text-sm">
            Menampilkan {{ paginatedUsers.length }} dari {{ filteredUsers.length }} user
          </p>
          <div class="flex gap-2">
            <button @click="prevPage" :disabled="page === 1" class="pagination-btn">‹</button>
            <button
              v-for="n in totalPages"
              :key="n"
              @click="page = n"
              class="pagination-btn"
              :class="page === n ? 'bg-[#4B3027] text-white' : ''"
            >
              {{ n }}
            </button>
            <button @click="nextPage" :disabled="page === totalPages" class="pagination-btn">›</button>
          </div>
        </div>
      </div>

      <div v-if="showAddModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white rounded-[28px] p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-[#2B211C] mb-2">Tambah {{ capitalize(addForm.role) }} Baru</h2>
          <p class="text-sm text-gray-500 mb-6">
            Membuat akun khusus dengan hak akses {{ addForm.role }}. Kredensial password akan dibuat otomatis dan dikirim via email.
          </p>

          <div class="space-y-4">
            <input v-model="addForm.name" class="modal-input" placeholder="Nama Lengkap" />
            <input v-model="addForm.email" type="email" class="modal-input" placeholder="Email" />

            <div class="w-full h-12 border bg-gray-50 border-gray-200 rounded-xl px-4 flex items-center justify-between text-gray-500">
              <span>Role Akun:</span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="roleClass(addForm.role)">
                {{ capitalize(addForm.role) }}
              </span>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-8">
            <button @click="showAddModal = false" class="px-5 py-2 border rounded-xl">Batal</button>
            <button @click="saveNewUser" class="px-5 py-2 bg-[#4B3027] text-white rounded-xl hover:bg-[#3A241C] transition">Simpan</button>
          </div>
        </div>
      </div>

      <div v-if="showEditModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white rounded-[28px] p-8 w-full max-w-lg">
          <h2 class="text-2xl font-bold text-[#2B211C] mb-2">
            Edit {{ capitalize(selectedRole) }}
          </h2>
          <p class="text-sm text-gray-500 mb-6">
            Ubah data yang diperbolehkan untuk role {{ capitalize(selectedRole) }}.
          </p>

          <div class="space-y-4">
            <input v-model="editForm.name" class="modal-input" placeholder="Nama" />
            <input v-model="editForm.email" type="email" class="modal-input" placeholder="Email" />

            <template v-if="selectedRole === 'penulis'">
              <input v-model="editForm.institution" class="modal-input" placeholder="Institusi" />
              <div class="w-full h-12 border bg-gray-50 border-gray-200 rounded-xl px-4 flex items-center justify-between text-gray-500">
                <span>Status Kontrak:</span>
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                  :class="contractStatusClass(getContractStatus(editFormUser))"
                >
                  {{ getContractStatusLabel(editFormUser) }}
                </span>
              </div>
            </template>
          </div>

          <div class="flex justify-end gap-3 mt-8">
            <button @click="showEditModal = false" class="px-5 py-2 border rounded-xl">Batal</button>
            <button @click="saveEdit" class="px-5 py-2 bg-[#4B3027] text-white rounded-xl hover:bg-[#3A241C] transition">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from "vue";
import AdminLayout from "../../components/layout/AdminLayout.vue";
import { useUser } from "../../composables/useUser";

const { users, loading, error, fetchUsers, editUser, removeUser, createUser } = useUser();

const selectedRole = ref("penulis");
const search = ref("");
const page = ref(1);
const perPage = 5;

const showEditModal = ref(false);
const editForm = reactive({
  id: null,
  name: "",
  email: "",
  institution: "",
});
const editFormUser = ref(null);

const showAddModal = ref(false);
const addForm = reactive({
  name: "",
  email: "",
  role: "",
});

const roles = [
  { label: "Penulis", value: "penulis" },
  { label: "Reviewer", value: "reviewer" },
  { label: "Penerbit", value: "penerbit" },
  { label: "Admin", value: "admin" },
];

const tableColumns = computed(() => {
  if (selectedRole.value === "penulis") {
    return [
      { key: "name", label: "Nama" },
      { key: "email", label: "Email" },
      { key: "institution", label: "Institusi" },
      { key: "contract_status", label: "Status Kontrak" },
      { key: "action", label: "Aksi", headerClass: "text-center" },
    ];
  }

  return [
    { key: "name", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "action", label: "Aksi", headerClass: "text-center" },
  ];
});

onMounted(() => {
  fetchUsers();
});

watch(selectedRole, (newRole) => {
  page.value = 1;
  fetchUsers(newRole);
});

watch(search, () => {
  page.value = 1;
});

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const keyword = search.value.toLowerCase();
    const roleString = user.role?.name || user.role || "";
    const roleMatch = roleString === selectedRole.value;

    const searchMatch =
      (user.name || "").toLowerCase().includes(keyword) ||
      (user.email || "").toLowerCase().includes(keyword);

    return roleMatch && searchMatch;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / perPage)));

const paginatedUsers = computed(() => {
  const start = (page.value - 1) * perPage;
  return filteredUsers.value.slice(start, start + perPage);
});

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const nextPage = () => {
  if (page.value < totalPages.value) page.value++;
};

const capitalize = (text) => {
  if (!text) return "-";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const roleClass = (role) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-700";
    case "reviewer":
      return "bg-blue-100 text-blue-700";
    case "penerbit":
      return "bg-yellow-100 text-yellow-700";
    case "penulis":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getContractStatus = (user) => {
  const rawStatus =
    user?.contract_status ||
    user?.status_kontrak ||
    user?.contract?.status ||
    user?.contract?.contract_status ||
    user?.author_profile?.contract_status ||
    user?.author_profile?.status_kontrak ||
    user?.author_profile?.contract?.status ||
    "-";

  return typeof rawStatus === "string" ? rawStatus.toLowerCase() : rawStatus;
};

const getContractStatusLabel = (user) => {
  const status = getContractStatus(user);

  switch (status) {
    case "uploaded":
    case "diajukan":
    case "pending":
      return "Menunggu Validasi";
    case "validated":
    case "approved":
    case "disetujui":
      return "Disetujui";
    case "rejected":
    case "ditolak":
      return "Ditolak";
    case "-":
      return "-";
    default:
      return capitalize(String(status));
  }
};

const contractStatusClass = (status) => {
  switch (status) {
    case "uploaded":
    case "diajukan":
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "validated":
    case "approved":
    case "disetujui":
      return "bg-green-100 text-green-700";
    case "rejected":
    case "ditolak":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const openAddModal = () => {
  addForm.name = "";
  addForm.email = "";
  addForm.role = selectedRole.value;
  showAddModal.value = true;
};

const saveNewUser = async () => {
  if (!addForm.name || !addForm.email || !addForm.role) {
    alert("Harap lengkapi Nama dan Email!");
    return;
  }

  try {
    const payload = {
      name: addForm.name,
      email: addForm.email,
      role: addForm.role,
    };

    await createUser(payload);
    await fetchUsers(selectedRole.value);

    showAddModal.value = false;
    alert(`Berhasil membuat akun ${addForm.role} baru! Kredensial telah dikirim via Email.`);
  } catch (err) {
    alert(err.response?.data?.message || "Validasi gagal dari server. Cek email apakah sudah terdaftar!");
  }
};

const openEdit = (user) => {
  editForm.id = user.id;
  editForm.name = user.name || "";
  editForm.email = user.email || "";
  editForm.institution = user.institution || user.author_profile?.institution || "";
  editFormUser.value = user;
  showEditModal.value = true;
};

const saveEdit = async () => {
  try {
    const payload = {
      name: editForm.name,
      email: editForm.email,
    };

    if (selectedRole.value === "penulis") {
      payload.institution = editForm.institution;
    }

    await editUser(editForm.id, payload);
    await fetchUsers(selectedRole.value);
    showEditModal.value = false;
  } catch (err) {
    alert(err.response?.data?.message || "Gagal update user");
  }
};

const handleDelete = async (id) => {
  if (!confirm("Yakin ingin menghapus user ini?")) return;

  try {
    await removeUser(id);
    await fetchUsers(selectedRole.value);
  } catch (err) {
    alert(err.response?.data?.message || "Gagal menghapus user");
  }
};
</script>

<style scoped>
.pagination-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
}

.modal-input {
  width: 100%;
  height: 48px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 0 14px;
  outline: none;
  background-color: white;
}

.modal-input:focus {
  border-color: #4B3027;
}

.modal-input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
</style>
