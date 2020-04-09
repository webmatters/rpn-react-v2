import axiosService from 'services/AxiosService'
const { rpnAxios } = axiosService

export const fetchNannies = () => async dispatch => {
  const res = await rpnAxios.get('/nannies')
  dispatch({
    type: 'FETCH_NANNIES',
    nannies: res.data,
  })
}

export const fetchNannyById = nannyId => async dispatch => {
  dispatch({ type: 'IS_FETCHING_NANNY' })
  const res = await rpnAxios.get(`/nannies/${nannyId}`)
  dispatch({
    type: 'FETCH_NANNY_BY_ID',
    nanny: res.data,
  })
}

export const createNanny = nanny => {
  return rpnAxios.post('nannies', nanny)
}
