import axiosService from 'services/AxiosService'
const { rpnAxios } = axiosService

export const fetchNannies = location => async dispatch => {
  const query = location ? `/nannies?city=${location}` : '/nannies'
  dispatch({ type: 'REQUEST_DATA', resource: 'nannies' })
  const res = await rpnAxios.get(query)
  dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'nannies' })
  dispatch({
    type: 'FETCH_NANNIES',
    nannies: res.data,
  })
}

export const fetchUserNannies = () => dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'manage-nannies' })
  return rpnAxios
    .get('/nannies/me')
    .then(res => res.data)
    .then(nannies => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: nannies,
        resource: 'manage-nannies',
      })
    })
}

export const fetchNannyById = nannyId => async dispatch => {
  dispatch({ type: 'REQUEST_DATA', resource: 'nanny' })
  const res = await rpnAxios.get(`/nannies/${nannyId}`)
  dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'nanny' })
  dispatch({
    type: 'FETCH_NANNY_BY_ID',
    nanny: res.data,
  })
}

export const createNanny = nanny => {
  return rpnAxios.post('nannies', nanny)
}
