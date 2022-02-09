import fs from 'fs'
import path from 'path'
import winston from 'winston'

const { splat, combine, timestamp, printf, colorize, label } = winston.format

const myFormat = printf(({ timestamp, level, label, message, meta }) => {
  return `[${level}] ${timestamp}  [from ${label}]: ${message} ${
    meta ? JSON.stringify(meta) : ''
  }`
})

const logDir = 'log'
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}
const filename = path.join(logDir, 'server.log')

const logger = winston.createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    label({ label: path.basename(require.main.filename) }),
    splat(),
    colorize(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename }),
  ],
})

export default logger
