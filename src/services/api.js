import axios from "axios"

export const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export const authHeaders = (isJson = true) => {
  const token = localStorage.getItem("auth_token") || localStorage.getItem("token")
  const headers = {
    Authorization: `Bearer ${token}`
  }
  if (isJson) {
    headers['Content-Type'] = 'application/json'
    headers['Accept'] = 'application/json'
  }
  return headers
}

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

export function parseLinks(linksArray) {
  if (!Array.isArray(linksArray)) return {}
  const map = {}
  for (const link of linksArray) {
    if (link.rel) {
      map[link.rel] = { href: link.href, method: link.method || 'GET' }
    }
  }
  return map
}

export async function fetchEntryPoint(path, options = {}) {
  let url = `${API_BASE_URL}${path}`
  let method = (options.method || 'GET').toUpperCase()
  
  if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
    const connector = url.includes('?') ? '&' : '?'
    url = url + connector + '_method=' + method
    method = 'POST'
  }

  const reqOptions = {
    method: method,
    headers: authHeaders(method !== 'GET'),
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    reqOptions.body = JSON.stringify(options.body)
    reqOptions.headers = authHeaders(true)
  }
  else if (options.body instanceof FormData) {
    reqOptions.headers = authHeaders(false)
    reqOptions.body = options.body
  }

  return fetch(url, reqOptions)
}

export async function fetchLink(link, options = {}) {
  if (!link || !link.href) {
    throw new Error('Invalid HATEOAS link object provided.')
  }

  let href = link.href

  if (options.params) {
    for (const key in options.params) {
      href = href.replace(`{${key}}`, options.params[key])
      href = href.replace(`:${key}`, options.params[key])
    }
  }

  let method = (link.method || 'GET').toUpperCase()
  
  if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
    const connector = href.includes('?') ? '&' : '?'
    href = href + connector + '_method=' + method
    method = 'POST'
  }

  const reqOptions = {
    method: method,
    headers: authHeaders(method !== 'GET'),
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    reqOptions.body = JSON.stringify(options.body)
    reqOptions.headers = authHeaders(true)
  }
  else if (options.body instanceof FormData) {
    reqOptions.headers = authHeaders(false)
    reqOptions.body = options.body
  }

  return fetch(href, reqOptions)
}

export default api
