import api from "./api"

export const getDashboard = async () => {
  // 1. Ambil role user dari localStorage yang disimpan saat login
  const role = localStorage.getItem('user_role')

  // 2. Default endpoint adalah Admin
  let endpoint = "/admin/dashboard-stats"

  // 3. Sesuaikan rute API jika yang login bukan Admin
  if (role === 'penerbit') {
    endpoint = "/publisher/dashboard"
  } else if (role === 'penulis') {
    endpoint = "/author/dashboard"
  } else if (role === 'reviewer') {
    endpoint = "/reviewer/dashboard"
  }

  // 4. Panggil API sesuai dengan endpoint yang sudah ditentukan
  const response = await api.get(endpoint)

  // 5. Kembalikan datanya (menggunakan fallback agar aman dari perbedaan struktur response backend)
  return response.data.data || response.data
}