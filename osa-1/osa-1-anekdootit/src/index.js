import React from 'react'
import ReactDOM from 'react-dom'



const DisplayAnecdote = (props) => {
  return  (
    <div>{props.anecdote.text}</div>
    )   
  }
  
const DisplayVotes = (props) => {
  return(
    <div> Votes: {props.anecdote.votes}</div>
    )
  }

 const DisplayMostVoted = (props) => {
  return(
    <div> Most voted: {props.anecdote.text} </div>
  )
 } 



const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )




const CreateObjectArray = (array) => {

  let anecdotes = []
  
  for (let i = 0; i < array.length; i++) {
    let anecdote = {}
    anecdote.text = array[i]
    anecdote.votes = 0 
    anecdotes.push(anecdote)
  }

  return (
    anecdotes
  )
}




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdotes: CreateObjectArray(this.props.anecdotes)
    }
  }

  randomnum = () => {
    return (
        Math.floor(Math.random() * 6)
    )
  }

  shownext = () => {
      return() => {
          this.setState({selected: this.randomnum()})
      }
  }

  voteselected = (anecdotes) => {
    return() => {
      anecdotes[this.state.selected].votes = anecdotes[this.state.selected].votes + 1
      this.setState({anecdotes: anecdotes})
    }
  }

  getmostvoted = (anecdotes) => {
    anecdotes.sort((a,b) => a.votes - b.votes)
      return(
        anecdotes[anecdotes.length-1]
      )
  }


  render() {
    const anecdotes = Object.assign([], this.state.anecdotes)
    console.log("Anecdotes copy: ", anecdotes)

        return (
            <div>
                <DisplayAnecdote anecdote={this.state.anecdotes[this.state.selected]} />
                <DisplayVotes anecdote={this.state.anecdotes[this.state.selected]} />
                <Button handleClick={this.voteselected(this.state.anecdotes)} text="VOTE" />
                <Button handleClick={this.shownext()} text="NEXT" />
                <DisplayMostVoted anecdote = {this.getmostvoted(anecdotes)} />
                <DisplayVotes anecdote={this.getmostvoted(anecdotes)} />
            </div>
        )
  }
}




const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]





ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)