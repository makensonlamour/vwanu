import { jest } from '@jest/globals'
import app from './app'
import db from './models'

db.sequelize.sync = jest.fn()

describe('Database connection', () => {
  let expressServer: any = null
  beforeEach(async () => {
    expressServer = await app(db)
  })
  it('should return an express server and connect to a database', async () => {
    console.log(typeof expressServer)
    expect(typeof app).toBe('function')
    expect(db.sequelize.sync.mock.calls.length).toBe(1)
  })

 
})
