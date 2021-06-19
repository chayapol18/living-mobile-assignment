const { describe, it } = require('mocha')

const request = require('supertest')
const app = require('../app')

describe('GET /menu', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/menu')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET /menu/:id', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/menu/10')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('POST /menu', () => {
  it('responds with json', (done) => {
    request(app)
      .post('/menu')
      .send({name:'menuName', price: 200, catagoryId:2 })
      .expect('Content-Type', /json/)
      .expect(201, done)
  })
})

describe('PUT /menu/:id', () => {
  it('responds with json message', (done) => {
    request(app)
      .put('/menu/2')
      .send({name:'changeMenuName'})
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('DELETE /menu/:id', () => {
  it('no responds', (done) => {
    request(app)
      .delete('/menu/4')
      .expect(204, done)
  })
})