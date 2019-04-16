const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT(2),
    allowNull: false,
    validate: {
      min: 0,
      isFloat: true
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  category: {
    type: Sequelize.STRING,
    defaultValue: 'miscellaneous'
  },
  photoURLs: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  sellerID: {
    type: Sequelize.INTEGER
  }
})

Item.beforeValidate(item => {
  if (!item.photoURLs) {
    item.photoURLs = [
      'https://lakelandescaperoom.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg'
    ]
  }
})

module.exports = Item
