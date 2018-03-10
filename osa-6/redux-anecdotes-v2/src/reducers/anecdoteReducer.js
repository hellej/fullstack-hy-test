import anecdoteService from './../services/anecdotes'


const anecdoteReducer = (store = [], action) => {

  switch (action.type) {

    case 'INIT_ANECDOTES':
      return action.data

    case 'VOTE':
      const old = store.filter(a => a.id !== action.votedAnecdote.id)
      const voted = store.find(a => a.id === action.votedAnecdote.id)
      return [...old, { ...voted, votes: voted.votes + 1 }]

    case 'CREATE_ANECDOTE':
      return [...store, { content: action.newAnecdote.content, id: action.newAnecdote.id, votes: 0 }]

    default:
      return store
  }
}


export const anecdotesInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      votedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      newAnecdote
    })
  }
}


export default anecdoteReducer