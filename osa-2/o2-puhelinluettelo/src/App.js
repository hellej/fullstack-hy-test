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
         filteredpersons: [],
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
      const filter = event.target.value

      const containsfilter = (person) => {
         return person.name.toLowerCase().includes(filter.toLowerCase())
      }
      const filteredpersons = this.state.persons.filter(containsfilter)
      this.setState({ filteredpersons, filter })
   }

   nameInList = (nimi) => {
      if (this.findName(nimi) === -1) {
         return (false)
      } else { return (true) }
   }

   findName = (nimi) => {
      const names = this.state.persons.map(person => person.name.toLowerCase())
      const index = names.indexOf(nimi.toLowerCase())
      return (index)
   }

   getPersonsToShow = () => {
      if (this.state.filter === '') {
         return (this.state.persons)
      } else return (this.state.filteredpersons)
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const namesubm = this.state.newName

      if (!this.nameInList(namesubm)) {
         this.addPerson()
      } else if (window.confirm(`Nimi on jo listassa, vaihdetaanko nimelle ${namesubm} uusi numero?`)) {
         this.editNumber(namesubm)
      }
   }

   addPerson = () => {
      const newperson = {
         name: this.state.newName,
         number: this.state.newNumber
      }

      const getfilteredpersons = (newperson) => {
         let filteredpersons = this.state.filteredpersons
         if (newperson.name.toLowerCase().includes(this.state.filter.toLowerCase())) {
            filteredpersons = filteredpersons.concat(newperson)
         }
         return filteredpersons
      }

      luetteloService
         .create(newperson)
         .then(response => {
            console.log("create response: ", response);
            this.setState({
               persons: this.state.persons.concat(response),
               filteredpersons: getfilteredpersons(response),
               newName: '',
               newNumber: ''
            })
         })
      this.showMessage('info', 'Numero lisätty')
   }

   editNumber = (name) => {
      console.log("muokataan nimeä: ", name);
      const persontoedit = this.state.persons[this.findName(name)]
      const editedperson = { ...persontoedit, number: this.state.newNumber }
      console.log("editedperson: ", editedperson)

      luetteloService
         .update(editedperson.id, editedperson)
         .then(response => {
            console.log("update response: ", response)
            this.showMessage('info', 'Numero päivitetty')
            this.setState({
               persons: this.state.persons.map(person => person.name !== name ? person : editedperson),
               newName: '',
               newNumber: ''
            });
         })
         .catch(error => {
            console.log("update error: ", error);
            this.showMessage('error', `Henkilö ${editedperson.name} on jo valitettavasti poistettu palvelimelta`)
            this.setState({ persons: this.state.persons.filter(person => person.name !== name) });
            if (window.confirm('Nimeä ei löydykään luettelosta, lisätäänkö se?')) {
               this.addPerson()
            }
         })
   }

   deletePerson = (id) => {
      return () => {
         const persoatndex = this.state.persons.findIndex(person => person.id === id)
         const persontodelete = { ...this.state.persons[persoatndex] }
         console.log("person to delete: ", persontodelete)

         if (window.confirm(`Poistetaanko henkilö ${persontodelete.name}`)) {
            luetteloService
               .deletePerson(id)
               .then(response => {
                  console.log("delete response: ", response)
                  luetteloService
                     .getAll()
                     .then(response => {
                        console.log("getall response: ", response);
                        this.setState({
                           persons: response,
                           filteredpersons: this.state.filteredpersons.filter(person => person.id !== id)
                        });
                     })
               }
               )
         }
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