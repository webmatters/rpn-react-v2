import React from 'react'
import { Link } from 'react-router-dom'

const NannyCard = props => {
  const { nanny } = props
  return (
    <Link className="nanny-link" to={`/nannies/${nanny._id}`}>
      <div className="card rpn-card">
        <img className="card-img-top" src={nanny.image} alt={nanny.name} />
        <div className="card-body">
          <h6 className="card-subtitle mb-0 text-muted">{nanny.headline}</h6>
          <h5 className="card-title big-font">{nanny.name}</h5>
          <p className="card-text">${nanny.hourlyRate}/Hour</p>
        </div>
      </div>
    </Link>
  )
}

export default NannyCard
