import axios from 'axios'
import {request} from 'https'

const GOT_ITEMS_FROM_CART = 'GOT_ITEMS_FROM_CART'
const SET_ITEM_ONTO_CART = 'SET_ITEM_ONTO_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const EDIT_CART = 'EDIT_CART'

const initialState = {
  items: []
}

const gotItemsFromCart = cart => ({type: GOT_ITEMS_FROM_CART, cart})

const setItemOntoCart = item => ({type: SET_ITEM_ONTO_CART, item})

const removeFromCart = itemId => ({type: REMOVED_FROM_CART, itemId})

const checkoutCart = () => ({
  type: CHECKOUT_CART
})
const editCart = (id, quantity) => ({
  type: EDIT_CART,
  id,
  quantity
})

export const getItemsFromCart = () => async (dispatch, getState) => {
  try {
    if (getState().user.id) {
      let res = await axios.get('/api/cart')
      let cart = window.localStorage.getItem('cart')
      if (cart) {
        cart = JSON.parse(cart)
        const requests = []
        for (let item of cart.items) {
          requests.push(axios.post('/api/cart', item))
        }
        await Promise.all(requests)
        window.localStorage.setItem('cart', '')
        res = await axios.get('/api/cart')
      }
      dispatch(gotItemsFromCart(res.data))
    } else {
      let cart = window.localStorage.getItem('cart')
      if (!cart) {
        let newCart = {items: []}
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        cart = window.localStorage.getItem('cart')
      }
      cart = JSON.parse(cart)
      cart.items = cart.items.map(item => ({...item, price: (item.price * 100)}))
      dispatch(gotItemsFromCart(cart))
    }
  } catch (err) {
    console.error(err)
  }
}

export const getItemOntoCart = item => async (dispatch, getState) => {
  try {
    if (getState().user.id) {
      const res = await axios.post('/api/cart', item)
      const createdOrderItem = res.data
      const action = setItemOntoCart(createdOrderItem)
      dispatch(action)
    } else {
      const currCart = JSON.parse(window.localStorage.getItem('cart'))
      const newCart = {
        ...currCart,

        items: [
          ...currCart.items.filter(({id}) => id !== item.id),
          {...item, quantity: 1}
        ]
      }
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      dispatch(setItemOntoCart(item))
    }
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCartThunk = itemId => async (dispatch, getState) => {
  try {
    if (getState().user.id) {
      const id = Number(itemId)
      await axios.delete(`/api/cart/${id}`)
      const action = removeFromCart(id)
      dispatch(action)
    } else {
      const currCart = JSON.parse(window.localStorage.getItem('cart'))
      const newCart = {
        ...currCart,
        items: [...currCart.items.filter(item => item.id !== itemId)]
      }
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      dispatch(removeFromCart(itemId))
    }
  } catch (err) {
    console.error(err)
  }
}

export const editItemOnCart = (itemId, quantity) => async (
  dispatch,
  getState
) => {
  try {
    if (getState().user.id) {
      await axios.put(`/api/cart/`, {itemId, quantity})
      dispatch(editCart(itemId, quantity))
    } else {
      const currCart = JSON.parse(window.localStorage.getItem('cart'))
      const newCart = {
        ...currCart,
        items: currCart.items.map(
          item => (item.id === itemId ? {...item, quantity} : item)
        )
      }
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      dispatch(editCart(itemId, quantity))
    }
  } catch (e) {
    console.log(e)
  }
}
export const checkoutCartThunk = (cb, redirect) => async (
  dispatch,
  getState
) => {
  try {
    console.log('REDIRECT: ', redirect)
    if (getState().user.id) {
      await axios.put('/api/cart/checkout')
      dispatch(checkoutCart())
      cb()
      window.localStorage.setItem('cart', '')
    } else {
      redirect()
    }
  } catch (error) {
    console.log(error)
  }
}

export const cartReducer = function(state = initialState, action) {
  switch (action.type) {
    case GOT_ITEMS_FROM_CART:
      return action.cart
    case SET_ITEM_ONTO_CART:
      return {...state, items: [...state.items, action.item]}
    case REMOVED_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== Number(action.itemId))
      }
    case CHECKOUT_CART:
      return initialState
    case EDIT_CART:
      console.log(action.quantity)
      return {
        ...state,
        items: state.items.map(
          item =>
            item.id === action.id ? {...item, quantity: action.quantity} : item
        )
      }
    default:
      return state
  }
}
