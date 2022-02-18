/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { jest } from '@jest/globals'
// eslint-disable-next-line import/no-extraneous-dependencies
import httpMocks from 'node-mocks-http'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import isSelf from '.'

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
    expect(next).toBeCalledWith({
      status: StatusCodes.UNAUTHORIZED,
      message: ReasonPhrases.UNAUTHORIZED,
    })
  })
})
