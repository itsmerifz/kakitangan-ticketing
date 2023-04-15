import axios from "axios"

export const getEventData = async () => {
  const data = await axios.get("https://backend.kakitangan.biz.id/api/event")
  return data.data
}

export const getEventDetail = async (id) => {
  const data = await axios.get(`https://backend.kakitangan.biz.id/api/event/detail-event/${id}`)
  return data.data
}

export const sendTrxRequest = async (data) => {
  const res = await axios.post("https://backend.kakitangan.biz.id/api/payment/new-transaction", data)
  return res.data
}

export const getUserTransaction = async (id) => {
  const data = await axios.get(`https://backend.kakitangan.biz.id/api/payment/getUserPayment/${id}`)
  return data.data
}

export const sendConfirmationTicket = async (data) => {
  const res = await axios.post("https://backend.kakitangan.biz.id/api/payment/confirmation-ticket", data)
  return res.data
}