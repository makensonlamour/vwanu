const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt

const JWTStrategy = passportJWT.Strategy
const LocalStrategy = require('passport-local').Strategy

//const dbRepo = require('./models')

//const common = require('./src/utils/common')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function (request, email, password, done) {}
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
      passReqToCallback: true,
    },
    async function (request, jwtPayload, done) {}
  )
)
