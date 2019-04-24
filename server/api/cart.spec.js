const request = require('supertest')
const {expect} = require('chai')
const app = require('../index')
const Item = require('../db/models/item')
const db = require('../db')
const Utils = require('../testUtils')
let agent
let codyInfo = {
  firstName: 'Cody',
  lastName: 'Dofy',
  address: 'uyiuoypi;hlj',
  phone: '123-456-7890',
  dob: new Date(),
  email: 'cody@puppybook.com',
  password: 'bones'
}

let items
const createItems = async () => {
  items = await Item.bulkCreate([
    {
      name: 'baseball',
      description: 'This is a baseball. You play games with it. Have fun.',
      price: 99.99,
      stock: 10000,
      category: 'sport',
      photoURLs: ['https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg']
    },
    {
      name: 'tennis',
      description: 'This is a tennis. You play games with it. Have fun.',
      price: 50.99,
      stock: 70,
      category: 'sport',
      photoURLs: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Closeup_of_a_tennis_ball_%282%29.jpg/1024px-Closeup_of_a_tennis_ball_%282%29.jpg'
      ]
    },
    {
      name: 'guitar',
      description: 'This is a guitar. You play rock out with it. Have fun.',
      price: 200.99,
      stock: 10,
      category: 'music',
      photoURLs: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/GuitareClassique5.png/153px-GuitareClassique5.png'
      ]
    }
  ])
}

describe('Order routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    agent = request.agent(app)
  })
  describe('Add items to cart', () => {
    beforeEach(createItems)
    it('Should add items for the logged in user', async () => {
      const user = await Utils.signup(agent, codyInfo)
      const data = {
        id: 1,
        quantity: 2
      }
      const order = await Utils.getCart(agent)
      const {body} = await agent
        .post('/api/cart')
        .send(data)
        .expect(201)
      Utils.expectCart(order, 'user', user.id)
      expect(body.itemId).to.equal(1)
      expect(body.orderId).to.equal(1)
      expect(body.quantity).to.equal(2)
    })
    it('Should have all of the items that were added to the users cart', async () => {
      const user = await Utils.signup(agent, codyInfo)
      const data1 = {
        id: 1,
        quantity: 2
      }
      const data2 = {
        id: 2,
        quantity: 4
      }
      const order = await Utils.getCart(agent)
      await agent
        .post('/api/cart')
        .send(data1)
        .expect(201)
      const {body} = await agent
        .post('/api/cart')
        .send(data2)
        .expect(201)
      Utils.expectCart(order, 'user', user.id)
      expect(body.itemId).to.equal(2)
      expect(body.orderId).to.equal(1)
      expect(body.quantity).to.equal(4)
    })
  })
  describe('Remove items from carts', () => {
    beforeEach(createItems)
    it('Should remove items from the users cart', async () => {
      const user = await Utils.signup(agent, codyInfo)
      const data1 = {
        id: 1,
        quantity: 2
      }
      const data2 = {
        id: 2,
        quantity: 4
      }
      await Utils.getCart(agent)

      await agent
        .post('/api/cart')
        .send(data1)
        .expect(201)
      await agent
        .post('/api/cart')
        .send(data2)
        .expect(201)
      await agent.delete('/api/cart/' + 2).expect(204)
      const body = await Utils.getCart(agent)
      Utils.expectCart(body, 'user', user.id)
      expect(body.items[0].id).to.equal(1)
      expect(body.items[1]).to.equal(undefined)
    })
  })
  describe('Update cart', () => {
    beforeEach(createItems)
    it('Should update the quatity of items in a users cart', async () => {
      const user = await Utils.signup(agent, codyInfo)
      const data1 = {
        id: 1,
        quantity: 2
      }
      const data2 = {
        id: 2,
        quantity: 4
      }
      await Utils.getCart(agent)
      await agent
        .post('/api/cart')
        .send(data1)
        .expect(201)
      await agent
        .post('/api/cart')
        .send(data2)
        .expect(201)
      await agent
        .put('/api/cart')
        .send({
          itemId: 1,
          quantity: 5
        })
        .expect(201)
      const order = await Utils.getCart(agent)
      Utils.expectCart(order, 'user', user.id)
      expect(order.items[0].quantity).to.equal(5)
    })
  })
  describe('Checkout', () => {
    beforeEach(createItems)
    it('Should checkout a users cart', async () => {
      const user = await Utils.signup(agent, codyInfo)
      const data1 = {
        id: 1,
        quantity: 2
      }
      const data2 = {
        id: 2,
        quantity: 4
      }
      await Utils.getCart(agent)
      await agent.post('/api/cart').send(data1)
      await agent.post('/api/cart').send(data2)
      const {body} = await agent.put('/api/cart/checkout').expect(201)
      Utils.expectCart(body, 'user', user.id, true)
    })
  })
  describe('Newcart', () => {
    beforeEach(createItems)
    it('Should make a new cart populated by the local storage if it already existed', async () => {
      await Utils.signup(agent, codyInfo)
      const data1 = {
        itemId: 1,
        quantity: 2
      }
      const data2 = {
        itemId: 2,
        quantity: 4
      }
      const body = {items: [data1, data2]}
      const initialCart = await Utils.getCart(agent)
      expect(initialCart.items).to.deep.equal([])
      await agent
        .post('/api/cart/newcart')
        .send(body)
        .expect(201)
      const updatedCart = await Utils.getCart(agent)
      expect(updatedCart.items[0].id).to.equal(1)
      expect(updatedCart.items[1].id).to.equal(2)
      expect(updatedCart.items[0].quantity).to.equal(2)
      expect(updatedCart.items[1].quantity).to.equal(4)

    })
  })
})
