import React, { Component } from 'react'

class ShowBounty extends Component {
  render() {
    let display = <h3>Crime is on the Rise!</h3>
    if (this.props.current.name) {
      display = (
        <div className="show-bounty">
          <h2>{this.props.current.name}: ${this.props.current.reward}</h2>
          <h3>Wanted For: {this.props.current.wantedFor}</h3>
          <p>
            Last seen on the <strong>{this.props.current.ship || 'unknown'}</strong>
          </p>
          <p>Hunted By: {(this.props.current.hunters || []).join(', ')}</p>
          <p><strong>STATUS:</strong> {this.props.current.captured ? 'CAUGHT' : 'AT LARGE'}</p>
        </div>
      )
    }
    return (
      <div>{display}</div>
    )
  }
}

export default ShowBounty
