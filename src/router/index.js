import { createRouter, createWebHistory } from 'vue-router'

import DashboardPenulis    from '../views/DashboardPenulis.vue'
import BukuSaya            from '../views/BukuSaya.vue'
import DetailBuku          from '../views/DetailBuku.vue'

// Upload Draft (alur 3 langkah)
import UploadDraft         from '../views/buku/UploadDraft.vue'
import VerifikasiDraft     from '../views/buku/VerifikasiDraft.vue'
import AtributBuku         from '../views/buku/AtributBuku.vue'

// Review & Revisi — hanya bisa diakses lewat Detail Buku (butuh manuscriptId valid)
import DokumenAdministrasi from '../views/review/DokumenAdministrasi.vue'
import RevisiNaskah        from '../views/review/UploadRevisi.vue'
import HasilReview         from '../views/review/HasilReview.vue'
import RiwayatDokumen    from '../views/RiwayatDokumen.vue'

const routes = [

  { path: '/',            component: DashboardPenulis },
  { path: '/buku-saya',  component: BukuSaya },

  // manuscriptId dikirim dari BukuSaya → DetailBuku lewat params
  { path: '/detail-buku/:id', component: DetailBuku, props: true },

  // === Alur Upload Draft ===
  { path: '/upload-draft',     component: UploadDraft },
  { path: '/verifikasi-draft', component: VerifikasiDraft },
  { path: '/atribut-buku',     component: AtributBuku },

  // === Halaman yang memerlukan manuscriptId — masuk lewat Detail Buku ===
  { path: '/dokumen-administrasi/:manuscriptId', component: DokumenAdministrasi, props: true },
  { path: '/revisi-naskah/:manuscriptId',        component: RevisiNaskah,        props: true },
  { path: '/hasil-review/:manuscriptId',         component: HasilReview,         props: true },
  { path: '/riwayat-dokumen/:manuscriptId', component: RiwayatDokumen, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router