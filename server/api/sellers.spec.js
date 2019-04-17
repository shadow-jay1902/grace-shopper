// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const agent = request.agent(app)
// const Seller = require('../db/models/seller')

// let aSeller

// beforeEach(async () => {
//   aSeller = {
//     name: 'First Seller',
//     description: 'First one in the business.',
//     phone: '123-456-7890',
//     email: 'first@gmail.com'
//   }
//   await db.sync({force: true})
//   const newSeller = await Seller.create(aSeller)
//   console.log(newSeller)
// })

// describe.only('Seller routes', () => {
  // describe('/api/sellers', () => {
  //   it('should respond with all sellers', async () => {
  //     const res = await agent
  //       .get('/api/sellers')
  //       .expect(200)
  //     console.log(res.body)
  //   })
  // })
// })
