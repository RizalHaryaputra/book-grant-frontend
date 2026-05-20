<script setup>
import { ref, computed } from 'vue'
import AdminSidebar from '../../layouts/admin/AdminSidebar.vue'
import AppTopbar    from '../../layouts/shared/AppTopbar.vue'

// ─── State ────────────────────────────────────────────────────────────────────
const activeFilter           = ref('Semua')
const showModal              = ref(false)
const selectedRow            = ref(null)
const modalSelectedReviewers = ref([])
const modalTenggat           = ref('')   // ← NEW: input tenggat reviewer

const filters = ['Semua', 'Belum diplot', 'Sebagian', 'Lengkap']

// Data reviewer dengan informasi lengkap (nama, jabatan, jumlah naskah aktif)
const allReviewers = [
  { id: 1, name: 'Dr. Arief Setiawan, M.Kom',  dept: 'Teknik Informatika', aktif: 1 },
  { id: 2, name: 'Prof. Rina Nurhayati, Ph.D',  dept: 'Sistem Informasi',   aktif: 2 },
  { id: 3, name: 'Dr. Hasan Kurniawan',          dept: 'Jaringan Komputer',  aktif: 3 },
  { id: 4, name: 'Dr. Siti Aminah, M.T',         dept: 'Teknik Komputer',    aktif: 0 },
  { id: 5, name: 'Prof. Budi Santoso, Ph.D',     dept: 'Sistem Informasi',   aktif: 1 },
  { id: 6, name: 'Dr. Maya Dewi, M.Kom',         dept: 'Teknik Informatika', aktif: 2 },
]

const manuscripts = ref([
  { id: 1, judul: 'Pemrograman Berorientasi Objek', kategori: 'Buku Ajar',      reviewers: [{ id: 1, name: 'Dr. Arief' }, { id: 2, name: 'Prof. Rina' }], tenggat: '5 Juni 2026', status: 'Lengkap' },
  { id: 2, judul: 'Algoritma dan Struktur Data',    kategori: 'Buku Referensi', reviewers: [{ id: 2, name: 'Prof. Rina' }, { id: 3, name: 'Dr. Hasan' }],  tenggat: '5 Juni 2026', status: 'Lengkap' },
  { id: 3, judul: 'Jaringan Komputer Dasar',        kategori: 'Buku Ajar',      reviewers: [{ id: 3, name: 'Dr. Hasan' }],                                  tenggat: '5 Juni 2026', status: 'Sebagian' },
  { id: 4, judul: 'Basis Data Relasional',          kategori: 'Buku Referensi', reviewers: [],                                                              tenggat: '5 Juni 2026', status: 'Belum diplot' },
  { id: 5, judul: 'Pemrograman Berorientasi Objek', kategori: 'Buku Ajar',      reviewers: [],                                                              tenggat: '5 Juni 2026', status: 'Belum diplot' },
  { id: 6, judul: 'Pemrograman Web',                kategori: 'Buku Referensi', reviewers: [],                                                              tenggat: '5 Juni 2026', status: 'Belum diplot' },
  { id: 7, judul: 'Data Mining',                    kategori: 'Buku Ajar',      reviewers: [],                                                              tenggat: '5 Juni 2026', status: 'Belum diplot' },
])

// ─── Computed ─────────────────────────────────────────────────────────────────
const filteredManuscripts = computed(() => {
  if (activeFilter.value === 'Semua') return manuscripts.value
  return manuscripts.value.filter(m => m.status === activeFilter.value)
})

