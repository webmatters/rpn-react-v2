import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import { Provider } from 'react-redux'
import { initStore } from './store'

import { AuthProvider, useAuth } from 'providers/AuthProvider'
import { MapProvider } from 'providers/MapProvider'

import Header from './components/shared/Header'
import Routes from './Routes'

const store = initStore()

const Providers = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>
      <MapProvider apiKey={'Wo6V7e9JeQe5X4qmcFCk6Lp36AsQbFcI'}>
        {children}
      </MapProvider>
    </AuthProvider>
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
      <ToastContainer />
      <RpnApp />
    </Providers>
  )
}

export default App
