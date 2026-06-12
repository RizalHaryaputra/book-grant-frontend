import api from "./api"

/*
|--------------------------------------------------------------------------
| Get All Contracts (Sesuai endpoint /admin/contracts)
|--------------------------------------------------------------------------
*/
export const getContracts = async () => {
  const response = await api.get("/admin/contracts")
  return response.data
}

/*
|--------------------------------------------------------------------------
| Validate Contract (Sesuai endpoint /admin/contracts/{id}/validate)
| Menggunakan PATCH sesuai API Contract
|--------------------------------------------------------------------------
*/
export const validateContract = async (id, decision, notes) => {
  const response = await api.patch(`/admin/contracts/${id}/validate`, {
    decision: decision, // 'validated' atau 'rejected'
    notes: notes
  })
  return response.data
}

/*
|--------------------------------------------------------------------------
| Upload Contract (Sesuai endpoint /author/contracts/upload)
|--------------------------------------------------------------------------
*/
export const uploadContract = async (formData) => {
  const token = localStorage.getItem("auth_token") || localStorage.getItem("token")
  const response = await fetch(`${api.defaults.baseURL}/author/contracts/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  const data = await response.json()
  if (!response.ok) {
    throw { response: { data } } // Simulate Axios error structure
  }
  return data
}

/*
|--------------------------------------------------------------------------
| Get Detail Contract (Sesuai skema Contract)
|--------------------------------------------------------------------------
*/
export const getContractById = async (id) => {
  // Catatan: Jika backend belum menyediakan detail by ID, 
  // gunakan filter dari getContracts()
  const response = await api.get(`/admin/contracts/${id}`)
  return response.data
}