import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchNannies } from 'actions'
import NannyCard from 'components/nanny/NannyCard'

export class NannyHome extends Component {
  componentDidMount() {
    this.props.dispatch(fetchNannies())
  }

  renderNannies = nannies =>
    nannies.map(nanny => (
      <div className="col-md-3" key={nanny.id}>
        <NannyCard nanny={nanny} />
      </div>
    ))

  render() {
    const { nannies } = this.props

    return (
      <div className="card-list">
        <h1 className="page-title">Your Childcare away from Home</h1>
        <div className="row">{this.renderNannies(nannies)}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { nannies: state.nannies }
}

export default connect(mapStateToProps)(NannyHome)
