import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import appReducer from './reducer'

const reducers = combineReducers({
  routing,
  appReducer,
  form
})

export default reducers
