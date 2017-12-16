const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./config/main');
const logger = require('./utils/logger');
const middleware = require('./middleware/main');
const routes = require('./routes/main');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ideas', { useMongoClient: true });

require('./config/passport')(passport);

mongoose.connection.on('connected', () => {
  logger.info('connection stablished');
  middleware(app);
  routes(app);
});

mongoose.connection.on('error', (error) => {
  logger.info('connection to the db failed');
  logger.info(error);
  process.exit(1);
});

mongoose.connection.on('disconnected', (error) => {
  logger.info('there was an error that was found for disconnected');
  logger.info(error);
  process.exit(1);
});

app.listen(config.PORT, () => logger.info(`app listening on port ${config.PORT}`));
