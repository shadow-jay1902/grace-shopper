const router = require('express').Router()
const { Item, Order, OrderItem} = require('../db/models')
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
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const {id} = req.user
      const order = await Order.findOne({
        where: {
          userId: id,
          ordered: false
        }
      })
      const orderId = order.id
      req.body.orderId = orderId
      const itemId = req.body.id
      req.body.itemId = itemId
      const newOrderItem = await OrderItem.create(req.body)
      res.status(201).json(newOrderItem)
    } else {
      const sessionId = req.session.id
      const order = await Order.findOne({
        where: {
          guestId: sessionId,
          ordered: false
        }
      })
      if (order) {
        const orderId = order.id
        req.body.orderId = orderId
        const newOrderItem = await OrderItem.create(req.body)
        res.status(201).json(newOrderItem)
      } else {
        res.sendStatus(201)
      }
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    if (req.user) {
      const {dataValues: {id}} = req.user
      let order = await Order.findOne({
        where: {
          userId: id,
          ordered: false
        },
        include: [{model: Item}]
      })
      await OrderItem.destroy({
        where: {
          orderId: order.id,
          itemId: req.params.itemId
        }
      })
      res.sendStatus(204)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      const {dataValues: {id}} = req.user
      let order = await Order.findOne({
        where: {
          userId: id,
          ordered: false
        },
        include: [{model: Item}]
      })
      await OrderItem.update(
        {
          quantity: req.body.quantity
        },
        {
          where: {
            orderId: order.id,
            itemId: req.body.itemId
          }
        }
      )
      res.sendStatus(201)
    } else {
      res.sendStatus(201)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    if (req.user) {
      const {dataValues: {id}} = req.user
      const [, [updatedOrder]] = await Order.update(
        {
          ordered: true
        },
        {
          where: {
            userId: id,
            ordered: false
          },
          returning: true
        }
      )
      let order = await Order.findOne({
        where: {
          id: updatedOrder.id,
          ordered: true
        },
        include: [{model: Item}]
      })
      const cart = order.dataValues
      cart.items = cart.items.map(async item => {
        const newItem = item.dataValues
        newItem.quantity = newItem.order_item.dataValues.quantity
        const itemModel = await Item.findByPk(item.id)
        const newStock = itemModel.stock - newItem.quantity
        await itemModel.update({stock: newStock})
        return newItem
      })
      await Order.findOrCreate({
        where: {
          userId: id,
          ordered: false
        },
        include: [{model: Item}]
      })
      res.status(201).send(cart)
    } else {
      res.sendStatus(201)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/newcart', async (req, res, next) => {
  try {
    if (req.user) {
      const {id} = req.user
      const order = await Order.findOne({
        where: {
          userId: id,
          ordered: false
        }
      })
      const {items} = req.body
      const rowsToCreate = items.map(async item => {
        let itemInDB = await Item.findByPk(item.itemId)
        order.addItem(itemInDB, {
          through: {quantity: item.quantity}
        })
      })
      res.status(201).send(rowsToCreate)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/orderhistory', async (req, res, next) => {
  try {
    if (req.user) {
      const {dataValues: {id}} = req.user
      let orders = await Order.findAll({
        where: {
          userId: id,
          ordered: true
        },
        include: [{model: Item}]
      })
      const orderHistory = orders.map(order => {
        let singleOrder = order.dataValues
        if (singleOrder.items) {
          singleOrder.items = singleOrder.items.map(item => {
            const newOrder = item.dataValues
            newOrder.quantity = newOrder.order_item.dataValues.quantity

            return newOrder
          })
          return singleOrder
        }
      })
      res.json(orderHistory)
    } else {
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})
