import React from 'react'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { showNotification } from './../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVoteClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes {' '}
        <button onClick={handleVoteClick}
        > vote </button>
      </div>
      <p></p>
    </div>
  )
}

const Anecdotes = ({ anecdotes, handleVoteClick }) => (
  <div>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        handleVoteClick={() => handleVoteClick(anecdote)}
        anecdote={anecdote}
      />
    )}
  </div>
)



const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <Anecdotes
      anecdotes={props.anecdotes}
      handleVoteClick={props.voteAnecdote}
    />
  </div>
)



const sortByLikes = (anecdotes) => {
  return (anecdotes.sort((a, b) => b.votes - a.votes))
}

const filterAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => (anecdote.content.toLowerCase().includes(filter.toLowerCase())))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: sortByLikes(filterAnecdotes(state.anecdotes, state.filter))
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    voteAnecdote: (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(showNotification(`Voted anecdote: ${anecdote.content}`, 3))
    }
  }
}


const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
