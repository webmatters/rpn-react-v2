import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NannyHome from './pages/NannyHome'
import NannyDetail from './pages/NannyDetail'
import Login from './pages/Login'
import Register from './pages/Register'

const Routes = () => {
  return (
    <div className="container rpn-container">
      <Switch>
        <Route path="/nannies/:id">
          <NannyDetail />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <NannyHome />
        </Route>
      </Switch>
    </div>
  )
}

export default Routes
