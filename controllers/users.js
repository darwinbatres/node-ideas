const passport = require('passport');
const User = require('../models/User');
const { validateUser } = require('../helpers/validateUser');

module.exports.login = (req, res) => res.render('users/login');

module.exports.register = (req, res) => res.render('users/register');

module.exports.post = async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;

  const errors = validateUser(req.body);

  if (errors.length > 0) {
    res.render('users/register', {
      errors,
      name,
      email,
    });
  } else {
    const newUser = new User({
      name,
      email,
      password,
    });

    try {
      const userExist = await User.findOne({ email });
      if (!userExist) {
        await newUser.save();
        req.flash('success_msg', 'Register successfully, please login now');
        res.redirect('/users/login');
      } else {
        req.flash('error_msg', 'email already registered');
        res.redirect('/users/register');
      }
    } catch (err) {
      req.flash('error_msg', `There was an error while trying to register, try again ${err.message}`);
      res.redirect('/users/register');
    }
  }
};

module.exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};


module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are successfully logged out');
  res.redirect('/');
};
