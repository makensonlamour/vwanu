import request from 'supertest'

// custom dependencies
import app from '../../app'
import db from '../../models'

// Module private globals

// Default user
const badPassword = '1'
const goodPassword = 'password'
const email = 'test@example.com'
const badUser = { password: badPassword, email: email }
const goodUser = { password: goodPassword, email: email }

// Testing the user routes
jest.setTimeout(9000)
describe('/api/user', () => {
  let expressServer: any = null
  beforeEach(async () => {
    expressServer = await app(db)
  })
  describe('Given a correct username and password', () => {
    it('should return a user and a token', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send(goodUser)

      expect(response.body).toBeDefined()
      expect(response.body.data.user).toBeDefined()
      expect(response.body.data.user.id).toBeDefined()
      expect(response.body.data.token).toBeDefined()
      expect(typeof response.body.data.token).toBe('string')
      expect(response.statusCode).toBe(201)
      expect(response.header['content-type']).toEqual(
        expect.stringContaining('application/json')
      )
    })

    it('should be able to verify', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send({ ...goodUser, email: 'realuser@example.com' })

      const user = response.body.data.user
      const token = response.body.data.token

      expect(user.verified).toBeDefined()
      expect(user.verified).toBe(false)

      const verifyResponse = await request(expressServer).post(
        `/api/user/verify/${user.id}/${user.activationKey}`
      )
      console.log('this is the verified response')
      console.log(verifyResponse.body)
      expect(verifyResponse.statusCode).toBe(200)
      expect(verifyResponse.body.data.user).toBeDefined()
      expect(verifyResponse.body.data.user.verified).toBe(true)
      expect(response.header['content-type']).toEqual(
        expect.stringContaining('application/json')
      )
    })
  })
  describe('Given incorrect username and password', () => {
    it('should not return user and token ,if password is missing ', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send({ email })
      expect(response.statusCode).toBe(400)
      expect(response.body.data).toBeUndefined()
    })
    it('should not create user if password is not long enough', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send({ email, badPassword })
      expect(response.statusCode).toBe(400)
      expect(response.body.data).toBeUndefined()
    })

    it('Should fail is email is missing ', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send({ password: 'somme-password' })
      expect(response.statusCode).toBe(400)
      expect(response.body.data).toBeUndefined()
    })
    it('should fail is password or email are not correct', async () => {
      const response = await request(expressServer)
        .post('/api/user')
        .send(badUser)
      expect(response.statusCode).toBe(400)
      expect(response.body.data).toBeUndefined()
    })
  })
})
