import React, { Component } from 'react'

class NewBountyForm extends Component {
  constructor(props) {
    super(props)
    let current = props.current || {}
    this.state = {
      name: current.name || '',
      wantedFor: current.wantedFor || '',
      client: current.client || '',
      reward: current.reward || 0,
      ship: current.ship || '',
      hunters: current.hunters || [],
      captured: current.captured || false,
      id: current._id || ''
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    let whichMethod = this.state.id ? 'PUT' : 'POST'
    fetch('https://bounty-time.herokuapp.com/v1/bounties/' + this.state.id, {
      method: whichMethod,
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      this.setState({
        name: '',
        wantedFor: '',
        client: '',
        reward: 0,
        ship: '',
        hunters: [],
        captured: false
      }, () => {
        this.props.refreshBounties()
      })
    })
    .catch(err => {
      console.log('Whoa, something happened!', err)
    })
  }

  storeInput = (e) => {
    if (e.target.name === 'hunters') {
      this.setState({ hunters: e.target.value.split(',') })
    }
    else if (e.target.name === 'captured') {
      this.setState({ captured: e.target.checked })
    }
    else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  render() {
    return (
      <div className='bounty-form'>
        <h2>{this.state.id ? 'Edit Bounty' : 'Add New Bounty'}</h2>
        <form onSubmit={this.submitForm}>
          <div>
            <label>Name:</label>
            <input name="name" onChange={this.storeInput} value={this.state.name} />
          </div>
          <div>
            <label>Wanted For:</label>
            <input name="wantedFor" onChange={this.storeInput} value={this.state.wantedFor} />
          </div>
          <div>
            <label>Client:</label>
            <input name="client" onChange={this.storeInput} value={this.state.client} />
          </div>
          <div>
            <label>Reward:</label>
            <input type="number" name="reward" onChange={this.storeInput} value={this.state.reward} />
          </div>
          <div>
            <label>Ship:</label>
            <input name="ship" onChange={this.storeInput} value={this.state.ship} />
          </div>
          <div>
            <label>Hunters: (Comma-Separated List)</label>
            <input name="hunters" onChange={this.storeInput} value={this.state.hunters.join(',')} />
          </div>
          <div>
            <label>Captured?</label>
            <input type="checkbox" name="captured" onChange={this.storeInput} checked={this.state.captured ? "checked" : ""} />
          </div>
          <input type="submit" value="Bountify!" />
        </form>
      </div>
    )
  }
}

export default NewBountyForm
