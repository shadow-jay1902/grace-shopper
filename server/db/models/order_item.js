const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('order_item', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

})

module.exports = OrderItem
