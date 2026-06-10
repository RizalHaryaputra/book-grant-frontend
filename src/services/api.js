/**
 * src/services/api.js
 * Konfigurasi Axios terpusat untuk seluruh halaman Vue.
 *
 * Penggunaan:
 *   import api from '@/services/api'
 *   const res = await api.get('/author/dashboard')
 */
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor — sematkan Bearer token dari localStorage
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor — tangani 401 secara global
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
