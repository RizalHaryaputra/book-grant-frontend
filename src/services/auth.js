// ─── Auth Service ─────────────────────────────────────────────────────────────
// Menyimpan dan membaca token Sanctum + data user dari localStorage.
// Semua fetch() di views harus memakai authHeaders() agar token dikirim.

const TOKEN_KEY = 'auth_token'
const USER_KEY  = 'auth_user'

/** Simpan token ke localStorage */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

/** Ambil token dari localStorage (null jika belum login) */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/** Simpan data user (object) ke localStorage */
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/** Ambil data user sebagai object (null jika belum ada) */
export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  try {
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/** Hapus semua data auth (logout) */
export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/** Cek apakah user sudah login (ada token) */
export function isAuthenticated() {
  return !!getToken()
}

/**
 * Kembalikan headers standar untuk fetch() yang sudah include Authorization.
 * @param {boolean} withContentType - sertakan Content-Type: application/json (default true)
 */
export function authHeaders(withContentType = true) {
  const token = getToken()
  const headers = {}

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (withContentType) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}
