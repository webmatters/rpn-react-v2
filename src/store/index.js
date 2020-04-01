import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import nannies from './reducers/nannies'
import nanny from './reducers/nanny'

export function initStore() {
  const reducers = combineReducers({
    nannies,
    nanny,
  })

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

  return store
}
