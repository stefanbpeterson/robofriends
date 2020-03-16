import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
} 

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredSearch = robots.filter(robot => {
      return (
        robot.name.toLowerCase().includes(searchField.toLowerCase())
      )
    })
    return isPending ? 
    <h1>LOADING...</h1> :
    (
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