const router = require('express').Router()
const {User, Item, Order, OrderItem} = require('../db/models')
const db = require('../db')
const {Op} = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      // const order = await Order.create()
      // const baseball = await Item.create({
      //   name: 'baseball',
      //   description: 'This is a baseball. You play games with it. Have fun.',
      //   price: 99.99,
      //   stock: 10000,
      //   category: 'sport things',
      //   photoURLs: ['https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg']
      // })
      // await order.setUser(req.user)
      // await order.addItem(baseball, {through: {quantity: 2}})
      // const items = await Order.findAll({where: {
      //   id: order.id
      // }, include: [{model: Item}]})
      // console.log(items)
      const {dataValues: {id}} = req.user
      const [order] = await Order.findOrCreate({
        where: {
          userId: id,
          ordered: false
        },
        include: [{model: Item}]
      })
      console.log(order)
      const cart = order.dataValues
      if (cart.items) {
        cart.items = cart.items.map(item => {
          const newItem = item.dataValues
          newItem.quantity = newItem.order_item.dataValues.quantity
          return newItem
        })
      } else {
        cart.items = []
      }
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})
