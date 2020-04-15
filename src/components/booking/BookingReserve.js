import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

import RpnModal from 'components/shared/Modal'

const moment = extendMoment(Moment)

export class BookingReserve extends Component {
  constructor() {
    super()

    this.dateRef = React.createRef()

    this.state = {
      proposedBooking: {
        numKids: '',
        startAt: null,
        endAt: null,
      },
    }
  }

  handleApply = (event, { startDate, endDate }) => {
    this.dateRef.current.value =
      moment(startDate).format('YYYY/MM/DD') +
      ' to ' +
      moment(endDate).format('YYYY/MM/DD')

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt: startDate,
        endAt: endDate,
      },
    })
  }

  calcData = () => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        hours: this.hours,
        totalPrice: this.totalPrice,
      },
    })
  }

  checkInvalidDates = date => {
    return date < moment().subtract(1, 'days')
  }

  handleNumKidsChange = event => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        numKids: event.target.value,
      },
    })
  }

  reserveNanny = () => {
    alert(JSON.stringify(this.state.proposedBooking))
  }

  get hours() {
    const { startAt, endAt } = this.state.proposedBooking
    if (!startAt || !endAt) {
      return null
    }
    const range = moment.range(startAt, endAt)
    return Array.from(range.by('days')).length - 1
  }

  get totalPrice() {
    const {
      nanny: { hourlyRate },
    } = this.props
    return hourlyRate && this.hours * hourlyRate
  }

  get isBookingValid() {
    const { startAt, endAt, numKids } = this.state.proposedBooking
    return startAt && endAt && numKids
  }
  get formattedDate() {
    return this.dateRef.current ? this.dateRef.current.value : ''
  }

  render() {
    const { nanny } = this.props
    const {
      proposedBooking: { hours, numKids, totalPrice },
    } = this.state

    return (
      <div className="booking">
        <h3 className="booking-price">
          ${nanny.hourlyRate}{' '}
          <span className="booking-per-night">per hour</span>
        </h3>
        <hr></hr>
        <div className="form-group">
          <label htmlFor="dates">Dates</label>
          <DateRangePicker
            onApply={this.handleApply}
            opens="left"
            containerStyles={{ display: 'block' }}
            isInvalidDate={this.checkInvalidDates}
          >
            <input
              ref={this.dateRef}
              id="dates"
              type="text"
              className="form-control"
            />
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="numKids"># of Children</label>
          <input
            onChange={this.handleNumKidsChange}
            value={numKids}
            type="number"
            className="form-control"
            id="numKids"
            aria-describedby="numKids"
          />
        </div>
        <RpnModal
          onSubmit={this.reserveNanny}
          title="Confirm Info"
          subtitle={this.formattedDate}
          openBtn={
            <button
              onClick={this.calcData}
              disabled={!this.isBookingValid}
              className="btn btn-rpn-main btn-block"
            >
              Confirm Booking Data
            </button>
          }
        >
          <p>Hours: {hours}</p>
          <p>Hourly Rate: ${nanny.hourlyRate}</p>
          <p># of Children: {numKids}</p>
          <p>Price: {totalPrice}</p>
        </RpnModal>

        <hr></hr>
        <p className="booking-note-title">
          People are interested into this nanny.
        </p>
        <p className="booking-note-text">
          More than 500 people checked this nanny in last month.
        </p>
      </div>
    )
  }
}

export default BookingReserve
