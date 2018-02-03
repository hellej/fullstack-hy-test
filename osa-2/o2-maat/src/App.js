import React from 'react';
import axios from 'axios';


const Display = (props) => {

   if (props.countries.length > 9 && props.filter !== '') {
      return (<Einayteta count={props.countries.length} />)
   }
   if (props.countries.length === 1) {
      return (<MaanTiedot country={props.countries[0]} />)
   }
   return (
      <Maat countries={props.countries} handleclick={props.handleclick} />
   )
}

const Maat = (props) => {
   return (
      <div>
         {props.countries.map(country => (
            <Maa
               key={country.name}
               country={country}
               handleclick={props.handleclick}
            />))
         }
      </div>
   )
}

const Maa = (props) => {
   return (
      <div id={props.country.name} onClick={props.handleclick}>
         {props.country.name}
      </div>
   )
}

const MaanTiedot = ({ country }) => {
   return (
      <div>
         <h2>{country.name}</h2>
         <Tieto attribute="Capital: " value={country.capital} />
         <Tieto attribute="Population: " value={country.population} />
         <Image src={country.flag} alt="flag" />
      </div>
   )
}

const Tieto = (props) => {
   return (
      <div>
         {props.attribute} {props.value}
      </div>
   )
}

const Image = (props) => {
   return (
      <p>
         <img src={props.src} alt={props.alt} height="20%" width="20%" />
      </p>
   )
}

const Einayteta = ({ count }) => {
   return (
      <div>
         Liian monta hakutulosta ({count}), rajaa hakua.
      </div>
   )
}

const Input = (props) => {
   return (
      <input
         value={props.value}
         onChange={props.handleChange}
         onClick={props.handleClick}
      />
   )
}


class App extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         countries: [],
         filtcountries: [],
         filter: ''
      }
   }

   componentWillMount() {
      console.log('will mount')
      axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response => {
            console.log('promise fulfilled')
            this.setState({ countries: response.data })
         })
   }

   handleFilterChange = (event) => {

      // TÄMÄKIN TOIMII
      // const containsfilter = (obj) => {
      //    const filter = event.target.value
      //    return obj.name.toLowerCase().includes(filter.toLowerCase())
      // }
      // const filtcountries = this.state.countries.filter(containsfilter)

      console.log("Target (filter): ", event.target.value)

      const filter = event.target.value
      const filtcountries = this.state.countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

      this.setState({
         filtcountries,
         filter
      })
   }

   handleFilterClick = () => {
      this.setState({
         filtcountries: [],
         filter: ''
      })
   }

   handleMaaClick = (event) => {
      console.log("Target id: ", event.target.id)

      const klickedcountry = this.state.countries.find(country => country.name === event.target.id)
      console.log("Got country: ", klickedcountry)
      const filtcountries = [klickedcountry]

      this.setState({
         filtcountries,
         filter: ''
      })
   }

   getCountriesToShow = () => {
      if (this.state.filtcountries.length > 0) {
         return (this.state.filtcountries)
      } else return (this.state.countries)
   }

   render() {
      return (
         <div>
            <Input
               value={this.state.filter}
               handleChange={this.handleFilterChange}
               handleClick={this.handleFilterClick} />
            <Display
               countries={this.getCountriesToShow()}
               filter={this.state.filter}
               handleclick={this.handleMaaClick} />
         </div>
      )
   }
}




export default App
