const Sequelize = require('sequelize');
const db = require('../db');
// db.query(`CREATE TABLE order_items
// (
//          userId INTEGER NOT NULL,
//          itemId INTEGER NOT NULL,
//          tag1 VARCHAR(20),
//          tag2 VARCHAR(20),
//          tag3 VARCHAR(20),
//          PRIMARY KEY(question_id, tag_id)
// );`)

const OrderItem = db.define('order_item', {
    // orderId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     primaryKey: true
    // },
    // itemId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     primaryKey: true
    // },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

})
module.exports = OrderItem