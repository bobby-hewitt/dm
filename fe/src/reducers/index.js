import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import account from './account'

export default (history) => combineReducers({
  router: connectRouter(history),
  account
})

// configureStore.js
