var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.js')



router.get('/signup', userController.signup.get)
router.post('/signup', userController.signup.post)


module.exports = router