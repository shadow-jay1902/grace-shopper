import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {singleItemReducer, itemListReducer} from './item'
import {cartReducer} from './cart'
import {orderHistoryReducer} from './order-history'

const reducer = combineReducers({
  user,
  item: singleItemReducer,
  list: itemListReducer,
  cart: cartReducer,
  history: orderHistoryReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cart'
export * from './order-history'
