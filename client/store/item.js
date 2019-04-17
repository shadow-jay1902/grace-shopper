import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_SELECT_ITEM = 'SET_SELECT_ITEM'
const SET_ITEM_LIST = 'SET_ITEM_LIST'

/**
 * INITIAL STATE
 */
const initialState = {
  item: {},
  itemList: []
}

/**
 * ACTION CREATORS
 */
const setSelectItem = item => ({type: SET_SELECT_ITEM, item})
const setItemList = itemList => ({type: SET_ITEM_LIST, itemList})

/**
 * THUNK CREATORS
 */
export const getSelectItem = item => async dispatch => {
  try {
    const res = await axios.get(`/api/items/${item.id}`)
    dispatch(setSelectItem(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getItemList = () => async dispatch => {
  try {
    const res = await axios.get(`/api/items/`)
    dispatch(setItemList(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECT_ITEM:
      return {...state, item: action.item}
    case SET_ITEM_LIST:
      return {...state, itemList: [...action.itemList]}
    default:
      return state
  }
}
