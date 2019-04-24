const Sequelize = require('sequelize');
const db = require('../db');

const defaultPhoto = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Frobuart%2Frobuart1601%2Frobuart160100363%2F51593901-store-icon-shop-icon-flat-design-shop-or-market-cartoon-shop-market-store-or-cafe-shop-store-isolate.jpg&imgrefurl=https%3A%2F%2Fwww.123rf.com%2Fphoto_51593901_stock-vector-store-icon-shop-icon-flat-design-shop-or-market-cartoon-shop-market-store-or-cafe-shop-store-isolate.html&docid=Mn0ChAWjERglQM&tbnid=gibuQAzhu9TaUM%3A&vet=10ahUKEwjGxaDos9fhAhWwm-AKHZ2rC-gQMwhbKAAwAA..i&w=1300&h=1300&bih=789&biw=1440&q=shop%20cartoomn&ved=0ahUKEwjGxaDos9fhAhWwm-AKHZ2rC-gQMwhbKAAwAA&iact=mrc&uact=8'

const Seller = db.define('sellers', {
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
  photoURLs: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    defaultValue: [defaultPhoto]
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isPhoneNumber(value) {
        const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/
        const valid = regex.test(value)
        if (!valid) throw new Error('Invalid Phone')
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Seller.defaultPhoto = defaultPhoto

module.exports = Seller
