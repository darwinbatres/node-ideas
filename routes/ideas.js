const express = require('express');

const controller = require('../controllers/ideas');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/add', controller.add);
router.get('/edit/:id', controller.edit);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
