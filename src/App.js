import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { initStore } from './store'

import { AuthProvider, useAuth } from 'providers/AuthProvider'

import Header from './components/shared/Header'
import Routes from './Routes'

const store = initStore()

const Providers = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>{children}</AuthProvider>
  </Provider>
)

const RpnApp = () => {
  const authService = useAuth()

  useEffect(() => {
    authService.checkAuthState()
  }, [authService])

  return (
    <Router>
      <Header logout={authService.signOut} />
      <Routes />
    </Router>
  )
}

const App = () => {
  return (
    <Providers>
      <RpnApp />
    </Providers>
  )
}

export default App
