import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchReceivedBookings } from 'actions'
import BookingListing from 'components/booking/BookingListing'

class ReceivedBookings extends Component {
  componentDidMount() {
    this.props.dispatch(fetchReceivedBookings())
  }
  render() {
    const { bookings } = this.props
    return (
      <div>
        <BookingListing
          bookings={bookings}
          title="Bookings for my Nannies"
          type="received"
        />
      </div>
    )
  }
}

const mapStateToProps = ({ manage }) => {
  return {
    bookings: manage.receivedBookings.items,
    isFetching: manage.receivedBookings.isFetching,
  }
}

export default connect(mapStateToProps)(ReceivedBookings)
