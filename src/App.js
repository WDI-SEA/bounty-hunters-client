import React from 'react';
import './App.css';

import NewBountyForm from './NewBountyForm'
import Poster from './Poster'
import ShowBounty from './ShowBounty'

class App extends React.Component {
  state = {
    bounties: [],
    current: {}
  }

  componentDidMount() {
    this.getBounties()
  }

  getBounties = () => {
    fetch('https://bounty-time.herokuapp.com/v1/bounties')
    .then(response => response.json())
    .then(bounties => {
      console.log(bounties)
      this.setState({ bounties: bounties, current: {} })
    })
    .catch(err => {
      console.log('Error while fetching bounties', err)
    })
  }

  changeCurrent = (bounty) => {
    this.setState({ current: bounty })
  }

  render() {
    let posters = this.state.bounties.map((b, i) => {
      return <Poster key={i}
        bounty={b}
        refreshBounties={this.getBounties}
        currentId={this.state.current._id}
        changeCurrent={this.changeCurrent}
      />
    })

    return (
      <div className="App">
        <header className="App-header">
          <h1>Wanted Poster Bulletin Board</h1>
          <p>
            Reduce crime in your neighborhood!
          </p>
        </header>
        <main>
          {posters}
          <ShowBounty current={this.state.current} refreshBounties={this.getBounties} />
          <NewBountyForm refreshBounties={this.getBounties} />
        </main>
      </div>
    );
  }
}

export default App;
