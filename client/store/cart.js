// import axios from 'axios'

// const GOT_ITEMS_FROM_CART = 'GOT_ITEMS_FROM_CART'
// const SET_ITEM_ONTO_CART = 'SET_ITEM_ONTO_CART'
// const REMOVED_FROM_CART = 'REMOVED_FROM_CART'

// const initialState = {
//   cartItems: [],
// }

// const gotItemsFromCart = items => ({ type: GOT_ITEMS_FROM_CART, items })

// const setItemOntoCart = item => ({ type: SET_ITEM_ONTO_CART, item})

// const removeFromCart = itemId => ({ type: REMOVED_FROM_CART, itemId })

// export const getItemsFromCart = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/cart')
//     dispatch(gotItemsFromCart(res.data))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const getItemOntoCart = item => async dispatch => {
//   try {
//     const res = await axios.post('/api/cart', item)
//     dispatch(setItemOntoCart(res.data))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const removeFromCart = itemId => async dispatch => {
//   try {
//     const id = Number(itemId)
//     await axios.delete(`/api/cart/:id`)
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const cartReducer = function(state = initialState, action) {
//   switch (action.type) {
//     case GOT_ITEMS_FROM_CART:
//       return {...state, cartItems: action.items}
//     case SET_ITEM_ONTO_CART:
//       return {...state, cartItems: [...state.cartItems, action.item]}
//     default:
//       return state
//   }
// }
