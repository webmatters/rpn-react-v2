import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NannyAssets = () => (
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
)

export default NannyAssets
