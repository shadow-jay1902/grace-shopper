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

  await User.bulkCreate(users)

  // const categories = ['sports', 'food', 'clothes', 'collectables', 'hype']
  const categories = [
    'javascript',
    'debugging',
    'data structures',
    'html',
    'css',
    'react',
    'redux',
    'miscellaneous'
  ]

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
      name: 'I Do Have A Very Particular Set Of Skills',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'debugging',
      photoURLs: ['https://www.probytes.net/wp-content/uploads/2018/01/4-1.png']
    },
    {
      name: 'Played By Python',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'javascript',
      photoURLs: ['https://www.probytes.net/wp-content/uploads/2018/01/15-1.png']
    },
    {
      name: 'Are You Talking To Me?',
      description: faker.lorem.sentence(),
      price: faker.commerce.price() / 100,
      stock: Math.floor(Math.random() * 100),
      category: 'miscellaneous',
      photoURLs: ['https://www.probytes.net/wp-content/uploads/2018/01/13-1.png']
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
