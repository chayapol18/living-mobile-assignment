const { describe, it } = require('mocha')

const request = require('supertest')
const app = require('../app')

describe('GET /category', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/category')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /category/:id', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/category/10')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('POST /category', () => {
  it('responds with json', (done) => {
    request(app)
      .post('/category')
      .send({name:'categoryName', storeId:3})
      .expect('Content-Type', /json/)
      .expect(201, done)
  })
})

describe('PUT /category/:id', () => {
  it('responds with json message', (done) => {
    request(app)
      .put('/category/2')
      .send({name:'changeCategoryName'})
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('DELETE /category/:id', () => {
  it('no responds', (done) => {
    request(app)
      .delete('/category/4')
      .expect(204, done)
  })
})
