import React from 'react'
import { Link } from 'react-router-dom'

import { capitalize, formatDate } from 'helpers/functions'

const BookingListing = ({ bookings, type, title }) => {
  return (
    <section className="booking-listing">
      <h1 className="page-title">{title}</h1>
      <div className="row">
        {bookings.map(booking => (
          <div key={booking._id} className="col-md-4">
            <div className="card text-center">
              {type === 'received' && (
                <div className="card-header">
                  From: {booking.user.firstName} {booking.user.lastName}
                </div>
              )}
              {/* Only if 'received' booking END */}
              <div className="card-block">
                <h4 className="card-title">
                  {capitalize(booking.nanny.name)} -{' '}
                  {capitalize(booking.nanny.city)}{' '}
                </h4>
                <p className="card-text booking-days">
                  {formatDate(booking.startAt)} - {formatDate(booking.endAt)} |{' '}
                  {booking.hours} hours
                </p>
                <p className="card-text">
                  <span>Price: </span>{' '}
                  <span className="booking-price-value">${booking.price}</span>
                </p>
                <Link
                  to={{ pathname: `/nannies/${booking.nanny._id}` }}
                  className="btn btn-rpn-main"
                >
                  Go to Nanny
                </Link>
                <button className="ml-1 btn btn-danger">Delete</button>
              </div>
              <div className="card-footer text-muted">
                Created at {formatDate(booking.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BookingListing
