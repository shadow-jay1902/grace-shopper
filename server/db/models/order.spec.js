const { expect } = require('chai')
const db = require('../index')
const { Item, Order, OrderItem, User } = require('./')

let baseball;
let kenny;
let order;
let tennis;


describe.only('Order Model', () => {
    beforeEach(async () => {
        await db.sync({ force: true })

        baseball = await Item.create({
            name: 'baseball',
            description: 'This is a baseball. You play games with it. Have fun.',
            price: 99.99,
            stock: 10000,
            category: 'sport things',
            photoURLs: ['https://en.wikipedia.org/wiki/File:Baseball_(crop).jpg']
        })

        tennis = await Item.create({
          name: 'tennis',
          description: 'This is a tennis. You play games with it. Have fun.',
          price: 50.99,
          stock: 70,
          category: 'sport',
          photoURLs: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Closeup_of_a_tennis_ball_%282%29.jpg/1024px-Closeup_of_a_tennis_ball_%282%29.jpg'
          ]
        })

        kenny = await User.create({
            firstName: 'Kenny',
            lastName: 'Dofy',
            address: 'uyiuoypi;hlj',
            phone: '123-456-7890',
            dob: new Date(),
            email: 'kenny@puppybook.com',
            password: 'bones'
        })
    })
    it('Should create an empty order', async () => {

        const newOrder = await Order.create()
        await newOrder.setUser(kenny)
        expect(newOrder.dataValues.userId).to.equal(kenny.dataValues.id)
    })
    it('Should create an order with items', async () => {
        const newOrder = await Order.create()
        await newOrder.setUser(kenny)
        await newOrder.addItem(baseball, { through: { quantity: 2 } })
        await newOrder.addItem(baseball, { through: { quantity: 3 } })
        await newOrder.addItem(tennis, { through: { quantity: 4 } })
        const theOrder = await OrderItem.findAll({
          where: {
            orderId: newOrder.dataValues.id
          }
        })
        const theOrderItems = theOrder.reduce((acc, item) => {
          acc[item.dataValues.itemId] = item.dataValues
          return acc
        }, {})
        expect(theOrderItems[1].quantity).to.equal(3)
        expect(theOrderItems[2].quantity).to.equal(4)
    })
})
