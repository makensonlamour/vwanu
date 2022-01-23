import { jest } from '@jest/globals'
import app from './app'

const connectDb = jest.fn()
 const expressServer = app({ connectDb })

describe('Database connection', () => {
  describe('Given a database', () => {
    test('should connect to the database once', () => { 
      expect(connectDb.mock.calls.length).toBe(1)
    })
   
  })
})
