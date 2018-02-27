import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import App from './App';

import anecdoteReducer from './reducer'

const store = createStore(anecdoteReducer)


const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)