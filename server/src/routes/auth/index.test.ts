import request from 'supertest'
import app from '../../app'
import db from '../../models'

// Default user
const badPassword = '1'
const goodPassword = 'password2'
const email = 'test2@example.com'
const badUser = { password: badPassword, email: email }
const goodUser = { password: goodPassword, email: email }

describe('Authentication ', () => {
  let expressServer = null
  beforeEach(async () => {
    expressServer = await app(db)
  })
  describe('Given incorrect credentials', () => {
    it('Should not authenticate', async () => {
      const response = await request(expressServer)
        .post('/api/auth')
        .send(badUser)
      expect(response.status).toBe(400)
    })
  })
  describe('Given correct credentials ', () => {
    it('should authenticate', async () => {
      expect(true).toBe(true)
      // Create a new user ,
      await request(expressServer).post('/api/user').send(goodUser)

      //should be able to authenticate
      const response = await request(expressServer)
        .post('/api/auth')
        .send(goodUser)

      expect(response.status).toBe(202)
      expect(response.body.data.user).toBeDefined()
      expect(response.body.data.token).toBeDefined()
      expect(response.body.data.user.id).toBeDefined()
      expect(typeof response.body.data.user.id).toBe('number')
      expect(typeof response.body.data.token).toBe('string')
      expect(response.header['content-type']).toEqual(
        expect.stringContaining('application/json')
      )
    })
  })
})
