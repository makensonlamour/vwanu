import passport from 'passport'
import passportJWT from 'passport-jwt'
import Local from 'passport-local'
import bcrypt from 'bcryptjs'
import createToken from './lib/utils/createToken'
const LocalStrategy = Local.Strategy
import db from './models'
const JWTStrategy = passportJWT.Strategy
const invalid = 'invalid email or password'
const successLogin = 'Logged in with success'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function (request, email, password, done) {
      return db.User.findOne({ where: { email: email } }).then(
        async (user: any) => {
          if (!user) {
            return done(null, false, { message: invalid })
          }

          const isMatch = await bcrypt.compare(password.toString(), user.hash)

          if (!isMatch) {
            return done(null, false, { message: invalid })
          }
          return done(null, user, { message: successLogin })
        //   createToken(
        //     user,
        //     function (error: Error | null, token: string | undefined) {
        //       if (error) throw error
        //       //request.token=token
        //       return done(null, token, { message: successLogin })
        //     }
        //   )
        }
      )
    }
  )
)
