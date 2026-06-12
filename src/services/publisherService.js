import api from "./api"

export const getPublisherDashboard = async () => {
  const response = await api.get("/v1/publisher/dashboard")
  return response.data.data
}

export const getPrePrintManuscripts = async () => {
  const response = await api.get("/v1/publisher/manuscripts/pre-print")
  return response.data.data
}

export const getManuscript = async (id) => {
  const response = await api.get(`/v1/publisher/manuscripts/${id}`)
  return response.data.data
}

export const checkManuscript = async (manuscriptId, payload) => {
  const response = await api.post(`/v1/publisher/check/${manuscriptId}`, payload)
  return response.data.data
}

export const submitDecision = async (payload) => {
  const response = await api.post("/v1/publisher/decision", payload)
  return response.data.data
}