// ─── Modal helpers ────────────────────────────────────────────────────────────
function openModal(row) {
  selectedRow.value            = row
  modalSelectedReviewers.value = row.reviewers.map(r => ({ ...r }))
  // Pre-fill tanggal dari data naskah (konversi ke format yyyy-mm-dd untuk input)
  modalTenggat.value = toInputDate(row.tenggat)
  showModal.value = true
}
function closeModal() {
  showModal.value   = false
  selectedRow.value = null
  modalTenggat.value = ''
}
function toggleReviewer(rv) {
  const idx = modalSelectedReviewers.value.findIndex(r => r.id === rv.id)
  if (idx >= 0) modalSelectedReviewers.value.splice(idx, 1)
  else          modalSelectedReviewers.value.push({ id: rv.id, name: rv.name.split(',')[0] })
}
function isSelected(rv) {
  return modalSelectedReviewers.value.some(r => r.id === rv.id)
}
function saveReviewers() {
  if (!selectedRow.value) return
  const m = manuscripts.value.find(m => m.id === selectedRow.value.id)
  if (m) {
    m.reviewers = [...modalSelectedReviewers.value]
    m.tenggat   = fromInputDate(modalTenggat.value) || m.tenggat
    m.status    = m.reviewers.length === 0 ? 'Belum diplot'
               : m.reviewers.length >= 2  ? 'Lengkap'
               :                            'Sebagian'
  }
  closeModal()
}
function removeTag(manuscriptId, reviewerId) {
  const m = manuscripts.value.find(m => m.id === manuscriptId)
  if (!m) return
  m.reviewers = m.reviewers.filter(r => r.id !== reviewerId)
  m.status    = m.reviewers.length === 0 ? 'Belum diplot' : 'Sebagian'
}

// ─── Date helpers ─────────────────────────────────────────────────────────────
// "5 Juni 2026" → "2026-06-05"
function toInputDate(str) {
  if (!str) return ''
  const months = { Januari:1, Februari:2, Maret:3, April:4, Mei:5, Juni:6, Juli:7, Agustus:8, September:9, Oktober:10, November:11, Desember:12 }
  const parts  = str.trim().split(' ')
  if (parts.length !== 3) return ''
  const d = parts[0].padStart(2, '0')
  const m = String(months[parts[1]] || 1).padStart(2, '0')
  const y = parts[2]
  return `${y}-${m}-${d}`
}
// "2026-06-05" → "5 Juni 2026"
function fromInputDate(str) {
  if (!str) return ''
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
  const [y, m, d] = str.split('-')
  return `${parseInt(d)} ${months[parseInt(m)-1]} ${y}`
}
</script>

<template>
  <div class="layout">
    <AdminSidebar />

    <div class="main-area">
      <AppTopbar page-title="Plotting Reviewer" user-name="Ngafifah" user-role="Admin" />

      <!-- Content Card -->
      <div class="content-card">
        <div class="card-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#555"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          <h2 class="card-title">Daftar Naskah &amp; Tugas Reviewer</h2>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs">
          <button
            v-for="f in filters" :key="f"
            class="filter-btn" :class="{ active: activeFilter === f }"
            @click="activeFilter = f"
          >{{ f }}</button>
        </div>

        <!-- Table -->
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>JUDUL NASKAH</th>
                <th>KATEGORI</th>
                <th>REVIEWER</th>
                <th>TENGGAT</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredManuscripts" :key="item.id">
                <td class="judul-cell">{{ item.judul }}</td>
                <td class="kategori-cell">{{ item.kategori }}</td>
                <td class="reviewer-cell">
                  <div class="reviewer-tags" v-if="item.reviewers.length > 0">
                    <span v-for="rv in item.reviewers" :key="rv.id" class="reviewer-tag">
                      {{ rv.name }}
                      <button class="tag-x" @click="removeTag(item.id, rv.id)">×</button>
                    </span>
                    <button class="tambah-tag" @click="openModal(item)">Tambah +</button>
                  </div>
                  <div v-else>
                    <button class="tugaskan-btn" @click="openModal(item)">Tugaskan Reviewer</button>
                  </div>
                </td>
                <td class="tenggat-cell">{{ item.tenggat }}</td>
                <td class="status-cell">
                  <span class="badge" :class="'badge-' + item.status.toLowerCase().replace(/ /g, '-')">
                    {{ item.status }}
                  </span>
                </td>
                <td class="action-cell">
                  <button class="icon-btn" @click="openModal(item)" :id="'edit-btn-' + item.id">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ═══ MODAL POP-UP ════════════════════════════════════════════════════ -->
    <Transition name="fade">
      <div class="overlay" v-if="showModal" @click.self="closeModal" id="modal-overlay">
        <div class="modal" id="modal-box">

          <!-- ── Judul Modal ── -->
          <div class="modal-top">
            <h3 class="modal-title">Tugaskan Reviewer</h3>
          </div>

          <div class="modal-body">
            <!-- Judul Naskah info -->
            <p class="modal-naskah" v-if="selectedRow">
              Judul Naskah: <strong>{{ selectedRow.judul }}</strong>
            </p>

            <!-- ── Tenggat Review ── -->
            <div class="field-group">
              <label class="field-label" for="input-tenggat">Tenggat Review</label>
              <div class="date-input-wrap">
                <input
                  id="input-tenggat"
                  type="date"
                  class="date-input"
                  v-model="modalTenggat"
                />
                <svg class="date-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
                </svg>
              </div>
            </div>

            <!-- ── Pilih Reviewer ── -->
            <div class="field-group">
              <label class="field-label">Pilih Reviewer</label>
              <div class="rv-list">
                <label
                  v-for="rv in allReviewers" :key="rv.id"
                  class="rv-item"
                  :class="{ 'rv-selected': isSelected(rv) }"
                  :id="'rv-opt-' + rv.id"
                >
                  <!-- Native checkbox styled -->
                  <div class="rv-check-wrap">
                    <input
                      type="checkbox"
                      :checked="isSelected(rv)"
                      @change="toggleReviewer(rv)"
                      class="rv-native-check"
                      :id="'chk-' + rv.id"
                    />
                    <div class="rv-custom-check" :class="{ checked: isSelected(rv) }">
                      <svg v-if="isSelected(rv)" width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                  </div>
                  <!-- Text -->
                  <div class="rv-info">
                    <span class="rv-name">{{ rv.name }}</span>
                    <span class="rv-sub">{{ rv.dept }}: {{ rv.aktif }} naskah aktif</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- ── Footer ── -->
          <div class="modal-footer">
            <button class="btn-batal" @click="closeModal" id="btn-batal">Batal</button>
            <button class="btn-simpan" @click="saveReviewers" id="btn-simpan">Simpan</button>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ── Layout ── */
