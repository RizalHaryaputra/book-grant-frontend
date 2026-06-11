import api from "./api"

export const getUsers = async () => {

  const response =
    await api.get("/admin/users")

  return response.data
}

export const createUser = async (
  payload
) => {

  const response =
    await api.post(
      "/admin/users",
      payload
    )

  return response.data
}

export const updateUser = async (
  id,
  payload
) => {

  const response =
    await api.put(
      `/admin/users/${id}`,
      payload
    )

  return response.data
}

export const deleteUser = async (
  id
) => {

  const response =
    await api.delete(
      `/admin/users/${id}`
    )

  return response.data
}