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

app.get('/ideas/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateIdea = await Idea.findById(id);
    res.render('ideas/edit', { Idea: updateIdea });
  } catch (err) {
    res.send({ message: 'something wrong man', error: err })
    console.log(err);
  }

  // res.render('ideas/edit');
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
      await tempIdea.save();
      req.flash('success_msg', 'Idea was added successfully!');
      res.redirect('/ideas');
    } catch (er) {
      errors.push({
        property: 'saving failed',
        message: 'error while saving new Idea',
      });
    }
  }
});

app.put('/ideas/:id', async (req, res) => {
  const errors = [];
  const { id } = req.params;
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
    res.render('ideas/edit', { errors });
  } else {
    try {
      await Idea.findByIdAndUpdate(id, { title, details }, { new: true });
      req.flash('success_msg', 'Idea was updated successfully!');
      res.redirect('/ideas');
    } catch (er) {
      errors.push({
        property: 'saving failed',
        message: 'error while saving new Idea',
      });
    }
  }
});

app.delete('/ideas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Idea.findByIdAndRemove(id);
    req.flash('success_msg', 'Idea was removed successfully!');
    res.redirect('/ideas');
  } catch (err) {
    console.log('was not able to remove it');
  }
});

app.listen(config.PORT, () => logger.info(`app listening on port ${config.PORT}`));
