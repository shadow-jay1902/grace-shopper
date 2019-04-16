const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const User = require('../db/models/user');
const db = require('../db');

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
  await db.sync({force: true});
  agent = request.agent(app);
})

describe.only('Login', () => {
  let information;
  beforeEach(done => {
    agent.post('/auth/signup')
      .send(codyInfo)
      .expect((res) => {
        information = res.body;
      })
      .end(done)
  })

  it('should log in user', (done) => {
    const info = {...codyInfo};
    agent.post('/auth/login')
      .send({
        email: codyInfo.email,
        password: codyInfo.password
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.deep.equal(information);
        // console.log(res.body);
      })
      .end(done)
  })
})

describe.skip('Signup', () => {
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
        console.log(res.body)
      })
      .end(done)
  })
})
