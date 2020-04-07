import { combineReducers } from 'redux'

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

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case 'IS_FETCHING_NANNY':
        return true
      case 'FETCH_NANNY_BY_ID':
        return false
      default:
        return state
    }
  }
  return combineReducers({
    item,
    isFetching,
  })
}

const nanny = initNannyReducer()

export default nanny
