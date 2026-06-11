<template>
  <div class="verifikasi-page">

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main -->
    <main class="main-content">

      <!-- Topbar -->
      <div class="topbar">
        <div class="breadcrumb">Manuskrip Baru › Unggah Draf Awal › Verifikasi Draf</div>
        <img src="https://i.pravatar.cc/40" alt="" />
      </div>

      <!-- Redirect warning jika tidak ada file draft -->
      <div v-if="!draftFile" class="error-msg">
        Data draf tidak ditemukan.
        <button @click="router.push('/upload-draft')">← Kembali Unggah Draf</button>
      </div>

      <template v-else>
        <!-- Card -->
        <section class="verify-card">

          <span class="mini-title">LANGKAH 2 DARI 3</span>

          <h1>
            {{ isDone ? 'Verifikasi selesai!' : 'Sedang memeriksa kelengkapan naskah Anda...' }}
          </h1>

          <p class="desc">
            Sistem kami sedang memvalidasi struktur, metadata, dan format dokumen
            untuk memastikan standar kualitas Loom &amp; Ink terpenuhi.
          </p>

          <!-- Validation Box -->
          <div class="validation-box">

            <div class="validation-item" :class="{ 'active-item': step >= 1, 'done-item': step > 1 }">
              <div class="icon">📄</div>
              <h2>Jenis File</h2>
              <p>Memastikan format dokumen adalah .pdf atau .docx.</p>
              <span :class="statusClass(1)">{{ statusLabel(1) }}</span>
            </div>

            <div class="validation-item" :class="{ 'active-item': step >= 2, 'done-item': step > 2 }">
              <div class="icon">💾</div>
              <h2>Ukuran File</h2>
              <p>Maksimum kapasitas berkas 5 MB untuk optimasi.</p>
              <span :class="statusClass(2)">{{ statusLabel(2) }}</span>
            </div>

            <div class="validation-item" :class="{ 'active-item': step >= 3, 'done-item': step > 3 }">
              <div class="icon">⚙</div>
              <h2>Metadata</h2>
              <p>Memverifikasi nama file dan tipe dokumen.</p>
              <span :class="statusClass(3)">{{ statusLabel(3) }}</span>
            </div>

          </div>

          <!-- Progress -->
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressWidth }"></div>
          </div>

          <!-- Button -->
          <button
            class="lanjut-btn"
            :disabled="!isDone"
            @click="router.push('/atribut-buku')"
          >
            {{ isDone ? 'Lanjut ke Atribut Buku →' : 'Memverifikasi...' }}
          </button>

          <p class="bottom-text">
            Proses verifikasi biasanya memakan waktu kurang dari 10 detik.
          </p>

        </section>
      </template>

    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const router = useRouter()

const draftFile = ref(null)
const step      = ref(0)   // 0=belum mulai, 1=cek jenis, 2=cek ukuran, 3=cek metadata, 4=selesai
const isDone    = computed(() => step.value >= 4)

const progressWidth = computed(() => {
  const map = { 0: '0%', 1: '33%', 2: '66%', 3: '90%', 4: '100%' }
  return map[step.value] || '0%'
})

function statusLabel(forStep) {
  if (step.value < forStep)     return 'Status: Menunggu...'
  if (step.value === forStep)   return 'Status: Memproses...'
  return '✅ Selesai'
}

function statusClass(forStep) {
  if (step.value > forStep) return 'status-done'
  if (step.value === forStep) return 'status-active'
  return ''
}

onMounted(() => {
  const raw = sessionStorage.getItem('draftFile')
  if (!raw) return

  try {
    draftFile.value = JSON.parse(raw)
  } catch {
    draftFile.value = null
    return
  }

  // Jalankan animasi verifikasi bertahap
  setTimeout(() => { step.value = 1 }, 600)
  setTimeout(() => { step.value = 2 }, 1800)
  setTimeout(() => { step.value = 3 }, 3000)
  setTimeout(() => { step.value = 4 }, 4200)
})
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', sans-serif; }
.verifikasi-page{ display:flex; min-height:100vh; background:#e9dfd2; }

.main-content{ flex:1; padding:20px; }

.topbar{ background:#f6f1e9; padding:18px 25px; border-radius:18px; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
.breadcrumb{ color:#75685e; font-size:14px; }
.topbar img{ width:42px; height:42px; border-radius:50%; }

.error-msg{ background:#fdecea; color:#c0392b; padding:15px 20px; border-radius:12px; margin-bottom:20px; display:flex; align-items:center; gap:12px; }
.error-msg button{ background:none; border:1px solid #c0392b; color:#c0392b; padding:6px 12px; border-radius:8px; cursor:pointer; font-size:13px; }

.verify-card{ background:white; border-radius:22px; padding:50px; text-align:center; }
.mini-title{ letter-spacing:5px; color:#7f7b72; font-size:14px; }
.verify-card h1{ font-size:48px; color:#35261d; max-width:850px; margin:20px auto; line-height:1.3; }
.desc{ color:#666; max-width:850px; margin:0 auto 40px; line-height:1.8; font-size:18px; }

.validation-box{ border:1px solid #e1d6ca; border-radius:16px; padding:30px; display:flex; gap:20px; justify-content:center; margin-bottom:35px; flex-wrap:wrap; }
.validation-item{ width:260px; border:1px solid #e5d8cc; border-radius:12px; padding:25px; text-align:left; background:#fff; transition:border-color 0.4s, background 0.4s; }
.active-item{ border-left:4px solid #5d7048; background:#f8faf5; }
.done-item{ border-left:4px solid #60774c; background:#eef5ea; }
.icon{ font-size:28px; margin-bottom:15px; }
.validation-item h2{ font-size:24px; color:#36261d; margin-bottom:10px; }
.validation-item p{ color:#666; line-height:1.7; margin-bottom:15px; }
.validation-item span{ color:#999; font-size:13px; }
.status-active{ color:#8b6914 !important; font-weight:600; }
.status-done{ color:#3a7d44 !important; font-weight:600; }

.progress-bar{ width:100%; max-width:900px; height:8px; background:#ddd; border-radius:20px; margin:0 auto 40px; overflow:hidden; }
.progress-fill{ height:100%; background:#647b50; border-radius:20px; transition:width 0.6s ease; }

.lanjut-btn{
  display:inline-block; background:#4a2c1f; color:white;
  border:none; padding:18px 45px; border-radius:10px;
  margin-bottom:25px; font-size:16px; cursor:pointer; transition:background 0.2s;
}
.lanjut-btn:hover:not(:disabled){ background:#6a3c2f; }
.lanjut-btn:disabled{ opacity:0.5; cursor:not-allowed; }
.bottom-text{ color:#777; font-size:14px; }
</style>
