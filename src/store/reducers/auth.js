import { combineReducers } from 'redux'

const initAuthReducer = () => {
  const isAuth = (state = false, action) => {
    switch (action.type) {
      default:
        return state
    }
  }

  const firstName = (state = '', action) => {
    switch (action.type) {
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
