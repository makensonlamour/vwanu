/* eslint-disable no-param-reassign */

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Local from 'passport-local'

const LocalStrategy = Local.Strategy



export const attachToUser = function (UserSchema) {

  UserSchema.setPassword = async function (password) {
    if (!password) throw new Error('Missing password')
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    return { hashPassword, salt }
  }

  UserSchema.register = async function (user, password) {
    try {
      const { hashPassword, salt } = await UserSchema.setPassword(password)
      delete user.password
      user.hash = hashPassword
      user.salt = salt
      const created = await UserSchema.create(user)
      return created
    } catch (error) {
      return error
    }
  }

  UserSchema.createStrategy = function () {
    return new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (async (request, email, password, done) => UserSchema.findOne({
          where: { email },
        })
          .then(async (user) => {
            if (!user) {
              return done(null, false, {
                message: 'Invalid email or password.',
              })
             
            }

            const isMatch = await bcrypt.compare(password, user.hash)
            if (!isMatch)
              return done(null, false, {
                message: 'Invalid email or password.',
              })

            return UserSchema.CreateToken(user, (err, token) => {
              if (err) throw err
              request.token = token
              return done(null, token, { message: 'Logged In Successfully.' })
            })
          })
          .catch((err) => done(err)))
    )
  }

  UserSchema.CreateToken = function (user, cb) {
    const payload = {
      user: {
        id: user.id,
      },
    }
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, cb)
  }
}
export const defineUser = function (sequelize, userSchema) {
  const UserSchema = sequelize.define('User', userSchema);
  attachToUser(UserSchema);
  return UserSchema;
};