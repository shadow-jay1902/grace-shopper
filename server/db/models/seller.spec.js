const { expect } = require('chai');
const db = require('../index');
const { defaultPhoto } = require('./seller');
const Seller = require('./seller');

let aSeller;

beforeEach(() => {
  aSeller = {
    name: 'First Seller',
    description: 'First one in the business.',
    phone: '123-456-7890',
    email: 'first@gmail.com'
  }
  return db.sync({force: true})
})

describe('Seller model', () => {
  it('should create a seller with valid information', async () => {
    const validSeller = await Seller.create(aSeller);
    for (let key in validSeller.dataValues) {
      if (aSeller[key]) {
        expect(aSeller[key]).to.equal(validSeller.dataValues[key]);
      }
    }

    expect(Array.isArray(validSeller.dataValues.photoURLs)).to.equal(true)
    expect(validSeller.dataValues.photoURLs[0]).to.equal(defaultPhoto)
  })

  it('should not allow invalid sellers', (done) => {
    aSeller.name = null;
    aSeller.description = null;
    Seller.create(aSeller)
      .then(() => {
        done(new Error('Failed'));
      })
      .catch(() => {
        done();
      })
  })
})
