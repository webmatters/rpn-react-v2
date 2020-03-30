import { createStore, combineReducers } from 'redux'

import nannies from './reducers/nannies'
import nanny from './reducers/nanny'

export function initStore() {
  const reducers = combineReducers({
    nannies,
    nanny,
  })

  const reduxExtension =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(reducers, reduxExtension)
  return store
}
