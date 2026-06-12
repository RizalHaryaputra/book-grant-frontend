import api from "./api"

export const login = async (payload) => {
  const response = await api.post("/auth/login", payload)

  const { token, user } = response.data.data

  localStorage.setItem("auth_token", token)

  localStorage.setItem(
    "current_user",
    JSON.stringify(user)
  )

  const role =
    user?.role?.name ||
    user?.role ||
    ""

  localStorage.setItem(
    "user_role",
    role.toLowerCase()
  )

  return response.data.data
}

export const register = async (payload) => {
  const response = await api.post("/auth/register", payload)
  return response.data
}

export const logout = async () => {
  try {
    await api.post("/auth/logout")
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("current_user")
    localStorage.removeItem("user_role")
  }
}

export const getProfile = async () => {
  const response = await api.get("/auth/me")
  return response.data.data
}