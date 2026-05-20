import { createRouter, createWebHistory } from 'vue-router'

// ─── Admin Views ────────────────────────────────────────────────────────────
const adminRoutes = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/admin/DashboardView.vue'),
    meta: { title: 'Dashboard', role: 'admin' },
  },
  {
    path: '/admin/manajemen-user',
    name: 'AdminManajemenUser',
    component: () => import('../views/admin/ManajemenUserView.vue'),
    meta: { title: 'Manajemen User', role: 'admin' },
  },
  {
    path: '/admin/daftar-tugas',
    name: 'AdminDaftarTugas',
    component: () => import('../views/admin/DaftarTugasView.vue'),
    meta: { title: 'Daftar Tugas', role: 'admin' },
  },
  {
    path: '/admin/proposal-buku',
    name: 'AdminProposalBuku',
    component: () => import('../views/admin/ProposalBukuView.vue'),
    meta: { title: 'Proposal Buku', role: 'admin' },
  },
  {
    path: '/admin/plotting-reviewer',
    name: 'AdminPlottingReviewer',
    component: () => import('../views/admin/PlottingReviewerView.vue'),
    meta: { title: 'Plotting Reviewer', role: 'admin' },
  },
  {
    path: '/admin/monitoring-reviewer',
    name: 'AdminMonitoringReviewer',
    component: () => import('../views/admin/MonitoringReviewerView.vue'),
    meta: { title: 'Monitoring Reviewer', role: 'admin' },
  },
  {
    path: '/admin/notifikasi',
    name: 'AdminNotifikasi',
    component: () => import('../views/admin/NotifikasiView.vue'),
    meta: { title: 'Notifikasi', role: 'admin' },
  },
  {
    path: '/admin/settings',
    name: 'AdminSettings',
    component: () => import('../views/admin/SettingsView.vue'),
    meta: { title: 'Settings', role: 'admin' },
  },
]

// ─── Reviewer Views ──────────────────────────────────────────────────────────
const reviewerRoutes = [
  {
    path: '/reviewer',
    redirect: '/reviewer/daftar-tugas',
  },
  {
    path: '/reviewer/dashboard',
    name: 'ReviewerDashboard',
    component: () => import('../views/reviewer/DashboardView.vue'),
    meta: { title: 'Dashboard', role: 'reviewer' },
  },
  {
    path: '/reviewer/daftar-tugas',
    name: 'ReviewerDaftarTugas',
    component: () => import('../views/reviewer/DaftarTugasView.vue'),
    meta: { title: 'Daftar Tugas', role: 'reviewer' },
  },
  {
    path: '/reviewer/rubrik-penilaian',
    name: 'ReviewerRubrikPenilaian',
    component: () => import('../views/reviewer/RubrikPenilaianView.vue'),
    meta: { title: 'Rubrik Penilaian', role: 'reviewer' },
  },
  {
    path: '/reviewer/riwayat-review',
    name: 'ReviewerRiwayatReview',
    component: () => import('../views/reviewer/RiwayatReviewView.vue'),
    meta: { title: 'Riwayat Review', role: 'reviewer' },
  },
  {
    path: '/reviewer/support',
    name: 'ReviewerSupport',
    component: () => import('../views/reviewer/SupportView.vue'),
    meta: { title: 'Support', role: 'reviewer' },
  },
  {
    path: '/reviewer/settings',
    name: 'ReviewerSettings',
    component: () => import('../views/reviewer/SettingsView.vue'),
    meta: { title: 'Settings', role: 'reviewer' },
  },
]

// ─── Root ────────────────────────────────────────────────────────────────────
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/admin/plotting-reviewer' },
    ...adminRoutes,
    ...reviewerRoutes,
  ],
})

export default router
