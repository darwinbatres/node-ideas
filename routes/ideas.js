const express = require('express');

const controller = require('../controllers/ideas');
const { ensureAuthenticated } = require('../helpers/auth');

const router = express.Router();

router.get('/', ensureAuthenticated, controller.getAll);
router.get('/add', ensureAuthenticated, controller.add);
router.get('/edit/:id', ensureAuthenticated, controller.edit);
router.post('/', ensureAuthenticated, controller.post);
router.put('/:id', ensureAuthenticated, controller.put);
router.delete('/:id', ensureAuthenticated, controller.delete);

module.exports = router;
