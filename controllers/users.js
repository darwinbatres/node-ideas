// const logger = require('../utils/logger');

module.exports.login = (req, res) => {
  res.render('users/login');
};

module.exports.register = (req, res) => {
  res.render('users/register');
};

module.exports.post = (req, res) => {
  const errors = [];
  const {
    name,
    email,
    password,
    passwordVerify,
  } = req.body;

  if (!name) {
    errors.push({
      property: 'name',
      message: 'name is a required field',
    });
  }

  if (!email) {
    errors.push({
      property: 'email',
      message: 'email is a required field',
    });
  }

  if (!password) {
    errors.push({
      property: 'password',
      message: 'password is a required field',
    });
  }

  if (!passwordVerify) {
    errors.push({
      property: 'password_verify',
      message: 'verify password is a required field',
    });
  }

  if (passwordVerify !== password) {
    errors.push({
      property: 'password',
      message: 'both passwords have to match',
    });
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors,
      name,
      email,
    });
  } else {
    res.send({ message: 'success' });
  }
};
