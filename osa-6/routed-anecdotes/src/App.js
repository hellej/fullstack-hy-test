import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import './index.css'
import { Table, Grid } from 'semantic-ui-react'
import GraceHopperImage from './img/grace-hopper.jpeg'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>Anecdote has {anecdote.votes} votes</div>
    <div>For more info see: <a href={anecdote.info}>{anecdote.info}</a> </div>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <p>According to Wikipedia:</p>

          <p><em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em> </p>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>

        </Grid.Column>
        <Grid.Column>
          <img src={GraceHopperImage} alt='Grace Hopper' width={200} />

        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    <p style={{ marginTop: 20 }}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
    </p>
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    )

  }
}


const Notification = ({ notification }) => {
  const style = {
    display: notification ? 'inline-block' : 'none',
    flex: 1,
    color: 'black',
    background: 'rgb(240, 255, 240)',
    fontSize: 17,
    border: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: '10px 10px 10px 10px',
    marginBottom: 10,
    marginTop: 10
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

let timeout


const StyledNavLinks = () => {

  return (
    <div>
      <StyledNavLink to='/about' text='about' />
      <StyledNavLink to='/' text='anecdotes' />
      <StyledNavLink to='/create' text='create' />
    </div>
  )
}


const StyledNavLink = ({ text, to }) => {

  console.log('HISTORY: ', window.location)
  // const isActive = (to) => {
  //   return window.location.pathname.includes(to)
  // }

  // if(isActive(to)) { const style = activeStyle} else {const style = basicStyle}

  return (
    <span>
      <NavLink
        activeStyle={{ fontWeight: 'bold', borderBottom: '2px solid black' }}
        className='a-navlink'
        exact to={to}>{text}
      </NavLink>
    </span>
  )
}



class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `Added anecdote: ${anecdote.content}`
    })

    console.log('anecdote: ', anecdote.content)
    console.log('noitif', this.state.anecdotes)

    timeout = setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)
    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <div>
              <StyledNavLinks />
              {/* <StyledNavLink to='/' text='anecdotes' />
            <StyledNavLink to='/about' text='about' />
            <StyledNavLink to='/create' text='create' /> */}
              {/* <NavLink style={navStyle} to='/'>anecdotes</NavLink> &nbsp; */}
              {/* <NavLink to='/about'>about </NavLink> &nbsp; */}
              {/* <NavLink to='/create'>create</NavLink> */}
            </div>
            <Notification notification={this.state.notification} />
            <Route path='/about' render={() => <About />} />
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path='/create' render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route path='/anecdotes/:id' render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            <Footer />
          </div>
        </Router>
      </Container>
    )
  }
}

export default App;
