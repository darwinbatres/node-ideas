module.exports = {
  ensureAuthenticated: (req, res, next) => { // eslint-disable-line
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'You need to be logged in to perform this action');
    res.redirect('/users/login');
  },
};
