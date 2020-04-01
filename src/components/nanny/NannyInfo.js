import React from 'react'

import NannyAssets from './NannyAssets'

const NannyInfo = ({ nanny }) => {
  return (
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
      <NannyAssets />
    </div>
  )
}

export default NannyInfo
