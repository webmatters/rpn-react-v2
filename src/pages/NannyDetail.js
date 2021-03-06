import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchNannyById } from 'actions'

import NannyInfo from 'components/nanny/NannyInfo'
import TomMap from 'components/map/TomMap'
import BookingReserve from 'components/booking/BookingReserve'

class NannyDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch(fetchNannyById(id))
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'UNMOUNT_NANNY' })
  }

  get location() {
    const {
      nanny: { address1, city, zip },
    } = this.props
    return address1 && city && zip && city + ', ' + address1 + ', ' + zip
  }

  render() {
    const { nanny, isFetching, isAuth } = this.props

    if (isFetching || !nanny._id) {
      return null
    }

    return (
      <section id="nannyDetails">
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              <img src={nanny.image} alt={nanny.description} />
            </div>
            <div className="col-md-6">
              <TomMap location={this.location} />
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="row">
            <div className="col-md-8">
              <NannyInfo nanny={nanny} />
            </div>
            <div className="col-md-4">
              <BookingReserve nanny={nanny} isAuth={isAuth} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ nanny, auth: { isAuth } }) => ({
  nanny: nanny.item,
  isFetching: nanny.isFetching,
  isAuth,
})

const NannyDetailWithRouter = withRouter(NannyDetail)
export default connect(mapStateToProps)(NannyDetailWithRouter)
