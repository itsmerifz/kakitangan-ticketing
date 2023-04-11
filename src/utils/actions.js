import axios from "axios"

export const getEventData = async () => {
  const data = await axios.get("http://localhost:3000/api/event")
  return data.data
}

export const getEventDetail = async (id) => {
  const data = await axios.get(`http://localhost:3000/api/event/detail-event/${id}`)
  return data.data
}

export const sendTrxRequest = async (data) => {
  const res = await axios.post("http://localhost:3000/api/payment/new-transaction", data)
  return res.data
}

export const getUserTransaction = async (id) => {
  
}