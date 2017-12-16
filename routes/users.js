const express = require('express');

const controller = require('../controllers/users');

const router = express.Router();

router.post('/', controller.post);
router.get('/login', controller.login);
router.get('/register', controller.register);

module.exports = router;
