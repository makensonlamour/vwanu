import request from 'supertest'
import { jest } from '@jest/globals'
import { StatusCodes } from 'http-status-codes'

// Custom dependencies
import app from '../../app'

const sync = jest.fn()
const expressSever = app({ sync })

const newpostData = {
  userId: 1,
  title: 'Some  Random Title',
  body: 'lorem ipsum some random text ',
}
describe('Posts ', () => {
  it('should create a new post  when correct param provided ', () => {
    const response = await request(app).post('/api/post').send(newPostData)
    expect(response.statusCode).toBe(200)
    expect(response.headers['Content-Type']).toBe(
      expect.stringContaining('/json')
    )

    expect(response.body.hasOwnProperty('id')).toBe(true)
  })

  describe('When a get request is made ', () => {
    test('when correct id is provided post is return', async () => {
      const response = await request(expressServer).get('/api/post/1')
      expect(response.statusCode).toBe(200)
      expect(response.headers['Content-Type']).toEqual('application/json')
      expect(response.body.hasOwnProperty('id')).toBe(true)
    })

    describe('Delete when correct id is passed on', () => {
      test('Should delete a post when requested', () => {
        const response = await request(app).delete('/api/post/i')
        expect(response.headers['Content-Type']).toEqual('application/json')
        expect(response.StatusCodes).toBe(StatusCodes.DELETE)
      })
    })
  })
})
