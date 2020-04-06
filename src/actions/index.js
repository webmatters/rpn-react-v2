import axios from 'axios'

export const extractApiErrors = resError => {
  let errors = [{ title: 'Error!', detail: 'Oops. Somethign went wrong.' }]

  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors
  }
  return errors
}

export const fetchNannies = () => async dispatch => {
  const res = await axios.get('/api/v1/nannies')
  dispatch({
    type: 'FETCH_NANNIES',
    nannies: res.data,
  })
}

export const fetchNannyById = nannyId => async dispatch => {
  dispatch({ type: 'IS_FETCHING_NANNY' })
  const res = await axios.get(`/api/v1/nannies/${nannyId}`)
  dispatch({
    type: 'FETCH_NANNY_BY_ID',
    nanny: res.data,
  })
}

export const createNanny = nanny => {
  return {
    type: 'CREATE_NANNY',
    nanny,
  }
}

// Auth actions

export const registerUser = registerData => {
  return axios
    .post('/api/v1/users/register', registerData)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const loginUser = loginData => {
  return axios
    .post('/api/v1/users/login', loginData)
    .then(res => res.data)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const userAuthenticated = decodedToken => {
  return {
    type: 'USER_AUTHENTICATED',
    firstName: decodedToken.firstName || '',
  }
}
