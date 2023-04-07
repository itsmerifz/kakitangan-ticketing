import axios from "axios"

export const getEventData = async () => {
  const data = await axios.get("http://192.168.1.11:3000/api/event")
  return data.data
}

export const getEventDetail = async (id) => {
  const data = await axios.get(`http://192.168.1.11:3000/api/event/detail-event/${id}`)
  return data.data
}