import React, { Component } from 'react'

import NannyNewForm from 'components/forms/NannyNewForm'

import { createNanny } from 'actions'
import { Redirect } from 'react-router-dom'

class NannyNew extends Component {
  state = {
    shouldRedirect: false,
  }

  handleNannyCreate = nannyData => {
    createNanny(nannyData)
      .then(() => {
        this.setState({ shouldRedirect: true })
      })
      .catch(() => {
        console.log('Errors')
      })
  }

  render() {
    const { shouldRedirect } = this.state

    if (shouldRedirect) {
      return <Redirect to={{ pathname: '/' }} />
    }
    return (
      <section id="newNanny">
        <div className="rpn-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Nanny</h1>
              <NannyNewForm onSubmit={this.handleNannyCreate} />
              {/* <div>
          <p>
            Some Errors
          </p>
        </div> */}
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  We'll get you bookings. You provide great childcare.
                </h2>
                <img src="/images/create-rental.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default NannyNew
