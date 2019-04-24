const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const fetchedItems = await Item.findAll()
    res.json(fetchedItems)
  } catch (error) {
    next(error)
  }
})

router.get('/category/:name', async (req, res, next) => {
  try {
    const itemsByCat = await Item.findAll({
      where: {
        category: req.params.name
      }
    })
    res.json(itemsByCat)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let ID = Number(req.params.id)
    const singleItem = await Item.findByPk(ID)
    res.json(singleItem)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body)
    res.status(204).json(newItem)
  } catch (error) {
    next(error)
  }
})
