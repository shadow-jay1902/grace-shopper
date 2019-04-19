const {expect} = require('chai')
const login = (agent, info) => {
  return new Promise((resolve, reject) => {
    agent
      .post('/auth/login')
      .send({
        email: info.email,
        password: info.password
      })
      .end((err, res) => {
        if (err) return reject(err)
        if (!res.body.id) return reject(new Error('NOT FOUND'))
        resolve()
      })
  })
}
const signup = (agent, info) => {
  return new Promise((resolve, reject) => {
    agent
      .post('/auth/signup')
      .send(info)
      .end((err, res) => {
        if (err) return reject(err)
        resolve(res.body)
      })
  })
}
const getCart = agent => {
  return new Promise((resolve, reject) => {
    agent.get('/api/cart').end((err, res) => {
      if (err) return reject(err)
      resolve(res.body)
    })
  })
}
const addToCart = (agent, data) => {
  return new Promise((resolve, reject) => {
    agent
      .post('/api/cart')
      .send(data)
      .end((err, res) => {
        if (err) return reject(err)
        resolve(res.body)
      })
  })
}
const removeFromCart = (agent, itemId) => {
  return new Promise((resolve, reject) => {
    agent.delete('/api/cart' + itemId).end((err, res) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
const updateItemInCart = (agent, data) => {
  return new Promise((resolve, reject) => {
    agent
      .put('/api/cart')
      .send(data)
      .end((err, res) => {
        if (err) return reject(err)
        resolve(res.body)
      })
  })
}
const expectCart = (body, type = 'guest', id = null, ordered = false) => {
  if (type === 'user') {
    expect(body.guestId).to.equal(null)
  } else {
    expect(typeof body.guestId).to.equal('string')
  }
  expect(body.userId).to.equal(id)
  expect(body.received).to.equal(null)
  expect(body.ordered).to.equal(ordered)
}
module.exports = {
  login,
  signup,
  getCart,
  addToCart,
  removeFromCart,
  updateItemInCart,
  expectCart
}