.layout { display: flex; min-height: 100vh; background: linear-gradient(135deg, #f0ebe3, #e8ddd0); }
.main-area { margin-left: 210px; flex: 1; padding: 20px 24px; min-height: 100vh; }

/* ── Content Card ── */
.content-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.card-title { font-size: 16px; font-weight: 600; color: #1a1a1a; }

/* ── Filter ── */
.filter-tabs { display: flex; gap: 10px; margin-bottom: 20px; }
.filter-btn {
  padding: 7px 20px; border-radius: 20px;
  border: 1.5px solid #c8b8a8; background: transparent;
  color: #4a3528; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.15s; font-family: 'Inter', sans-serif;
}
.filter-btn:hover:not(.active) { background: rgba(0,0,0,0.04); }
.filter-btn.active { background: #d4b896; border-color: #c8a882; color: #2a1a10; font-weight: 600; }

/* ── Table ── */
.table-wrapper { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table thead tr { background: #f5f2ee; }
.data-table th { padding: 10px 16px; text-align: left; font-size: 11px; font-weight: 600; color: #888; letter-spacing: 0.6px; text-transform: uppercase; }
.data-table tbody tr { border-bottom: 1px solid #f0ede9; transition: background 0.1s; }
.data-table tbody tr:hover { background: #faf8f5; }
.data-table tbody tr:last-child { border-bottom: none; }
.data-table td { padding: 13px 16px; vertical-align: middle; }

.judul-cell { font-size: 13.5px; font-weight: 600; color: #1a1a1a; }
.kategori-cell { font-size: 13px; color: #555; }
.reviewer-cell { min-width: 220px; }

.reviewer-tags { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.reviewer-tag {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 14px;
  border: 1.5px solid #c8b8a8; background: #fff;
  font-size: 12px; color: #3d2b1f; font-weight: 500;
}
.tag-x { font-size: 14px; color: #999; cursor: pointer; background: none; border: none; line-height: 1; transition: color 0.1s; }
.tag-x:hover { color: #cc3333; }
.tambah-tag {
  padding: 4px 10px; border-radius: 14px;
  border: 1.5px dashed #c8b8a8; background: #fff;
  font-size: 12px; color: #888; cursor: pointer;
  transition: all 0.15s; font-family: 'Inter', sans-serif;
}
.tambah-tag:hover { border-color: #a89080; color: #555; }
.tugaskan-btn {
  padding: 5px 13px; border-radius: 14px;
  border: 1.5px dashed #c8b8a8; background: #fff;
  font-size: 12px; color: #888; cursor: pointer;
  transition: all 0.15s; font-family: 'Inter', sans-serif;
}
.tugaskan-btn:hover { border-color: #a89080; color: #555; background: #f9f6f3; }
.tenggat-cell { font-size: 13px; color: #444; white-space: nowrap; }

/* ── Badges ── */
.badge { padding: 4px 13px; border-radius: 12px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.badge-lengkap      { background: #d4f0e0; color: #1a7a44; }
.badge-sebagian     { background: #dce8f8; color: #2255a8; }
.badge-belum-diplot { color: #d63333; font-weight: 700; }

/* ── Action ── */
.action-cell { text-align: center; }
.icon-btn {
  width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;
  border-radius: 8px; border: 1.5px solid #e0d8d0; background: #fff; color: #666;
  cursor: pointer; transition: all 0.15s;
}
.icon-btn:hover { border-color: #a89080; background: #f5f0ea; color: #3d2b1f; }

/* ══════════════════════════════════════════════
   MODAL  —  sesuai screenshot persis
══════════════════════════════════════════════ */
.overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
}

.modal {
  background: #ffffff;
  border-radius: 12px;
  width: 440px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}

/* Modal top — judul */
.modal-top {
  padding: 22px 24px 0;
}
.modal-title {
  font-size: 16px;
  font-weight: 700;
  color: #111111;
  margin: 0;
}

/* Modal body — scroll jika panjang */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Judul naskah info line */
.modal-naskah {
  font-size: 13px;
  color: #555;
  margin: 0;
  line-height: 1.5;
}
.modal-naskah strong { color: #111; font-weight: 600; }

/* ── Field Group ── */
.field-group { display: flex; flex-direction: column; gap: 7px; }
.field-label {
  font-size: 13px;
  font-weight: 500;
  color: #222;
}

/* ── Date Input ── */
.date-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.date-input {
  width: 100%;
  padding: 10px 40px 10px 14px;
  border: 1.5px solid #d4ccc4;
  border-radius: 8px;
  font-size: 13.5px;
  color: #222;
  font-family: 'Inter', sans-serif;
  background: #fff;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.15s;
}
.date-input:focus { border-color: #a89080; }
/* Hide native calendar icon */
.date-input::-webkit-calendar-picker-indicator { opacity: 0; position: absolute; right: 0; width: 40px; height: 100%; cursor: pointer; }
.date-icon {
  position: absolute;
  right: 12px;
  color: #888;
  pointer-events: none;
}

/* ── Reviewer List ── */
.rv-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rv-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 8px;
  border: 1.5px solid #d8d4ce;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  user-select: none;
}
.rv-item:hover { border-color: #a89080; background: #faf7f4; }
.rv-selected   { border-color: #3d2b1f; background: #fff; }

/* Checkbox wrapper */
.rv-check-wrap { position: relative; flex-shrink: 0; width: 20px; height: 20px; }
.rv-native-check { position: absolute; opacity: 0; width: 0; height: 0; }
.rv-custom-check {
  width: 20px; height: 20px;
  border-radius: 4px;
  border: 2px solid #b0a898;
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.rv-custom-check.checked {
  background: #2a1a10;
  border-color: #2a1a10;
}

/* Reviewer info */
.rv-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.rv-name {
  font-size: 13.5px;
  font-weight: 600;
  color: #111;
  line-height: 1.3;
}
.rv-sub {
  font-size: 11.5px;
  color: #888;
  line-height: 1.3;
}

/* ── Footer ── */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 24px;
  border-top: 1px solid #ede9e3;
}

.btn-batal {
  padding: 9px 22px;
  border-radius: 8px;
  border: 1.5px solid #d0c8c0;
  background: #fff;
  color: #444;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: background 0.15s;
}
.btn-batal:hover { background: #f5f2ee; }

.btn-simpan {
  padding: 9px 26px;
  border-radius: 8px;
  border: none;
  background: #2a1a10;
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: background 0.15s;
}
.btn-simpan:hover { background: #1a0f09; }

/* ── Transition ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
.fade-enter-active .modal,
.fade-leave-active .modal { transition: transform 0.2s ease; }
.fade-enter-from .modal   { transform: scale(0.96) translateY(10px); }
.fade-leave-to .modal     { transform: scale(0.96) translateY(10px); }
</style>
