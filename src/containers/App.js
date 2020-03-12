import React, { Fragment, Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchField: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      return response.json();
    })
    .then(users => {
      this.setState({ robots: users })
    })
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  render() {
    const { robots, searchField } = this.state;
    
    const filteredSearch = robots.filter(robot => {
      return (
        robot.name.toLowerCase().includes(searchField.toLowerCase())
      )
    })
    return (
      <Fragment>  
        <div className='tc'>
          <h1 className='f1'>React Card Search</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <div className='pa3'>
            <Scroll>
              <ErrorBoundary>
                <CardList robots={filteredSearch} />
              </ErrorBoundary>
            </Scroll>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App;