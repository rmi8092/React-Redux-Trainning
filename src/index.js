import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import App from './components/app'
import UserSelector from './containers/user_selector'
import UserForm from './containers/user_form'
import WelcomePage from './containers/welcome_page'

import reducers from './reducers'

import './index.scss'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, routerMiddleware(browserHistory))))

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={UserSelector} />
        <Route path="form" component={UserForm} />
        <Route path="welcome" component={WelcomePage} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container')
)