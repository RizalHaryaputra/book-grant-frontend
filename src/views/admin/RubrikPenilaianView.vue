<script setup>
import { ref, computed } from 'vue'
import AdminSidebar from '../../layouts/admin/AdminSidebar.vue'
import AppTopbar   from '../../layouts/shared/AppTopbar.vue'

import { fetchEntryPoint, fetchLink, parseLinks } from '../../services/api.js'

// State
const activeTab = ref('Buku Ajar') // 'Buku Ajar' | 'Buku Referensi'
const isLoading = ref(true)

// Data from API
const rubriks = ref([])

const showModal = ref(false)
const modalMode = ref('add') // 'add' | 'edit'
const editItem = ref(null)

const form = ref({
  name: '',
  description: '',
  type: 'Buku Ajar',
  weight: 0,
  status: 'active'
})

// Computed
const filteredRubriks = computed(() => {
  return rubriks.value.filter(r => r.type === activeTab.value)
})

const totalWeight = computed(() => {
  return filteredRubriks.value
    .filter(r => r.status === 'active')
    .reduce((sum, r) => sum + r.weight, 0)
})

const remainingWeightAdd = computed(() => {
  return 100 - totalWeight.value
})

const totalWeightExceptEdit = computed(() => {
  if (modalMode.value !== 'edit' || !editItem.value) return totalWeight.value
  return totalWeight.value - (editItem.value.status === 'active' ? editItem.value.weight : 0)
})

const previewTotalWeightEdit = computed(() => {
  if (form.value.status !== 'active') return totalWeightExceptEdit.value
  return totalWeightExceptEdit.value + (form.value.weight || 0)
})

// Methods
async function fetchRubriks() {
  isLoading.value = true
  try {
    const res = await fetchEntryPoint('/admin/rubrics')
    const data = await res.json()
    if (data.success) {
      rubriks.value = data.data.map(r => ({
        id: r.id,
        name: r.criteria,
        description: r.description || '',
        type: r.book_type,
        weight: r.weight,
        status: r.status === 1 ? 'active' : 'inactive',
        _hateoasLinks: parseLinks(r.links)
      }))
    }
  } catch (err) {
    console.error('Gagal mengambil data rubrik:', err)
  } finally {
    isLoading.value = false
  }
}

fetchRubriks()

function openAddModal() {
  form.value = {
    name: '',
    description: '',
    type: activeTab.value,
    weight: 0,
    status: 'active'
  }
  modalMode.value = 'add'
  showModal.value = true
}

