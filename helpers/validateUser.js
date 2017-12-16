module.exports.validateUser = (user) => {
  const errors = [];

  const {
    name,
    email,
    password,
    passwordVerify,
  } = user;

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

  return errors;
};
