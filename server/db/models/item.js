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
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
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
  }
})

Item.beforeValidate(item => {
  if (!item.photoURLs) {
    item.photoURLs = [
      'https://lakelandescaperoom.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg'
    ]
  }
})

// Item.beforeCreate(item => {
//   if (typeof item.price === 'number') {
//     item.price = item.price * 100
//   }
// })

module.exports = Item
