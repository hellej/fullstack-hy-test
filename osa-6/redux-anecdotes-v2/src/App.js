import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

import { connect } from 'react-redux'
import { anecdotesInitialization } from './reducers/anecdoteReducer'

class App extends React.Component {

  componentDidMount = async () => {
    this.props.anecdotesInitialization()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Filter />
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}


const ConnectedApp = connect(
  null,
  { anecdotesInitialization }
)(App)


export default ConnectedApp