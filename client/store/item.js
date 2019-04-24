import axios from 'axios'

const SET_SELECT_ITEM = 'SET_SELECT_ITEM'
const SET_ITEM_LIST = 'SET_ITEM_LIST'

const defaultItem = {}
const defaultList = []

const setSelectItem = item => ({type: SET_SELECT_ITEM, item})
const setItemList = list => ({type: SET_ITEM_LIST, list})

export const getSelectItem = id => async dispatch => {
  try {
    const res = await axios.get(`/api/items/${id}`)
    dispatch(setSelectItem(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllItems = () => async dispatch => {
  try {
    const res = await axios.get(`/api/items/`)
    dispatch(setItemList(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getItemsByCat = cat => async dispatch => {
  try {
    const res = await axios.get(`/api/items/category/${cat}`)
    dispatch(setItemList(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const singleItemReducer = function(state = defaultItem, action) {
  switch (action.type) {
    case SET_SELECT_ITEM:
      return action.item
    default:
      return state
  }
}

export const itemListReducer = function(state = defaultList, action) {
  switch (action.type) {
    case SET_ITEM_LIST:
      return action.list
    default:
      return state
  }
}
