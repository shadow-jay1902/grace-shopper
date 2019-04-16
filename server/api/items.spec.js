const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request.agent(app)
const Item = db.model('item')

const itemsArray = [
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
]

describe('Item routes', () => {
  beforeEach(async () => {
    await db.sync({force: true});
    await Item.bulkCreate(itemsArray);
  })

  describe('/api/items', () => {
    it('should respond with an array via JSON', async () => {
      const res = await agent
        .get('/api/items')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(3)
    })
  })

  describe('/api/items/:id', () => {
    it('should respond with a single item', async () => {
      const res = await agent
        .get('/api/items/1')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body.name).to.equal('baseball')
    })
  })

  describe('/api/items/category/:name', () => {
    it('should respond with items by category', async () => {
      const res = await agent
        .get('/api/items/category/music')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(1)
    })
  })
})
