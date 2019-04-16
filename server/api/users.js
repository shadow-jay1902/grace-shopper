const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/current', (req, res, next) => {
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
