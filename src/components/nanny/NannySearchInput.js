import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const NannySearchInput = () => {
  const [location, setLocation] = useState('')
  const history = useHistory()

  const handleSearch = () => {
    location ? history.push(`/nannies/${location}/nannies`) : history.push('/')
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="form-inline my-2 my-lg-0">
      <input
        onKeyPress={handleKeyPress}
        onChange={e => setLocation(e.target.value)}
        value={location}
        className="form-control mr-sm-2 rpn-search"
        type="search"
        placeholder="Search by City"
        aria-label="Search"
      />
      <button
        onClick={handleSearch}
        className="btn btn-outline-success my-2 my-sm-0 btn-rpn-main"
        type="button"
      >
        Search
      </button>
    </div>
  )
}

export default NannySearchInput
