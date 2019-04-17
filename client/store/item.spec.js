// /* global describe beforeEach afterEach it */

// import {expect} from 'chai'
// import {getItemList, getSelectItem} from './item'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {user: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('get all items', () => {
//     it('eventually dispatches the GET ALL ITEMS action', async () => {
//       const fakeItem = {
//         name: 'baseball',
//         description: 'This is a baseball. You play games with it. Have fun.',
//         price: 99.99,
//         stock: 10000,
//         category: 'sport',
//         photoURLs: ['https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg']
//       }
//       mockAxios.onGet('/api/items').replyOnce(200, fakeItem)
//       await store.dispatch(getItemList())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('SET_ITEM_LIST')
//       expect(actions[0].itemList).to.include(fakeItem)
//     })
//   })

//   describe('logout', () => {
//     it('logout: eventually dispatches the REMOVE_USER action', async () => {
//       mockAxios.onPost('/auth/logout').replyOnce(204)
//       await store.dispatch(logout())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('REMOVE_USER')
//       expect(history.location.pathname).to.be.equal('/login')
//     })
//   })
// })
