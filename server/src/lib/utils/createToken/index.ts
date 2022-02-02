import jwt, { SignCallback } from 'jsonwebtoken'

require('dotenv').config()

const { JWT_SECRET } = process.env

export default function (user: any, cb: jwt.SignCallback) {
  const payload = {
    user: {
      id: user.id,
    },
  }
  jwt.sign(payload, JWT_SECRET as string, { expiresIn: 3600 }, cb)
}
