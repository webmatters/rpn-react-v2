import { nannyData } from 'store/data'

export const fetchNannies = () => {
  return {
    type: 'FETCH_NANNIES',
    nannies: nannyData,
  }
}

export const fetchNannyById = nannyId => {
  const nanny = nannyData.find(nanny => nanny._id === nannyId)
  return {
    type: 'FETCH_NANNY_BY_ID',
    nanny,
  }
}

export const createNanny = nanny => {
  return {
    type: 'CREATE_NANNY',
    nanny,
  }
}
