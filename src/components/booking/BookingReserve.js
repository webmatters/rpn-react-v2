import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { toast } from 'react-toastify'

import RpnModal from 'components/shared/Modal'
import ApiErrors from 'components/forms/ApiErrors'

import { createBooking, getBookings } from 'actions'

const moment = extendMoment(Moment)

class BookingReserve extends Component {
  constructor() {
    super()

    this.dateRef = React.createRef()
    this.bookedDates = []

    this.state = {
      errors: [],
      proposedBooking: {
        numKids: '',
        startAt: null,
        endAt: null,
      },
    }
  }

  async componentDidMount() {
    const { nanny } = this.props
    this.bookedDates = await getBookings(nanny._id)
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
        price: this.price,
        nanny: this.props.nanny,
      },
    })
  }

  checkInvalidDates = date => {
    let isBooked = false

    isBooked = this.bookedDates.some(booking =>
      moment.range(booking.startAt, booking.endAt).contains(date)
    )

    return date < moment().subtract(1, 'days') || isBooked
  }

  handleNumKidsChange = event => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        numKids: parseInt(event.target.value, 10),
      },
    })
  }

  resetData = () => {
    this.dateRef.current.value = ''
    this.setState({
      errors: [],
      proposedBooking: { numKids: '', startAt: null, endAt: null },
    })
  }

  reserveNanny = closeCallback => {
    createBooking(this.state.proposedBooking)
      .then(newBooking => {
        this.bookedDates.push(newBooking)
        this.resetData()
        toast.success('Booking created!', {
          autoClose: 3000,
        })
        closeCallback()
      })
      .catch(errors => {
        this.setState({ errors })
      })
  }

  get hours() {
    const { startAt, endAt } = this.state.proposedBooking
    if (!startAt || !endAt) {
      return null
    }
    const range = moment.range(startAt, endAt)
    return Array.from(range.by('days')).length - 1
  }

  get price() {
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
    const { nanny, isAuth } = this.props
    const {
      errors,
      proposedBooking: { hours, numKids, price },
    } = this.state

    return (
      <div className="booking">
        <h3 className="booking-price">
          ${nanny.hourlyRate}{' '}
          <span className="booking-per-night">per hour</span>
        </h3>
        <hr></hr>
        {!isAuth && (
          <Link
            to={{ pathname: '/login' }}
            className="btn btn-rpn-main btn-block"
          >
            Log in to Book this Nanny
          </Link>
        )}
        {isAuth && (
          <>
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
              <div className="mb-2">
                <p>Hours: {hours}</p>
                <p>Hourly Rate: ${nanny.hourlyRate}</p>
                <p># of Children: {numKids}</p>
                <p>Price: {price}</p>
              </div>
              <ApiErrors errors={errors} />
            </RpnModal>
          </>
        )}

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
