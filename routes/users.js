const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
// require('../lib/passport');



//register with passport
router.post('/api/users/register', userController.register);

//render register page
router.get('/api/users/register', userController.registerPage);

//login with passport
router.post('/api/users/login', userController.login);

//render login page
router.get('/api/users/login', userController.loginPage)

//logout user
router.get('/api/users/logout', userController.logout);
router.get('/fail', userController.failPage);
router.get('/', userController.home);


module.exports = router;