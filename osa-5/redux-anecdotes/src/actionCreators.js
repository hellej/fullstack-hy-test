

const actionFor = {
  voteAnecdote(id) {
    return { type: 'vote', id: id }
  },
  createAnecdote(content) {
    return { type: 'add', content: content }
  }

}

export default actionFor