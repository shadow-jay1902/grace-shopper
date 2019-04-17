const db = require('../db')
const User = require('./user')
const Item = require('./item')
const Order = require('./order')
const OrderItem = require('./order_item')

User.hasMany(Order)
Order.belongsTo(User)
Item.belongsToMany(Order, { through: OrderItem })
Order.belongsToMany(Item, { through: OrderItem })

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Item, Order, OrderItem
}
