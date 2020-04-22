import React, { Component } from 'react'
import { fetchUserNannies } from 'actions'
import { connect } from 'react-redux'

import NannyCard from 'components/nanny/NannyCard'

class ManageNannies extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserNannies())
  }

  renderNannies = nannies =>
    nannies.map(nanny => (
      <div className="col-md-3" key={nanny._id}>
        <NannyCard nanny={nanny} />
      </div>
    ))

  render() {
    const { nannies } = this.props
    return (
      <div className="card-list">
        <h1 className="page-title">Manage Nannies on Your Account</h1>
        <div className="row">{this.renderNannies(nannies)}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ manage }) => {
  return {
    nannies: manage.nannies.items,
    isFetching: manage.nannies.isFetching,
  }
}

export default connect(mapStateToProps)(ManageNannies)
