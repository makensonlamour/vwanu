import passport from 'passport';
// import passportJWT from 'passport-jwt'
import Local from 'passport-local';
import bcrypt from 'bcryptjs';

const LocalStrategy = Local.Strategy;
// const JWTStrategy = passportJWT.Strategy
const invalid = 'invalid email or password';
// const successLogin = 'Logged in with success'

export default (app) =>
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (request, email, password, done) =>
        app
          .get('sequelizeClient')
          .models.User.findOne({ where: { email } })
          .then(async (user: any) => {
            if (!user) {
              return done(null, false, { message: invalid });
            }

            const isMatch = await bcrypt.compare(
              password.toString(),
              user.password
            );
            if (!isMatch) {
              return done(null, false, { message: invalid });
            }
            return done(null, user, { message: 'Logged in with success' });
          })
    )
  );
