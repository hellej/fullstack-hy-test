import React from 'react';
import ReactDOM from 'react-dom';


const Palautteenanto = () => {
  return(
    <h2> Palautteenanto: </h2>
  )
}

const Statistiikka = () => {
  return(
    <h2>Statistiikka: </h2>
  )
}

const Statistic = (props) => <tbody><tr><td>{props.name}</td><td>{props.value}{props.aftertext}</td></tr></tbody>


const Statistics = ({stats}) => {
  if (stats.count===0) {
    return(
      "Ei yhtään palautetta"
    )
  } else {
      return (
        <table>
          <Statistic name= "Hyvä " value={stats.hyva} />
          <Statistic name= "Neutraali " value={stats.neutraali} />
          <Statistic name= "Huono " value={stats.huono} />
          <Statistic name= "Keskiarvo " value={stats.keskiarvo.toFixed(1)} />
          <Statistic name= "Positiivisia " value={stats.positiivisia.toFixed(1)} aftertext=" % " />
        </table>
      )
  }
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
      hyva: 0,
      neutraali: 0,
      huono: 0
        }
  }


  increaseByOne = (nappi) => {
    return () => {
      if(nappi==='hyva') {
        this.setState({ hyva: this.state.hyva + 1 })
      } else if (nappi==='neutraali') {
        this.setState({neutraali: this.state.neutraali + 1})
      } else if (nappi==='huono') {
        this.setState({huono: this.state.huono + 1})
      }
    }
  }


  
    render() {

      const stats = this.state
      stats.sum = stats.hyva*1+stats.neutraali*0+stats.huono*(-1)
      stats.count = stats.hyva+stats.neutraali+stats.huono
      stats.keskiarvo = stats.sum/stats.count
      stats.positiivisia = stats.hyva*100/stats.count

      return (
        <div>
          <Palautteenanto />
          <p>
            <Button handleClick={this.increaseByOne("hyva")} text="hyvä" />
            <Button handleClick={this.increaseByOne("neutraali")} text= "neutraali" />
            <Button handleClick={this.increaseByOne("huono")} text="huono" />
          </p>
          <Statistiikka />
          <Statistics stats={stats} />
        </div>
      )
    }
  }




ReactDOM.render(<App />, document.getElementById('root'));