const router = require('express').Router()
const Seller = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const sellers = await Seller.findAll()
    res.json(sellers)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const seller = await Seller.findByPk(id)
    res.json(seller)
  } catch (err) {
    next(err)
  }
})

router.post('/', async ({ body }, res, next) => {
  try {
    const seller = await Seller.create(body)
    res.json(seller)
  } catch (err) {
    next(err)
  }
})

module.exports = router
