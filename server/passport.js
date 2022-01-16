import passport from 'passport'
import passportJWT from 'passport-jwt'
import pLocal from 'passport-local'
const LocalStrategy = pLocal.Strategy
import User from './models/user.js'


const JWTStrategy = passportJWT.Strategy

passport.use(User.createStrategy())
