import isSelf from '.'
import { jest } from '@jest/globals'
import httpMocks from 'node-mocks-http'

const next = jest.fn()


const res = httpMocks.createResponse()
describe('IsSelf Middleware', () => {
  it('should allow connection from same user', () => {
    const req = httpMocks.createRequest({
      user: { id: 1 },
      params: {
        id: 1,
      },
    })

    isSelf(req, res, next)
    expect(typeof isSelf).toBe('function')
    expect(next.mock.calls.length).toBe(1)
  })

  it('it should not let you go through if a different user', () => {
    jest.clearAllMocks()
    const req = httpMocks.createRequest({
      user: { id: 2 },
      params: {
        id: 1,
      },
    })

    isSelf(req, res, next)
    expect(typeof isSelf).toBe('function')
    expect(next.mock.calls.length).toBe(0)
  })
})
