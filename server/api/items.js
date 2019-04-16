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

router.get('/:id', async (req, res, next) => {
  try {
    const singleItem = await Item.findById(req.params.id)
    res.json(singleItem)
  } catch (error) {
    console.log('no item')
    next(error)
  }
})

router.get('/category/:name', async (req, res, next) => {
  try {
    const itemsByCat = await Item.find({
      where: {
        category: req.params.name
      }
    })
    res.json(itemsByCat)
  } catch (error) {
    next(error)
  }
})
