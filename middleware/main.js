const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use(methodOverride('_method'));

  // express-session middleware
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

  // flash messages
  app.use(flash());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
  app.set('view engine', 'handlebars');

  // global variables
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
};
