const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

const itemsArray = [
  {
    name: 'baseball',
    description: 'This is a baseball. You play games with it. Have fun.',
    price: 99.99,
    stock: 10000,
    category: 'sport things',
    photoURLs: ['https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg']
  },
  {
    name: 'tennis',
    description: 'This is a tennis. You play games with it. Have fun.',
    price: 50.0,
    stock: 70,
    category: 'sport things',
    photoURLs: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Closeup_of_a_tennis_ball_%282%29.jpg/1024px-Closeup_of_a_tennis_ball_%282%29.jpg'
    ]
  },
  {
    name: 'guitar',
    description: 'This is a guitar. You play rock out with it. Have fun.',
    price: 200.0,
    stock: 10,
    category: 'music things',
    photoURLs: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/GuitareClassique5.png/153px-GuitareClassique5.png'
    ]
  }
]

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items', () => {
    beforeEach(() => {
      itemsArray.forEach(item => Item.create(item))
    })
    it('should return all the items in the database', () => {})
  })
})
