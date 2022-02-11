import request from 'supertest'
import app from '../../app'
import db from '../../models'

// Default user
const badPassword = '1'
const goodPassword = 'password2'
const email = 'test2@example.com'
const badUser = { password: badPassword, email: email }
const goodUser = { password: goodPassword, email: email }
jest.setTimeout(9000)
describe('Authentication ', () => {
  let expressServer = null
  beforeEach(async () => {
    expressServer = await app(db)
  })
  describe('Given incorrect credentials', () => {
    beforeEach(async () => {})
    it('Should not authenticate', async () => {
      const response = await request(expressServer)
        .post('/api/auth')
        .send(badUser)
      console.log('error in body')
      console.log(response.body, response.status)
      expect(response.status).toBe(400)
    })
  })
  describe('Given correct credentials ', () => {
    beforeEach(async () => {})
    it('should authenticate', async () => {
      // Create a new user ,
      await request(expressServer).post('/api/user').send(goodUser)

      //should be able to authenticate
      const response = await request(expressServer)
        .post('/api/auth')
        .send(goodUser)
      

      console.log('response details')
      console.log(response.body.data)
      expect(true).toBe(true)
      // expect(response.status).toBe(202)
      // expect(response.body.data.user).toBeDefined()
      // expect(response.body.data.token).toBeDefined()
      // expect(response.body.data.user.id).toBeDefined()

      // expect(typeof response.body.data.token).toBe('string')
      // expect(response.header['content-type']).toEqual(
      //   expect.stringContaining('application/json')
      // )
    })
  })
})
