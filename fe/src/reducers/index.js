import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import account from './account'
import user from './user'
import setup from './setup'
import blog from './blog'
import product from './product'
import cart from './cart'

export default (history) => combineReducers({
  router: connectRouter(history),
  user,
  setup,
  blog,
  product,
  cart
})

// configureStore.js
