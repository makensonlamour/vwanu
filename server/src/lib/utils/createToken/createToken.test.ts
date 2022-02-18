/* eslint-disable no-undef */

import createToken from '.'

describe('Create token function ', () => {
  it('should return a Jwt token', () => {
    const obj = { id: 1 }

    createToken(obj, (err, token) => {
      expect(typeof token).toBe('string')
      expect((<string>token).length>5).toBe(true)
      expect(err).toBe(undefined)
    })
  })
})
