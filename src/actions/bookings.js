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

export const fetchUserBookings = () => dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'manage-bookings' })
  return rpnAxios
    .get('/bookings/me')
    .then(res => res.data)
    .then(bookings => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: bookings,
        resource: 'manage-bookings',
      })
    })
}

export const fetchReceivedBookings = () => dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'received-bookings' })
  return rpnAxios
    .get('/bookings/received')
    .then(res => res.data)
    .then(bookings => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: bookings,
        resource: 'received-bookings',
      })
    })
}
