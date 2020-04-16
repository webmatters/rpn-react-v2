import { combineReducers } from 'redux'
import { isFetchingReducer } from './common'

const initNannyReducer = () => {
  const item = (state = {}, action) => {
    switch (action.type) {
      case 'UNMOUNT_NANNY':
        return {}
      case 'FETCH_NANNY_BY_ID':
        return action.nanny

      default:
        return state
    }
  }

  const isFetching = isFetchingReducer('nanny')

  return combineReducers({
    item,
    isFetching,
  })
}

const nanny = initNannyReducer()

export default nanny
