import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'



const Statistics = ({ stats }) => {
  if (stats.count === 0) {
    return (
      <p>
        Ei yhtään palautetta
      </p>
    )
  } else {
    return (
      <table>
        <Statistic name="Hyvä " value={stats.good} />
        <Statistic name="Neutraali " value={stats.ok} />
        <Statistic name="Huono " value={stats.bad} />
        <Statistic name="Keskiarvo " value={stats.keskiarvo.toFixed(1)} />
        <Statistic name="Positiivisia " value={stats.positiivisia.toFixed(1)} aftertext=" % " />
      </table>
    )
  }
}

const Statistic = (props) => <tbody><tr><td>{props.name}</td><td>{props.value}{props.aftertext}</td></tr></tbody>


const store = createStore(counterReducer)


class App extends React.Component {

  handleClick = (value) => () => {
    store.dispatch({ type: value })
  }

  render() {
    const stats = store.getState()
    stats.sum = stats.good * 1 + stats.ok * 0 + stats.bad * (-1)
    stats.count = stats.good + stats.ok + stats.bad
    stats.keskiarvo = stats.sum / stats.count
    stats.positiivisia = stats.good * 100 / stats.count

    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={this.handleClick('GOOD')}>hyvä</button>
        <button onClick={this.handleClick('OK')}>neutraali</button>
        <button onClick={this.handleClick('BAD')}>huono</button>
        <h2>Statistiikka</h2>
        <Statistics stats={stats} />
      </div>
    )
  }

}


const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
render()
store.subscribe(render)

// store.subscribe(() => {
//   console.log('state: ', store.getState())
// })

