import { createRouter, createWebHistory } from 'vue-router'

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
import RevisiPraCetak      from '../views/review/RevisiPraCetak.vue' // ← tambah import

const routes = [

  { path: '/',           component: DashboardPenulis },
  { path: '/buku-saya',  component: BukuSaya },

  { path: '/detail-buku/:id', component: DetailBuku, props: true },

  // === Alur Upload Draft ===
  { path: '/upload-draft',     component: UploadDraft },
  { path: '/verifikasi-draft', component: VerifikasiDraft },
  { path: '/atribut-buku',     component: AtributBuku },

  // === Halaman yang memerlukan manuscriptId ===
  { path: '/dokumen-administrasi/:id', component: DokumenAdministrasi, props: true },
  { path: '/revisi-naskah/:id',        component: RevisiNaskah,        props: true },
  { path: '/hasil-review/:id',         component: HasilReview,         props: true },
  { path: '/riwayat-dokumen/:id',      component: RiwayatDokumen,      props: true },
  { path: '/revisi-pra-cetak/:id',     component: RevisiPraCetak,      props: true }, // ← tambah route
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router