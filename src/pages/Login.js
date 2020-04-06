import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import LoginForm from 'components/forms/LoginForm'
import ApiErrors from 'components/forms/ApiErrors'
import { withAuth } from 'providers/AuthProvider'

export class Login extends Component {
  state = {
    shouldRedirect: false,
    errors: [],
  }

  signIn = loginData => {
    this.props.auth
      .signIn(loginData)
      .then(token => {
        console.log(token)
        this.setState({ shouldRedirect: true })
      })
      .catch(errors => this.setState({ errors }))
  }

  render() {
    const { errors, shouldRedirect } = this.state

    if (shouldRedirect) {
      return <Redirect to={{ pathname: '/' }} />
    }

    return (
      <div className="rpn-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Login</h1>
            {/* <!-- <div className="alert alert-success">
        Some message
      </div> --> */}
            <LoginForm onSubmit={this.signIn} />
            <ApiErrors errors={errors} />
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">
                Book yourself some peace of mind with just a few clicks.
              </h2>
              <img src="/images/login-image.jpg" alt="Login an user" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Login)
