'use strict'

const db = require('../server/db')
const {User, Item} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = Array(20)
    .fill('x')
    .map(() => ({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      dob: faker.date.past()
    }))

  users.push({
    email: 'DDeez@fakemail.com',
    firstName: 'Danny',
    lastName: 'D',
    password: '12345',
    address: '123 fake street',
    phone: '555-666-5555',
    dob: new Date()
  })

  await User.bulkCreate(users)

  // const categories = ['sports', 'food', 'clothes', 'collectables', 'hype']

  // const items = Array(200)
  //   .fill('x')
  //   .map(() => ({
  //     name: faker.commerce.productName(),
  //     description: faker.lorem.sentence(),
  //     price: faker.commerce.price() / 100,
  //     stock: Math.floor(Math.random() * 100),
  //     category: categories[Math.floor(Math.random() * categories.length)],
  //     photoURLs: [faker.image.image()]
  //   }))

  // await Item.bulkCreate(items)

  await Item.bulkCreate([
    {
      name: 'The Debugger',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100 + 1),
      category: 'miscellaneous',
      photoURLs: ['https://www.probytes.net/wp-content/uploads/2018/01/4-1.png']
    },
    {
      name: 'The Python Semicolon',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'other languages',
      photoURLs: [
        'https://www.probytes.net/wp-content/uploads/2018/01/15-1.png'
      ]
    },
    {
      name: 'The Semicolons',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'other languages',
      photoURLs: ['https://i.imgur.com/x4bSHRy.png']
    },
    {
      name: 'The Address',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'miscellaneous',
      photoURLs: [
        'https://www.probytes.net/wp-content/uploads/2018/01/13-1.png'
      ]
    },
    {
      name: 'The Bootstrap',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'frontend',
      photoURLs: ['https://www.probytes.net/wp-content/uploads/2018/01/9-1.png']
    },
    {
      name: 'The First Word',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'miscellaneous',
      photoURLs: ['https://www.probytes.net/wp-content/uploads/2018/01/9-1.jpg']
    },
    {
      name: 'The Driver',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'miscellaneous',
      photoURLs: [
        'http://devhumor.com/content/uploads/images/January2019/race-car.png'
      ]
    },
    {
      name: 'The Colleague',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'other languages',
      photoURLs: [
        'http://devhumor.com/content/uploads/images/August2018/javascript.png'
      ]
    },
    {
      name: 'The Evaluation',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'other languages',
      photoURLs: [
        'http://lovemyecho.com/wp-content/uploads/2016/03/ProgrammingLanguagesMeme.jpg'
      ]
    },
    {
      name: 'The JS Logic',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'javascript',
      photoURLs: [
        'http://devhumor.com/content/uploads/images/June2018/thanks_javascript.png'
      ]
    },
    {
      name: 'The "0"===[]',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'javascript',
      photoURLs: [
        'http://devhumor.com/content/uploads/images/March2018/javascript_equals.png'
      ]
    },
    {
      name: 'The Awaits',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'javascript',
      photoURLs: [
        'https://pics.me.me/when-you-want-to-write-async-code-in-javascript-async-34986517.png'
      ]
    },
    {
      name: 'The Christmas Tree',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'miscellaneous',
      photoURLs: [
        'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-851-advanced-data-structures-spring-2012/6-851s12.jpg'
      ]
    },
    {
      name: 'The Ignore',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'git',
      photoURLs: [
        'https://preview.redd.it/zo0c94gz6et21.png?width=960&crop=smart&auto=webp&s=eab5fc211622090e4248451dabaab0780e2155e6'
      ]
    },
    {
      name: 'The Undefined',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'javascript',
      photoURLs: ['https://i.redd.it/l9y8judfjdt21.jpg']
    },
    {
      name: 'The Platypus',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'git',
      photoURLs: ['https://i.redd.it/2hsi2rrts7t21.png']
    },
    {
      name: 'The Copy and Paste',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'miscellaneous',
      photoURLs: ['https://i.redd.it/cyzbsh8lh3t21.jpg']
    },
    {
      name: 'The Merge Me In',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'git',
      photoURLs: ['https://i.redd.it/bt3kmzckn4t21.jpg']
    },
    {
      name: 'The HTML in JS',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'frontend',
      photoURLs: ['https://i.imgflip.com/2kuh6f.jpg']
    },
    {
      name: 'The SQL or NoSQL',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'backend',
      photoURLs: [
        'https://memegenerator.net/img/instances/71932717/to-sql-or-nosql-thats-the-query.jpg'
      ]
    },
    {
      name: 'The Select From',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'backend',
      photoURLs: [
        'http://devhumor.com/content/uploads/images/March2018/select_from.png'
      ]
    },
    {
      name: 'The SQL Clause',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'backend',
      photoURLs: [
        'http://devhumor.com/content/uploads/images/December2017/wp_ss_20171224_0001.png'
      ]
    },
    {
      name: 'The SQL Query',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'backend',
      photoURLs: ['https://i.imgflip.com/rtcwz.jpg']
    },
    {
      name: 'The Jurrasic Parse',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'backend',
      photoURLs: ['https://i.imgur.com/ERvJfDO.jpg']
    },
    {
      name: 'The C(up)SS',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'frontend',
      photoURLs: [
        'https://www.bram.us/wordpress/wp-content/uploads/2017/01/css-is-awesome.jpg'
      ]
    },
    {
      name: 'The Titanic',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'frontend',
      photoURLs: [
        'https://starecat.com/content/wp-content/uploads/titanic-float-none-css-programming.jpg'
      ]
    }
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
