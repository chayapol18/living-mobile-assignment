const { describe, it } = require('mocha')

const request = require('supertest')
const app = require('../app')

describe('GET /store', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/store')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /store/:id', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/store/10')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('POST /store', () => {
  it('responds with json', (done) => {
    request(app)
      .post('/store')
      .send({name:'storeName'})
      .expect('Content-Type', /json/)
      .expect(201, done)
  })
})

describe('PUT /store/:id', () => {
  it('responds with json message', (done) => {
    request(app)
      .put('/store/3')
      .send({name: 'changeStoreName'})
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('DELETE /store/:id', () => {
  it('no responds', (done) => {
    request(app)
      .delete('/store/6')
      .expect(204, done)
  })
})
