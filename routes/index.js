var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.js');
const homeController = require('../controllers/home.js');



router.get('/signup', userController.signup.get)
router.post('/signup', userController.signup.post)
router.get('/login', userController.login.get)
router.post('/login', userController.login.post)
router.get('/', homeController.index.get)


module.exports = router