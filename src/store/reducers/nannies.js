import { combineReducers } from 'redux'
import { isFetchingReducer } from './common'

const initNanniesReducer = () => {
  const items = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_NANNIES':
        return action.nannies

      case 'CREATE_NANNY':
        return [...state, action.nanny]

      default:
        return state
    }
  }

  const isFetching = isFetchingReducer('nannies')

  return combineReducers({
    items,
    isFetching,
  })
}

const nannies = initNanniesReducer()

export default nannies
