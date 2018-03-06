import React from 'react'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { showNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'



class AnecdoteForm extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.createAnecdote(content)
    this.props.showNotification(`Added anecdote: ${content}`, 3)
    event.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = () => {
  return {
    undefined
  }
}

const mapDispatchToProps = {
  createAnecdote,
  showNotification
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
