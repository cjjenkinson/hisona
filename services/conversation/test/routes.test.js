'use strict'

// require the Koa server
const server = require('../src/server')
// require supertest
const request = require('supertest')

// close the server after each test
afterEach(() => {
  server.close()
})

describe('routes: index', () => {
  it('should respond as expected', async () => {
    const response = await request(server)
      .get('/conversation/ping')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.message).toEqual('pong')
  })
})

describe('routes: conversation', () => {
  const mockMessage = {
    artefact_id: '5b263c7cde0924400e05724e',
    message: 'this should return the last context',
    context: {
      last_intent: 'education',
    }
  }

  it('should respond with a reply', async () => {
    const response = await request(server)
      .post('/conversation/message')
      .send(mockMessage)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body).toHaveProperty('message')
    expect(response.body.message[0]).toHaveProperty('intent')
    expect(response.body.message[0]).toHaveProperty('reply')
  })

})


