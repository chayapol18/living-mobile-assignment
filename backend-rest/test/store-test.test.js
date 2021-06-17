const supertest = require('supertest')
const storeController = require('../controller/storeController')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { after, before, describe, it } = require('mocha')

const app = require('../app')

chai.use(chaiHttp)
chai.should()

describe('Testing unit', () => {
  
  describe('GET /', () => {
    it('it should have return stores', done => {
      chai
      .request(app)
      .get('/store')
      .end((e, res) => {
        res.should.have.status(200)
        res.body.should.have.property('stores')
        done()
      })
    })
  })
})