import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import account from './account'
import user from './user'

export default (history) => combineReducers({
  router: connectRouter(history),
  user
})

// configureStore.js
