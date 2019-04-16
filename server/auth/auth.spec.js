const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const User = require('../db/models/user');
const db = require('../db');
const Utils = require('../testUtils')
let agent;
let codyInfo = {
  firstName: 'Cody',
  lastName: 'Dofy',
  address: 'uyiuoypi;hlj',
  phone: '123-456-7890',
  dob: new Date(),
  email: 'cody@puppybook.com',
  password: 'bones'
};

beforeEach(async () => {
  await db.sync({ force: true });
  agent = request.agent(app);
})

describe('Login', () => {
  let information;
  beforeEach(async () => {
    information = await Utils.signup(agent, codyInfo)
  })

  it('should log in a user', async () => {
    await Utils.login(agent, codyInfo)
    await agent.get('/auth/me')
      .expect(200)
      .expect(res => {
        expect(res.body).to.deep.equal(information)
      })
  })
})

describe.only('Signup', () => {
  const cody = {
    firstName: 'Codey',
    lastName: 'Pug',
    address: 'uyiuoypi;hlj',
    phone: '123-456-7890',
    dob: new Date(),
    email: 'codey@puppybook.com',
    password: 'bones'
  }

  it('should sign up the user', (done) => {
    agent.post('/auth/signup')
      .send(cody)
      .expect(200)
      .expect((res) => {
        for (const key in res.body) {
          if (!cody[key] || key === 'dob') continue;
          expect(cody[key]).to.equal(res.body[key])
        }
      })
      .end(done)
  })
})
// describe('Logout', () => {
//   it('should logout a logged in user', async () => {
//     await Utils.signup(agent, codyInfo)
//     await agent.post('/auth/logout')
//       .send()
//       .expect(204)

//     await agent.get('/auth/me')
//       .expect(403)
//   })
// })
