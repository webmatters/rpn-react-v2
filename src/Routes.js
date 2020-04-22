import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AuthRoute from 'components/auth/AuthRoute'
import GuestRoute from 'components/auth/GuestRoute'

import NannyHome from './pages/NannyHome'
import NannyDetail from './pages/NannyDetail'
import NannyNew from './pages/NannyNew'
import NannySearch from './pages/NannySearch'

import Login from './pages/Login'
import Register from './pages/Register'
import SecretPage from './pages/SecretPage'
import ManageBookings from 'pages/ManageBookings'
import ReceivedBookings from 'pages/ReceivedBookings'
import ManageNannies from 'pages/ManageNannies'

const Routes = () => {
  return (
    <div className="container rpn-container">
      <Switch>
        <AuthRoute path="/bookings/manage">
          <ManageBookings />
        </AuthRoute>
        <AuthRoute path="/bookings/received">
          <ReceivedBookings />
        </AuthRoute>
        <AuthRoute path="/nannies/manage">
          <ManageNannies />
        </AuthRoute>
        <Route path="/nannies/:location/nannies">
          <NannySearch />
        </Route>
        <AuthRoute path="/nannies/new">
          <NannyNew />
        </AuthRoute>
        <Route path="/nannies/:id">
          <NannyDetail />
        </Route>
        <AuthRoute path="/secret">
          <SecretPage />
        </AuthRoute>
        <GuestRoute path="/login">
          <Login />
        </GuestRoute>
        <GuestRoute path="/register">
          <Register />
        </GuestRoute>
        <Route exact path="/">
          <NannyHome />
        </Route>
      </Switch>
    </div>
  )
}

export default Routes
