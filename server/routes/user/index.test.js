import request from 'supertest'
import { jest } from '@jest/globals'
// custom dependencies
import app from '../../app'
import User from '../../controllers/user/index.js'

const connectDb = jest.fn()
User.createOne= jest.fn()

const expressServer = app({connectDb})

describe('Authentication', () => {
  describe('Given a correct username and password', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(expressServer).post('/api/user').send({
        email: 'test@example.com',
        password: 'password',
      })
      expect(response.statusCode).toBe(201)
    })
    test('should specify Json in the content type header', async () => {
      const response = await request(expressServer).post('/api/user').send({
        email: 'test@example.com',
        password: 'password',
      })
      expect(response.header['content-type']).toEqual(
        expect.stringContaining('application/json')
      )
      
    })

    test('Should call User.createone', async()=>{
      
      const response = await request(expressServer).post('/api/user')
      expect(User.createOne).toBeCalled()
    })
    // should create a new user
    // return a token
    // user should be logged
    // should return a status code of 201
  })
  describe('Given incorrect username and password', () => {
    test('If password is missing ', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send({ email: 'test@example.com' })

      expect(response.statusCode).toBe(400)
    })
    test('If password is not long enough', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send({ email: 'test@example.com', password: '12' })
      expect(response.statusCode).toBe(400)
    })

    test('Should fail is email is missing ', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send({ password: 'somme-password' })
      expect(response.statusCode).toBe(400)
    })

    // should respond with a jwt
    // should respond with a 200 status code
    // should specify json in the content header
  })
})
