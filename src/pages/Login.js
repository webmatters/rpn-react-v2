import React, { Component } from 'react'
import LoginForm from 'components/forms/LoginForm'

export class Login extends Component {
  loginUser = loginData => {
    alert(JSON.stringify(loginData))
  }

  render() {
    return (
      <div className="rpn-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Login</h1>
            {/* <!-- <div className="alert alert-success">
        Some message
      </div> --> */}
            <LoginForm onSubmit={this.loginUser} />
            {/* <div className="alert alert-danger">
        <p>
          Some Error
        </p>
      </div> --> */}
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

export default Login
