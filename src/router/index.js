import { createRouter, createWebHistory } from 'vue-router'

import DashboardPenulis from '../views/DashboardPenulis.vue'
import BukuSaya from '../views/BukuSaya.vue'
import DaftarReviewer from '../views/DaftarReviewer.vue'

import UploadDraft from '../views/buku/UploadDraft.vue'
import VerifikasiDraft from '../views/buku/VerifikasiDraft.vue'
import AtributBuku from '../views/buku/AtributBuku.vue'

const routes = [

  {
    path: '/',
    component: DashboardPenulis
  },

  {
    path: '/buku-saya',
    component: BukuSaya
  },

  {
    path: '/daftar-reviewer',
    component: DaftarReviewer
  },

  {
    path: '/upload-draft',
    component: UploadDraft
  },

  {
    path: '/verifikasi-draft',
    component: VerifikasiDraft
  },

  {
    path: '/atribut-buku',
    component: AtributBuku
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
