const express = require('express');

const config = require('./config/main');
const logger = require('./utils/logger');

const app = express();

require('./middleware/main')(app);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.listen(config.PORT, () => logger.info(`app listening on port ${config.PORT}`));
