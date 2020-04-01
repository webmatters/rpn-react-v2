import axios from 'axios'

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
