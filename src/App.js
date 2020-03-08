import React, { Fragment, Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots';
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: robots,
      searchField: '',
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  render() {
    const filteredSearch = this.state.robots.filter(robot => {
      return (
        robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
      )
    })
    return (
      <Fragment>  
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <div className='pa3'>
            <CardList robots={filteredSearch} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App;