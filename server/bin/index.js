#!/usr/bin/env node

import http from 'http'
import app from '../app.js'
import sequelize from '../src/utils/database.js'

//const socket = require('socket.io')

const port = normalizePort(process.env.PORT || '6000')
app.set('port', port)
const server = http.createServer(app)

//  import i from'socket.io'
//  const io=i(server)
// io.on('connection', function (socket) {
//   console.log('A user connected')

//   //Whenever someone disconnects this piece of code executed
//   io.on('disconnect', function () {
//     console.log('A user disconnected')
//   })
// })

async function startSERVER() {
  try {
    await sequelize.sync({ force: false })
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
  } catch (err) {
    console.log(err.message)
  }
}
startSERVER()
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') throw error
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log(`Listening on ${bind}`)
  //debug('Listening on ' + bind)
}
