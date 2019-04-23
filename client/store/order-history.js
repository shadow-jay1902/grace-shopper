import axios from 'axios'

const GOT_ORDER_HISTORY = 'GOT_ORDER_HISTORY'

const initialState = {
  history: []
}

const gotOrderHistory = history => ({type: GOT_ORDER_HISTORY, history})

export const getOrderHistoryThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart/orderhistory')
    dispatch(gotOrderHistory(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const orderHistoryReducer = function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER_HISTORY:
      return {...state, history: action.history}
    default:
      return state
  }
}
