const User = require('./user')
const Item = require('./item')
const Seller = require('./seller')
const Order = require('./order')
const OrderItem = require('./order_item')

User.hasMany(Order)
Order.belongsTo(User)
Item.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Item, {through: OrderItem})

module.exports = {
  User,
  Item,
  Seller,
  Order,
  OrderItem
}
