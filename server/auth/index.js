const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  req.user = null
  res.status(204).send()
})

router.get('/me', (req, res) => {
  if (req.user) {
    const { dataValues: {
      firstName, id, lastName, email, googleId, address, phone, dob, createdAt, updatedAt
    } } = req.user;
    res.send({
      firstName, id, lastName, email, googleId, address, phone, dob, createdAt, updatedAt
    })
  } else {
    res.status(403).send('Not logged in');
  }
})

router.use('/google', require('./google'))
