import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { capitalize } from 'helpers/functions'
import { fetchNannies } from 'actions'
import NannyCard from 'components/nanny/NannyCard'

export class NannySearch extends Component {
  componentDidMount() {
    this.getNannies(this.location)
  }

  componentDidUpdate(prevProps) {
    const { location: prevLocation } = prevProps.match.params

    if (this.location !== prevLocation) {
      this.getNannies(this.location)
    }
  }

  getNannies(location) {
    this.props.dispatch(fetchNannies(location))
  }

  renderNannies = nannies =>
    nannies.map(nanny => (
      <div className="col-md-3" key={nanny._id}>
        <NannyCard nanny={nanny} />
      </div>
    ))

  get location() {
    return this.props.match.params.location
  }

  get noNanniesFound() {
    const { nannies, isFetching } = this.props
    return nannies.length === 0 && !isFetching
  }

  render() {
    const { nannies } = this.props

    return (
      <div className="card-list">
        <h1 className="page-title">Nannies in "{capitalize(this.location)}"</h1>
        <div className="row">{this.renderNannies(nannies)}</div>
        {this.noNanniesFound && (
          <p className="alert alert-warning">
            No nannies found in {capitalize(this.location)}.
          </p>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ nannies }) => {
  return { nannies: nannies.items, isFetching: nannies.isFetching }
}

export default connect(mapStateToProps)(withRouter(NannySearch))
