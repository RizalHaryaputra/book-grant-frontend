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
  const response = await api.post("/author/contracts/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
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