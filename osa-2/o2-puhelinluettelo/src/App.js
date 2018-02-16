import React from 'react'
import luetteloService from './services/puhelinluettelo'
import './index.css'

const Viesti = ({ info, error }) => {

  if (info !== null) {
    return (
      <div className="info">
        {info}
      </div>
    )
  }
  if (error !== null) {
    return (
      <div className="error">
        {error}
      </div>
    )
  }
  return null
}


const Nimet = ({ luettelo, deletefun }) => {
  return (
    <table>
      <tbody>
        {luettelo.map(person => <Nimi key={person.name} person={person} deletefun={deletefun} />)}
      </tbody>
    </table>
  )
}

const Nimi = ({ person, deletefun }) => {
  return (
    <tr><td>{person.name}</td><td>{person.number}</td><td><Button text={"poista"} handleClick={deletefun(person.id)} /> </td></tr>
  )
}

const Input = (props) => {
  return (
    <input
      value={props.value}
      onChange={props.handleChange}
    />
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null,
      info: null
    }
  }

  componentWillMount() {
    console.log('will mount')
    luetteloService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
        console.log("getall response: ", response);
      })
  }




  showMessage = (type, text) => {
    console.log(`Show message (${type}): "${text}"`);

    let error = null, info = null

    if (type === 'error') {
      error = text
      info = null
    } else if (type === 'info') {
      error = null
      info = text
    } else {
      console.log("Wrong message type at showMessage()");
    }
    this.setState({
      error,
      info
    });
    setTimeout(() => {
      this.setState({
        error: null,
        info: null
      })
    }, 2500)
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  getPersonsToShow = () => {
    const containsfilter = (person) => {
      return person.name.toLowerCase().includes(this.state.filter.toLowerCase())
    }

    if (this.state.filter === '') {
      return (this.state.persons)
    } else return (this.state.persons.filter(containsfilter))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const name = this.state.newName
    const number = this.state.newNumber

    const existingPerson = this.state.persons.find(person => person.name === name)


    if (!existingPerson) {
      this.addPerson({ name, number })
    } else if (window.confirm(`Nimi on jo listassa, vaihdetaanko nimelle ${name} uusi numero?`)) {
      this.editNumber(existingPerson.id)
    }
  }

  addPerson = (person) => {

    luetteloService
      .create(person)
      .then(response => {
        console.log("create response: ", response);
        this.setState({
          persons: this.state.persons.concat(response),
          newName: '',
          newNumber: ''
        })
        this.showMessage('info', 'Numero lisätty')
      })
  }

  editNumber = (id) => {
    const name = this.state.newName
    const number = this.state.newNumber
    console.log("muokataan nimeä: ", name);

    luetteloService
      .update(id, { name, number })
      .then(response => {
        console.log("update response: ", response)
        this.setState({
          persons: this.state.persons.map(person => person.id !== id ? person : response),
          newName: '',
          newNumber: ''
        });
        this.showMessage('info', 'Numero päivitetty')
      })
      .catch(error => {
        console.log("update error: ", error);
        this.setState({ persons: this.state.persons.filter(person => person.id !== id) });
        this.showMessage('error', `Henkilö ${name} on jo valitettavasti poistettu palvelimelta`)
        if (window.confirm('Nimeä ei löydykään luettelosta, lisätäänkö se?')) {
          this.addPerson({ name, number })
        }
      })
  }

  deletePerson = (id) => {
    return () => {
      const person = this.state.persons.find(person => person.id === id)
      console.log("person to delete: ", person)

      if (!window.confirm(`Poistetaanko henkilö ${person.name}`)) {
        return
      }
      luetteloService
        .deletePerson(id)
        .then(response => {
          console.log("delete response: ", response)
          this.setState({
            persons: this.state.persons.filter(person => person.id !== id)
          });
          this.showMessage('info', `Poistettiin henkilö ${person.name}`)
        })
    }
  }


  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Viesti error={this.state.error} info={this.state.info} />
        <div>
          Etsi nimellä:{' '}
          <Input value={this.state.filter} handleChange={this.handleFilterChange} />
        </div>
        <h3>Lisää numero</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            nimi:{' '}
            <Input value={this.state.newName} handleChange={this.handleNameChange} /> {' '}
            numero:{' '}
            <Input value={this.state.newNumber} handleChange={this.handleNumberChange} /> {' '}
            <button type="submit">lisää</button>
          </div>
        </form>
        <h3>Numerot</h3>
        <Nimet luettelo={this.getPersonsToShow()} deletefun={this.deletePerson} />
      </div>
    )
  }
}


export default App