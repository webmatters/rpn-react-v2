import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'

import 'bootstrap/dist/js/bootstrap.min.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './index.scss'
import 'bootstrap-daterangepicker/daterangepicker.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'

library.add(fas)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
