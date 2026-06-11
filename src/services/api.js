import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

// Request Interceptor: Menambahkan Token Otomatis
api.interceptors.request.use(
  (config) => {
    // Gunakan 'auth_token' dari modul 1, fallback ke 'token' modul 2
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token") 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

// Response Interceptor: Menangani Sesi Kedaluwarsa (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("token")
      localStorage.removeItem("current_user")
      localStorage.removeItem("user_role") 

      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export default api
