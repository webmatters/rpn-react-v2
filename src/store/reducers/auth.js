import { combineReducers } from 'redux'

const initAuthReducer = () => {
  const isAuth = (state = false, action) => {
    switch (action.type) {
      case 'USER_AUTHENTICATED':
        return true
      case 'USER_SIGNED_OUT':
        return false
      default:
        return state
    }
  }

  const firstName = (state = '', action) => {
    switch (action.type) {
      case 'USER_AUTHENTICATED':
        return action.firstName
      case 'USER_SIGNED_OUT':
        return ''
      default:
        return state
    }
  }
  return combineReducers({
    isAuth,
    firstName,
  })
}

const auth = initAuthReducer()

export default auth
