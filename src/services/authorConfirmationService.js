import api from "./api"

export const submitConfirmation =
  async (payload) => {

    const response =
      await api.post(
        "/author-confirmations",
        payload
      )

    return response.data
  }

export const getConfirmations =
  async () => {

    const response =
      await api.get(
        "/author-confirmations"
      )

    return response.data
  }