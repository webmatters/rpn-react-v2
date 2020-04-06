import { combineReducers } from 'redux'

const initAuthReducer = () => {
  const isAuth = (state = false, action) => {
    switch (action.type) {
      case 'IS_FETCHING_NANNY':
        return {}
      case 'FETCH_NANNY_BY_ID':
        return action.nanny

      default:
        return state
    }
  }

  const firstName = (state = false, action) => {
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
    isAuth,
    firstName,
  })
}

const nanny = initAuthReducer()

export default nanny
