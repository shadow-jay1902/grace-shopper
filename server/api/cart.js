const router = require('express').Router()
const {User, Item, Order, OrderItem} = require('../db/models')
const db = require('../db')
const {Op} = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const sessionId = req.session.id

      const {dataValues: {id}} = req.user
      let order = await Order.findOne({
        where: {
          userId: id,
          ordered: false
        },
        include: [{model: Item}]
      })
      if (!order) {
        order = await Order.findOne({
          where: {
            guestId: sessionId,
            ordered: false
          },
          include: [{model: Item}]
        })
        order &&
          order.update({
            guestId: null,
            userId: id
          })
      }
      if (!order) {
        order = await Order.create({userId: id})
      }
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
    } else {
      const {id} = req.session
      const [order] = await Order.findOrCreate({
        where: {
          guestId: id,
          ordered: false
        },
        include: [{model: Item}]
      })
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
