const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/main');
const logger = require('./utils/logger');
const Idea = require('./models/Idea');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ideas', { useMongoClient: true })
  .then(() => logger.info('connection stablished'))
  .catch(err => logger.info(err));

require('./middleware/main')(app);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/ideas', async (req, res) => {
  const Ideas = await Idea.find().sort({ date: 'desc' });
  if (Ideas) {
    res.render('ideas/index', { Ideas });
  } else {
    res.send({ message: 'there was an error loading your ideas' });
  }
});

app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

app.post('/ideas', async (req, res) => {
  const errors = [];
  const { title, details } = req.body;
  if (!title) {
    errors.push({
      property: 'title',
      message: 'is a required field',
    });
  }
  if (!title) {
    errors.push({
      property: 'details',
      message: 'is a required field',
    });
  }

  if (errors.length > 0) {
    res.render('ideas/add', { errors });
  } else {
    try {
      const tempIdea = new Idea({ title, details });
      const savedIdea = await tempIdea.save();
      res.redirect('ideas');
    } catch (er) {
      errors.push({
        property: 'saving failed',
        message: 'error while saving new Idea',
      });
    }
  }
});

app.listen(config.PORT, () => logger.info(`app listening on port ${config.PORT}`));
