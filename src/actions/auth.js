import { extractApiErrors } from './index'
import axiosService from 'services/AxiosService'
const { rpnAxios } = axiosService

export const registerUser = registerData => {
  return rpnAxios
    .post('/users/register', registerData)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const loginUser = loginData => {
  return rpnAxios
    .post('/users/login', loginData)
    .then(res => res.data)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const userAuthenticated = decodedToken => {
  return {
    type: 'USER_AUTHENTICATED',
    firstName: decodedToken.firstName || '',
  }
}
