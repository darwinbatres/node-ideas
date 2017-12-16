const staticRoutes = require('./static');
const ideas = require('./ideas');

module.exports = (app) => {
  app.use('/', staticRoutes);
  app.use('/ideas', ideas);

  // fallback to handle routes that are not defined
  // replace with 404 error in the future
  app.all('*', (req, res) => {
    res.send({ message: 'I have no memory of this place' });
  });
};
