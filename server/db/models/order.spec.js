const { expect } = require('chai')
const db = require('../index')
const { Item, Order, OrderItem, User } = require('./')

let baseball;
let kenny;
let order;



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
    // it('Should create an order with items', async () => {
    //     const newOrder = await Order.create()
    //     await newOrder.setUser(kenny)
    //     // await newOrder.addItem(baseball)
    //     const {addItem} = newOrder
    //     newOrder.addItem = function(item, quantity = 1){

    //     }

    // })
})