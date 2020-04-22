import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUserBookings } from 'actions'
import BookingListing from 'components/booking/BookingListing'

class ManageBookings extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserBookings())
  }
  render() {
    const { bookings } = this.props
    return (
      <div>
        <BookingListing bookings={bookings} title="Manage my Bookings" />
      </div>
    )
  }
}

const mapStateToProps = ({ manage }) => {
  return {
    bookings: manage.bookings.items,
    isFetching: manage.bookings.isFetching,
  }
}

export default connect(mapStateToProps)(ManageBookings)