function openEditModal(item) {
  editItem.value = item
  form.value = { ...item }
  modalMode.value = 'edit'
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveForm() {
  const payload = {
    criteria: form.value.name,
    book_type: form.value.type,
    description: form.value.description,
    weight: form.value.weight,
    status: form.value.status === 'active' ? 1 : 0
  }

  try {
    if (modalMode.value === 'add') {
      const res = await fetchEntryPoint('/admin/rubrics', {
        method: 'POST',
        body: payload
      })
      const data = await res.json()
      if (!data.success) {
        alert("Gagal menambahkan: " + (data.message || 'Unknown error'))
        if (data.errors) console.error(data.errors)
        return
      }
    } else {
      let res
      const links = editItem.value._hateoasLinks || {}
      if (links['update']) {
        res = await fetchLink(links['update'], { body: payload })
      } else {
        res = await fetchEntryPoint(`/admin/rubrics/${editItem.value.id}`, {
          method: 'PUT',
          body: payload
        })
      }
      
      const data = await res.json()
      if (!data.success) {
        alert("Gagal memperbarui: " + (data.message || 'Unknown error'))
        if (data.errors) console.error(data.errors)
        return
      }
    }
    
    await fetchRubriks()
    closeModal()
  } catch (err) {
    console.error('Gagal menyimpan rubrik:', err)
    alert("Terjadi kesalahan koneksi.")
  }
}

async function deleteRubrik(item) {
  if(!confirm('Yakin ingin menghapus kriteria ini?')) return
  
  try {
    let res
    const links = item._hateoasLinks || {}
    if (links['delete']) {
      res = await fetchLink(links['delete'])
    } else {
      res = await fetchEntryPoint(`/admin/rubrics/${item.id}`, { method: 'DELETE' })
    }
    
    const data = await res.json()
    if (data.success) {
      await fetchRubriks()
    } else {
      alert("Gagal menghapus: " + data.message)
    }
  } catch (err) {
    console.error("Gagal menghapus rubrik:", err)
    alert("Terjadi kesalahan koneksi.")
  }
}
</script>

<template>
  <div class="layout">
    <AdminSidebar />
    <div class="main-area">
      <AppTopbar page-title="Manajemen Rubrik Penilaian" />
      
      <div class="page-header">
        <div class="header-text">
          <p class="subtitle">Kelola Kriteria & Bobot Penilaian</p>
        </div>
      </div>

      <div class="card content-card">
        <!-- Tabs & Add Button -->
        <div class="action-bar">
          <div class="tabs">
            <button class="tab-btn" :class="{ active: activeTab === 'Buku Ajar' }" @click="activeTab = 'Buku Ajar'">Buku Ajar</button>
            <button class="tab-btn" :class="{ active: activeTab === 'Buku Referensi' }" @click="activeTab = 'Buku Referensi'">Buku Referensi</button>
          </div>
          <button class="btn-tambah" @click="openAddModal">Tambah Data</button>
        </div>

        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-text">Total bobot aktif</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar" :style="{ width: totalWeight + '%' }" :class="{ 'full': totalWeight === 100, 'over': totalWeight > 100 }"></div>
          </div>
          <div class="progress-value">
            <span :class="{ 'text-green': totalWeight === 100, 'text-red': totalWeight > 100 }">{{ totalWeight }}</span><span class="text-gray">/100</span>
          </div>
        </div>

        <!-- Table -->
        <div class="table-section">
          <h3 class="table-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
            Kriteria Rubrik - {{ activeTab }}
          </h3>
          
          <div class="table-responsive">
            <table class="rubrik-table">
              <thead>
                <tr>
                  <th>NAMA KRITERIA</th>
                  <th>DESKRIPSI</th>
                  <th>BOBOT</th>
                  <th>STATUS</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoading">
                  <td colspan="5" class="text-center empty-state">Memuat data...</td>
                </tr>
                <tr v-else-if="filteredRubriks.length === 0">
                  <td colspan="5" class="text-center empty-state">Tidak ada data kriteria.</td>
                </tr>
                <tr v-for="item in filteredRubriks" :key="item.id">
                  <td class="col-name">{{ item.name }}</td>
                  <td class="col-desc">{{ item.description }}</td>
                  <td><span class="weight-badge">{{ item.weight }}%</span></td>
                  <td>
                    <span class="status-badge" :class="item.status === 'active' ? 'status-active' : 'status-inactive'">
                      {{ item.status === 'active' ? 'Aktif' : 'Nonaktif' }}
                    </span>
                  </td>
                  <td>
                    <div class="action-btns">
                      <button class="btn-icon" @click="openEditModal(item)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button class="btn-icon btn-delete" @click="deleteRubrik(item)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ modalMode === 'add' ? 'Tambah Data' : 'Edit Data' }}</h3>
          <p class="modal-subtitle">{{ form.type }} · Sisa bobot: {{ modalMode === 'add' ? remainingWeightAdd : (100 - totalWeightExceptEdit) }}%</p>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nama kriteria</label>
            <input type="text" v-model="form.name" placeholder="Kesesuaian Kurikulum" class="form-input" />
          </div>
          <div class="form-group">
            <label>Deskripsi <span class="text-gray">(opsional)</span></label>
            <textarea v-model="form.description" placeholder="Jelaskan aspek yang dinilai..." class="form-input textarea"></textarea>
          </div>
          <div class="form-group">
            <label>Jenis buku</label>
            <select v-model="form.type" class="form-input select-input">
              <option value="Buku Ajar">Buku Ajar</option>
              <option value="Buku Referensi">Buku Referensi</option>
            </select>
          </div>
          <div class="form-group">
            <label>Bobot (%) <span class="text-gray">total aktif harus = 100%</span></label>
            <input type="number" v-model.number="form.weight" placeholder="10" class="form-input" />
          </div>

          <!-- Preview Edit -->
          <div v-if="modalMode === 'edit'" class="preview-box">
            <div class="preview-title">Preview total bobot setelah disimpan</div>
            <div class="preview-row"><span>Bobot aktif ada:</span> <span>{{ totalWeightExceptEdit }}%</span></div>
            <div class="preview-row"><span>Bobot kriteria ini:</span> <span>{{ form.status === 'active' ? form.weight : 0 }}%</span></div>
            <div class="preview-row total-row">
              <span>Total:</span> 
              <span :class="{'text-green': previewTotalWeightEdit === 100, 'text-red': previewTotalWeightEdit > 100}">{{ previewTotalWeightEdit }}%</span>
            </div>
            <div class="preview-progress">
              <div class="progress-bar-wrap sm-wrap">
                <div class="progress-bar" :style="{ width: Math.min(previewTotalWeightEdit, 100) + '%' }" :class="{ 'full': previewTotalWeightEdit === 100, 'over': previewTotalWeightEdit > 100 }"></div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="form.status" class="form-input select-input">
              <option value="active">active — digunakan dalam penilaian</option>
              <option value="inactive">inactive — tidak digunakan</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-outline" @click="closeModal">Batal</button>
          <button class="btn-solid" @click="saveForm">Simpan Data</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout { display: flex; min-height: 100vh; background: linear-gradient(135deg, #f0ebe3, #e8ddd0); }
.main-area { margin-left: 0px; flex: 1; padding: 20px 24px; min-height: 100vh; display: flex; flex-direction: column; }

.page-header { margin-bottom: 16px; margin-top: -6px; }
.subtitle { font-size: 13px; color: #555; margin: 0; }

.content-card {
  background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 24px; flex: 1; display: flex; flex-direction: column; gap: 24px;
}

/* Tabs & Action */
.action-bar { display: flex; justify-content: space-between; align-items: center; }
.tabs { display: flex; gap: 8px; }
.tab-btn {
  background: transparent; border: 1.5px solid #d4c4b0; color: #6b4c38;
  padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; outline: none;
}
.tab-btn:hover { background: #f5f2ee; }
.tab-btn.active { background: #fff; border-color: #2a1a10; color: #2a1a10; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }

.btn-tambah {
  background: #4a3528; color: #fff; border: none; padding: 9px 18px;
  border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s;
}
.btn-tambah:hover { background: #2a1a10; }

/* Progress Bar */
.progress-container {
  display: flex; align-items: center; gap: 16px; padding: 12px 20px;
  border: 1px solid #ebdcd0; border-radius: 10px; background: #faf8f5;
}
.progress-text { font-size: 13px; color: #444; font-weight: 500; white-space: nowrap; }
.progress-bar-wrap { flex: 1; height: 8px; background: #e0d8d0; border-radius: 4px; overflow: hidden; }
.progress-bar { height: 100%; background: #4caf50; transition: width 0.3s ease, background 0.3s ease; }
.progress-bar.full { background: #2e7d32; }
.progress-bar.over { background: #dc3545; }
.progress-value { font-size: 16px; font-weight: 700; white-space: nowrap; }
.text-green { color: #2e7d32; }
.text-red { color: #dc3545; }
.text-gray { color: #888; font-weight: 500; font-size: 13px; }

/* Table Section */
.table-section { flex: 1; display: flex; flex-direction: column; gap: 12px; }
.table-title { font-size: 15px; font-weight: 700; color: #222; display: flex; align-items: center; gap: 8px; margin: 0; }
.table-responsive { overflow-x: auto; background: #fff; border: 1px solid #ebdcd0; border-radius: 12px; }
.rubrik-table { width: 100%; border-collapse: collapse; min-width: 800px; }
.rubrik-table th {
  background: #fdfcfa; color: #666; font-size: 11px; font-weight: 700;
  text-align: left; padding: 14px 16px; border-bottom: 1px solid #ebdcd0;
  letter-spacing: 0.5px;
}
.rubrik-table td { padding: 16px; border-bottom: 1px solid #f0ede9; font-size: 13px; vertical-align: top; }
.rubrik-table tr:last-child td { border-bottom: none; }
.rubrik-table tbody tr:hover { background: #fcfbf9; }

.field-badge { background: #fffaf0; color: #b08a5d; border: 1px solid #ebdcd0; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-family: monospace; font-size: 12px; }
.col-name { font-weight: 600; color: #222; }
.col-desc { color: #555; line-height: 1.5; max-width: 300px; }
.weight-badge { background: #fdf5f0; color: #8a6d5c; border: 1px solid #ebdcd0; padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 12px; }
.status-badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; display: inline-block; }
.status-active { background: #e6f6ee; color: #28a745; }
.status-inactive { background: #f5f5f5; color: #888; }

.action-btns { display: flex; gap: 6px; }
.btn-icon {
  width: 32px; height: 32px; border-radius: 6px; border: 1px solid #ebdcd0; background: #fff;
  color: #666; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
}
.btn-icon:hover { background: #f5f2ee; color: #222; }
.btn-delete:hover { background: #fff5f5; border-color: #f5c6cb; color: #dc3545; }
.empty-state { padding: 40px !important; color: #888; font-size: 14px; }

/* Modal */
.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
  z-index: 1000; backdrop-filter: blur(2px);
}
.modal-card {
  background: #fff; width: 480px; max-width: 90vw; border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; flex-direction: column;
  max-height: 90vh;
}
.modal-header { padding: 20px 24px 16px; border-bottom: 1px solid #f0ede9; }
.modal-header h3 { margin: 0 0 4px; font-size: 18px; font-weight: 700; color: #111; }
.modal-subtitle { margin: 0; font-size: 12px; color: #666; }

.modal-body { padding: 20px 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 13px; font-weight: 600; color: #222; }
.form-input {
  padding: 10px 12px; border: 1px solid #d4ccc4; border-radius: 8px;
  font-family: 'Inter', sans-serif; font-size: 13.5px; color: #333; outline: none; transition: border-color 0.2s;
}
.form-input:focus { border-color: #a89080; }
.textarea { height: 80px; resize: vertical; }
.select-input { appearance: none; background-image: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 24 24" fill="%23666"><path d="M7 10l5 5 5-5z"/></svg>'); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }

/* Preview Edit Box */
.preview-box {
  background: #fdfcfa; border: 1px solid #ebdcd0; border-radius: 8px; padding: 14px;
  display: flex; flex-direction: column; gap: 8px; margin-top: 4px;
}
.preview-title { font-size: 12px; font-weight: 600; color: #555; margin-bottom: 4px; }
.preview-row { display: flex; justify-content: space-between; font-size: 13px; color: #444; }
.total-row { font-weight: 700; border-top: 1px dashed #ebdcd0; padding-top: 8px; margin-top: 4px; color: #111; }
.sm-wrap { height: 6px; margin-top: 6px; }

.modal-footer {
  padding: 16px 24px; border-top: 1px solid #f0ede9; display: flex; justify-content: flex-end; gap: 12px;
  background: #faf8f5; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;
}
.btn-outline {
  padding: 9px 18px; border-radius: 8px; border: 1px solid #d4ccc4; background: #fff;
  color: #444; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s;
}
.btn-outline:hover { background: #f5f2ee; }
.btn-solid {
  padding: 9px 20px; border-radius: 8px; border: none; background: #2a1a10;
  color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s;
}
.btn-solid:hover { background: #1a0f09; }
</style>
