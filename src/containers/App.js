import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField } from '../actions';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
} 

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: []
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

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredSearch = robots.filter(robot => {
      return (
        robot.name.toLowerCase().includes(searchField.toLowerCase())
      )
    })
    return (
      <Fragment>  
        <div className='tc'>
          <h1 className='f1'>React Card Search</h1>
          <SearchBox searchChange={onSearchChange}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);