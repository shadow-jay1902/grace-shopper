/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Item = db.model('item')

beforeEach(() => {
  return db.sync({ force: true })
})
describe('Item model', () => {
  describe('instanceMethods', () => {
    describe('good instance', () => {
      let baseball

      beforeEach(async () => {
        baseball = await Item.create({
          name: 'baseball',
          description: 'This is a baseball. You play games with it. Have fun.',
          price: 99.99,
          stock: 10000,
          category: 'sport things',
          photoURLs: ['https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg']
        })
      })

      it('successfully creates a new item with valid input', async () => {
        let retrievedItem = await Item.findOne({ where: { name: 'baseball' } })
        expect(retrievedItem.name).to.equal(baseball.name)
        expect(retrievedItem.description).to.equal(baseball.description)
        expect(retrievedItem.price).to.equal(baseball.price)
        expect(retrievedItem.stock).to.equal(baseball.stock)
        expect(retrievedItem.category).to.equal(baseball.category)
        expect(retrievedItem.photoURLs[0]).to.equal(baseball.photoURLs[0])
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
  describe('Does not allow bad inputs', () => {
    let baseball
    beforeEach(async () => {
      baseball = {
        name: 'baseball',
        description: 'This is a baseball. You play games with it. Have fun.',
        price: 99.99,
        stock: 10000,
        category: 'sport things',
        photoURLs: ['https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg']
      }
    })

    it('Should not allow empty name', done => {
      baseball.name = null
      Item.create(baseball)
        .then(() => done(new Error('Bad Item created')))
        .catch(() => done())
    })
    it('Should not allow empty description', done => {
      baseball.description = null
      Item.create(baseball)
        .then(() => done(new Error('Bad Item created')))
        .catch(() => done())
    })
    it('Should not allow a price that is not a float', done => {
      baseball.price = 'fghasdjfhsahdgk'
      Item.create(baseball)
        .then(() => done(new Error('Bad Item created')))
        .catch(() => done())
    })
    it('Should not allow a price that is negative', done => {
      baseball.price = -22.0
      Item.create(baseball)
        .then(() => done(new Error('Bad Item created')))
        .catch(() => done())
    })
    it('Should not allow a price that null', done => {
      baseball.price = null
      Item.create(baseball)
        .then(() => done(new Error('Bad Item created')))
        .catch(() => done())
    })
    it('Should not allow a stock that is negative', done => {
      baseball.stock = -22
      Item.create(baseball)
        .then(() => done(new Error('Bad Item created')))
        .catch(() => done())
    })
    it('Should not allow a stock that null', done => {
      baseball.stock = null
      Item.create(baseball)
        .then(() => done(new Error('Bad Item created')))
        .catch(() => done())
    })
    it('Should default category to "miscellaneous" if no value given', async () => {
      let baseballWOCat = {
        name: 'baseball',
        description: 'This is a baseball. You play games with it. Have fun.',
        price: 99.99,
        stock: 10000,
        photoURLs: ['https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg']
      }
      await Item.create(baseballWOCat)
      let retrievedItem = await Item.findOne({ where: { name: 'baseball' } })
      expect(retrievedItem.category).to.equal('miscellaneous')
    })
    it('Should set photos passed in within photoURLs property', async () => {
      await Item.create(baseball)
      let retrievedItem = await Item.findOne({ where: { name: 'baseball' } })
      expect(retrievedItem.photoURLs[0]).to.equal('https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg')
    })
    //Later on, we should make a test to confirm sellerID belongs to an exitsing seller
  })
}) // end describe('User model')
