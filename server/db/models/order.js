const Sequelize = require('sequelize');
const db = require('../db');


const Order = db.define('order', {
    guestId: {
        type: Sequelize.STRING,
    },
    ordered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    received: {
        type: Sequelize.BOOLEAN,
    }
})

Order.beforeCreate((order) => {
    if (order.userId) order.guestId = null;
})
module.exports = Order