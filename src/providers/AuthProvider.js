import React from 'react'
import jwt from 'jsonwebtoken'

import { loginUser } from 'actions'

const { createContext } = React

const AuthContext = createContext(null)

export const AuthProvider = props => {
  const decodeToken = token => {
    return jwt.decode(token)
  }

  const signIn = loginData => {
    return loginUser(loginData).then(token => {
      localStorage.setItem('rpn_token', token)
      const decodedToken = decodeToken(token)
      return token
    })
  }

  const authApi = {
    signIn,
  }
  return (
    <AuthContext.Provider value={authApi}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const withAuth = Component => props => (
  <AuthContext.Consumer>
    {authApi => <Component {...props} auth={authApi} />}
  </AuthContext.Consumer>
)
