import api from "./api"

/*
|--------------------------------------------------------------------------
| Submit Form Kesediaan Penulis
|--------------------------------------------------------------------------
*/

export const submitConfirmation = async (payload) => {

  const response = await api.post(

    "/author-confirmations",

    payload

  )

  return response.data

}

/*
|--------------------------------------------------------------------------
| Get All Pengajuan Hibah Buku
|--------------------------------------------------------------------------
*/

export const getAuthors = async () => {

  const response = await api.get(

    "/author-confirmations"

  )

  return response.data

}

/*
|--------------------------------------------------------------------------
| Get Detail Pengajuan
|--------------------------------------------------------------------------
*/

export const getAuthorById = async (id) => {

  const response = await api.get(

    `/author-confirmations/${id}`

  )

  return response.data

}

/*
|--------------------------------------------------------------------------
| Update Status Pengajuan
|--------------------------------------------------------------------------
*/

export const updateAuthor = async (

  id,

  payload

) => {

  const response = await api.put(

    `/author-confirmations/${id}`,

    payload

  )

  return response.data

}

/*
|--------------------------------------------------------------------------
| Delete Pengajuan
|--------------------------------------------------------------------------
*/

export const deleteAuthor = async (id) => {

  const response = await api.delete(

    `/author-confirmations/${id}`

  )

  return response.data

}

/*
|--------------------------------------------------------------------------
| Generate Account Penulis
|--------------------------------------------------------------------------
*/

export const generateAuthorAccount = async (id) => {

  const response = await api.post(

    `/author-confirmations/${id}/generate-account`

  )

  return response.data

}
