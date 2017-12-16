const express = require('express');

const controller = require('../controllers/users');

const router = express.Router();

router.post('/', controller.post);
router.get('/login', controller.login);
router.post('/login', controller.postLogin);
router.get('/logout', controller.logout);
router.get('/register', controller.register);

module.exports = router;
