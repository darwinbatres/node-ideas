const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // match user
      const userFound = await User.findOne({ email });
      if (!userFound) {
        return done(null, false, { message: 'No user found' });
      }

      // match password
      const isMatched = await bcrypt.compare(password, userFound.password);
      if (isMatched) {
        return done(null, userFound);
      }
      return done(null, false, { message: 'password invalid' });
    },
  ));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const serializedUser = await User.findById(id);
      done(null, serializedUser);
    } catch (err) {
      done(err);
    }
  });
};
