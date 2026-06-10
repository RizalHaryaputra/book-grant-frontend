import { authHeaders } from './auth.js'
import { API_BASE_URL } from '../config.js'

/**
 * ─── HATEOAS Helper Utilities ──────────────────────────────────────────────────
 *
 * Backend mengembalikan links dalam format array:
 *   "links": [
 *     { "rel": "get_details", "method": "GET", "href": "http://..." },
 *     { "rel": "get_rubric",  "method": "GET", "href": "http://..." }
 *   ]
 *
 * Fungsi-fungsi di bawah ini bertugas:
 * 1. Mengkonversi format array tersebut menjadi object keyed-by-rel agar mudah diakses.
 * 2. Menjadi satu-satunya tempat yang mengetahui API_BASE_URL (entry point).
 * 3. Menyediakan fetchLink() untuk memanggil URL dari objek link HATEOAS.
 */

/**
 * Mengkonversi array links backend menjadi object keyed by rel.
 *
 * Input:  [{ rel: "get_details", method: "GET", href: "..." }]
 * Output: { get_details: { method: "GET", href: "..." } }
 *
 * @param {Array} linksArray - Array of link objects dari response backend
 * @returns {Object} - Object keyed by rel name
 */
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

/**
 * Melakukan initial fetch ke endpoint tertentu secara langsung.
 * Ini adalah SATU-SATUNYA tempat di seluruh frontend yang boleh mengetahui URL hardcoded.
 *
 * Hanya digunakan untuk entry-point awal (seperti /api/reviewer/dashboard atau /api/admin/manuscripts)
 * yang memang belum bisa didapat dari link HATEOAS sebelumnya.
 *
 * @param {string} path - Path relatif terhadap API_BASE_URL (misal: '/reviewer/dashboard')
 * @param {Object} options - Opsi fetch tambahan
 * @returns {Promise<Response>}
 */
export async function fetchEntryPoint(path, options = {}) {
  let url = `${API_BASE_URL}${path}`
  let method = (options.method || 'GET').toUpperCase()
  
  // Workaround global: PHP built-in server sering crash saat menerima PUT/PATCH/DELETE dengan body.
  // Gunakan method spoofing ke POST.
  if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
    const connector = url.includes('?') ? '&' : '?'
    url = url + connector + '_method=' + method
    method = 'POST'
  }

  const reqOptions = {
    method: method,
    headers: authHeaders(method !== 'GET'),
  }

  // Handle body JSON
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    reqOptions.body = JSON.stringify(options.body)
    reqOptions.headers = authHeaders(true)
  }
  // Handle FormData
  else if (options.body instanceof FormData) {
    reqOptions.headers = authHeaders(false)
    reqOptions.body = options.body
  }

  return fetch(url, reqOptions)
}

/**
 * Melakukan pemanggilan API berdasarkan objek link HATEOAS.
 * Ini adalah cara utama frontend memanggil API setelah initial entry point.
 *
 * @param {Object} link - Objek link (contoh: { href: 'http://...', method: 'GET' })
 * @param {Object} options - Opsi tambahan (body, params)
 * @returns {Promise<Response>}
 */
export async function fetchLink(link, options = {}) {
  if (!link || !link.href) {
    throw new Error('Invalid HATEOAS link object provided.')
  }

  let href = link.href

  // Handle URI templates, e.g., /api/manuscripts/{id}
  if (options.params) {
    for (const key in options.params) {
      href = href.replace(`{${key}}`, options.params[key])
      href = href.replace(`:${key}`, options.params[key])
    }
  }

  let method = (link.method || 'GET').toUpperCase()
  
  // Workaround global: PHP built-in server sering crash saat menerima PUT/PATCH/DELETE dengan body.
  // Gunakan method spoofing ke POST.
  if (['PUT', 'PATCH', 'DELETE'].includes(method)) {
    const connector = href.includes('?') ? '&' : '?'
    href = href + connector + '_method=' + method
    method = 'POST'
  }

  const reqOptions = {
    method: method,
    headers: authHeaders(method !== 'GET'),
  }

  // Handle body JSON
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    reqOptions.body = JSON.stringify(options.body)
    reqOptions.headers = authHeaders(true)
  }
  // Handle FormData
  else if (options.body instanceof FormData) {
    reqOptions.headers = authHeaders(false)
    reqOptions.body = options.body
  }

  return fetch(href, reqOptions)
}
