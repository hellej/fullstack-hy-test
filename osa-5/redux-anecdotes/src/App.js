import React from 'react';
import actionFor from './actionCreators'

class AnecdoteForm extends React.Component {

  handleSubmitNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch(actionFor.createAnecdote(content))
    event.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitNew}>
          <div><input name='anecdote' /></div>
          <button> create</button>
        </form>
      </div>
    )
  }
}


class AnecdoteList extends React.Component {

  handleVoteClick = (id) => () => {
    this.props.store.dispatch(
      actionFor.voteAnecdote(id)
    )
  }

  orderByVotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  render() {
    const anecdotes = this.orderByVotes(this.props.store.getState())
    return (
      <div>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVoteClick={this.handleVoteClick(anecdote.id)}
          />
        )}
      </div>
    )
  }
}

const Anecdote = ({ anecdote, handleVoteClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div> has {anecdote.votes} votes{' '}
        <button onClick={handleVoteClick}> vote </button>
      </div>
      <p></p>
    </div>
  )
}



class App extends React.Component {

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <AnecdoteList store={this.props.store} />
        <h2>create new</h2>
        <AnecdoteForm store={this.props.store} />
      </div >
    )
  }
}

export default App