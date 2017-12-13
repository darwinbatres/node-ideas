const express = require('express');

const config = require('./config/main');
const logger = require('./utils/logger');

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'welcome' });
});

app.listen(config.PORT, () => logger.info(`app listening on port ${config.PORT}`));
