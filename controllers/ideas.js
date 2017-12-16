const logger = require('../utils/logger');
const Idea = require('../models/Idea');

module.exports.getAll = async (req, res) => {
  const userId = req.user.id;
  const Ideas = await Idea.find({ userId }).sort({ date: 'desc' });
  if (Ideas) {
    res.render('ideas/index', { Ideas, title: 'All my Ideas' });
  } else {
    req.flash('error_msg', 'There was an error while loading your ideas!');
    res.render('ideas/index', { Ideas, title: 'All my Ideas' });
  }
};

module.exports.add = (req, res) => res.render('ideas/add');

module.exports.edit = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const updateIdea = await Idea.findById(id);
    if (updateIdea.userId !== userId) {
      req.flash('error_msg', 'You can only work on your ideas');
      res.redirect('/ideas');
    } else {
      res.render('ideas/edit', { Idea: updateIdea });
    }
  } catch (err) {
    logger.info(err.message);
    req.flash('error_msg', 'Idea was not found!');
    res.redirect('/ideas');
  }
};

module.exports.post = async (req, res) => {
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
    const userId = req.user.id;
    try {
      const tempIdea = new Idea({ title, details, userId });
      await tempIdea.save();
      req.flash('success_msg', 'Idea was added successfully!');
    } catch (err) {
      logger.info(err.message);
      req.flash('error_msg', 'Idea was created!');
    } finally {
      res.redirect('/ideas');
    }
  }
};

module.exports.put = async (req, res) => {
  const errors = [];
  const { id } = req.params;
  const userId = req.user.id;
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
      const updateIdea = await Idea.findById(id);
      if (updateIdea.userId !== userId) {
        req.flash('error_msg', 'You can only work on your ideas');
        res.redirect('/ideas');
      } else {
        await Idea.update({ _id: updateIdea.id }, { title, details });
        req.flash('success_msg', 'Idea was updated successfully!');
      }
    } catch (err) {
      logger.info(err.message);
      req.flash('error_msg', 'Idea was not updated!');
    } finally {
      res.redirect('/ideas');
    }
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const ideaToRemove = await Idea.findById(id);
    if (ideaToRemove.userId !== userId) {
      req.flash('error_msg', 'You can only work on your ideas');
      res.redirect('/ideas');
    } else {
      await Idea.deleteOne({ _id: ideaToRemove.id });
    }
    req.flash('success_msg', 'Idea was removed successfully!');
  } catch (err) {
    logger.info(err.message);
    req.flash('success_msg', 'Idea was not removed!');
  } finally {
    res.redirect('/ideas');
  }
};
