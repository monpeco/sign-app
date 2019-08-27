import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App'
import { Router } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import ducks from '../ducks'

const history = createHistory()

const store = createStore(combineReducers({
    ...ducks
}), applyMiddleware(thunk))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App history={history} />
        </Router>
    </Provider>
,document.body.appendChild(document.createElement('div')),
  )
})