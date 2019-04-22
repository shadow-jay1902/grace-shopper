import axios from 'axios'

const GOT_ITEMS_FROM_CART = 'GOT_ITEMS_FROM_CART'
const SET_ITEM_ONTO_CART = 'SET_ITEM_ONTO_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'

const initialState = {
  items: []
}

const gotItemsFromCart = cart => ({type: GOT_ITEMS_FROM_CART, cart})

const setItemOntoCart = item => ({type: SET_ITEM_ONTO_CART, item})

const removeFromCart = itemId => ({type: REMOVED_FROM_CART, itemId})

const checkoutCart = () => ({
  type: CHECKOUT_CART
})

export const getItemsFromCart = () => async (dispatch, getState) => {
  try {
    if (getState().user.id) {
      const res = await axios.get('/api/cart')
      dispatch(gotItemsFromCart(res.data))
    } else {
      const cart = window.localStorage.getItem('cart')
      dispatch(gotItemsFromCart(JSON.parse(cart)))
      if (!cart) {
        let newCart = {items: []}
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        dispatch(gotItemsFromCart(newCart))
      }
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
      const currCart = getState().cart
      const newCart = {...currCart, items: [...currCart.items, item]}
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
    }
    else {
      const currCart = getState().cart
      const newCart = {...currCart, items: [...currCart.items.filter(item => item.id !== itemId)]}
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      dispatch(removeFromCart(itemId))
    }
  } catch (err) {
    console.error(err)
  }
}

export const checkoutCartThunk = cb => async dispatch => {
  try {
    await axios.put('/api/cart/checkout')
    dispatch(checkoutCart())
    cb()
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
    default:
      return state
  }
}
