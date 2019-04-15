/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')

beforeEach(() => {
    return db.sync({ force: true })
})
describe('User model', () => {


    describe('instanceMethods', () => {
        describe('correctPassword', () => {
            let cody

            beforeEach(async () => {
                cody = await User.create({
                    firstName: 'Cody',
                    lastName: 'Dofy',
                    address: 'uyiuoypi;hlj',
                    phone: '123-456-7890',
                    dob: new Date(),
                    email: 'cody@puppybook.com',
                    password: 'bones'
                })
            })

            it('returns true if the password is correct', () => {
                expect(cody.correctPassword('bones')).to.be.equal(true)
            })

            it('returns false if the password is incorrect', () => {
                expect(cody.correctPassword('bonez')).to.be.equal(false)
            })
        }) // end describe('correctPassword')
    }) // end describe('instanceMethods')
    describe('Does not allow bad inputs', () => {
        let cody;
        beforeEach(async () => {
            cody = {
                firstName: 'Cody',
                lastName: 'Dofy',
                address: 'uyiuoypi;hlj',
                phone: '123-456-7890',
                dob: new Date(),
                email: 'cody@puppybook.com',
                password: 'bones'
            }
        })

        it('Should not allow empty last name', done => {
            cody.lastName = null;
            User.create(cody)
                .then(() => done(new Error('Bad user created')))
                .catch(() => done())
        })
        it('Should not allow empty first name', done => {
            cody.firstName = null;
            User.create(cody)
                .then(() => done(new Error('Bad user created')))
                .catch(() => done())
        })
        it('Should not allow invalid DOB', done => {
            cody.dob = '8op9[09iuopi;';
            User.create(cody)
                .then(() => done(new Error('Bad user created')))
                .catch(() => done())
        })
        it('Should not allow invalid phone', done => {
            cody.phone = 'uioypu9[0i';
            User.create(cody)
                .then(() => done(new Error('Bad user created')))
                .catch(() => done())
        })
    })
}) // end describe('User model')
