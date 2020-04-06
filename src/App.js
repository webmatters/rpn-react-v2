import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { initStore } from './store'

import { AuthProvider } from 'providers/AuthProvider'

import Header from './components/shared/Header'
import Routes from './Routes'

const store = initStore()

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Header />
          <Routes />
        </Router>
      </AuthProvider>
    </Provider>
  )
}

export default App
