const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const passport = require('passport');
require('../lib/passport');

router.get('/auth/movies', authController.movies);

module.exports = router;