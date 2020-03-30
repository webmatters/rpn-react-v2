import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fetchNannyById } from 'actions'

class NannyDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch(fetchNannyById(id))
  }

  render() {
    const { nanny } = this.props

    return (
      <section id="nannyDetails">
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              <img src={nanny.image} alt={nanny.description} />
            </div>
            <div className="col-md-6">
              <img src={nanny.image} alt={nanny.description} />
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="row">
            <div className="col-md-8">
              <div className="nanny">
                <h1 className="nanny-title">{nanny.name}</h1>
                <h2 className="nanny-city">
                  {nanny.city}, {nanny.state}
                </h2>
                <div className="nanny-room-info">
                  <span>${nanny.hourlyRate} per Hour</span>
                </div>
                <p className="nanny-description">{nanny.description}</p>
                <hr />
                <div className="nanny-assets">
                  <h3 className="title">Features</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <span>
                        <FontAwesomeIcon icon="baby-carriage" /> Some feature
                      </span>
                    </div>
                    <div className="col-md-6">
                      <span>
                        <FontAwesomeIcon icon="baby" /> Some feature
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4"> BOOKING</div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ nanny }) => ({ nanny })

const NannyDetailWithRouter = withRouter(NannyDetail)
export default connect(mapStateToProps)(NannyDetailWithRouter)
