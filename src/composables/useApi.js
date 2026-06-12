import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Inject Bearer token otomatis ke setiap request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

// Response interceptor — tangani error global
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const useApi = () => {

  // ── Dashboard ──────────────────────────────────────────────
  // GET /api/author/dashboard
  const getDashboard = () =>
    api.get('/author/dashboard')

  // ── Detail Naskah ──────────────────────────────────────────
  // GET /api/author/manuscripts/{id}
  const getManuscriptDetail = (manuscriptId) =>
    api.get(`/author/manuscripts/${manuscriptId}`)

  // PUT /api/author/manuscripts/{id}
  const updateManuscript = (manuscriptId, data) =>
    api.put(`/author/manuscripts/${manuscriptId}`, data)

  // ── Upload Draft Awal ──────────────────────────────────────
  // POST /api/author/manuscripts/drafts
  const createDraft = (formData) =>
    api.post('/author/manuscripts/drafts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

  // ── Riwayat File ───────────────────────────────────────────
  // GET /api/author/manuscripts/{id}/files
  const getFiles = (manuscriptId) =>
    api.get(`/author/manuscripts/${manuscriptId}/files`)

  // ── Dokumen Administrasi ───────────────────────────────────
  // GET /api/author/manuscripts/{id}/documents
  const getDocuments = (manuscriptId) =>
    api.get(`/author/manuscripts/${manuscriptId}/documents`)

  // POST /api/author/manuscripts/{id}/documents
  const uploadDocument = (manuscriptId, formData) =>
    api.post(`/author/manuscripts/${manuscriptId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

  // ── Hasil Review ───────────────────────────────────────────
  // GET /api/author/manuscripts/{id}/reviews
  const getReviews = (manuscriptId) =>
    api.get(`/author/manuscripts/${manuscriptId}/reviews`)

  // ── Upload Revisi ──────────────────────────────────────────
  // POST /api/author/manuscripts/{id}/revisions
  const uploadRevision = (manuscriptId, formData) =>
    api.post(`/author/manuscripts/${manuscriptId}/revisions`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

  return {
    getDashboard,
    getManuscriptDetail,
    updateManuscript,
    createDraft,
    getFiles,
    getDocuments,
    uploadDocument,
    getReviews,
    uploadRevision,
  }
}
