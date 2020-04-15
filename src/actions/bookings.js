import { extractApiErrors } from './index'
import axiosService from 'services/AxiosService'
const { rpnAxios } = axiosService

export const createBooking = booking => {
  return rpnAxios
    .post('/bookings', booking)
    .then(res => res.data)
    .catch(err => Promise.reject(extractApiErrors(err.response || {})))
}

export const getBookings = nannyId => {
  return rpnAxios.get(`/bookings?nanny=${nannyId}`).then(res => res.data)
}
