var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.js');
const homeController = require('../controllers/home.js');
const fileController = require('../controllers/file')
const validation = require("../middleware/validate.js")
const authentication = require("../middleware/authentication.js")



router.get('/signup', userController.signup.get)
router.post('/signup', validation.signup, userController.signup.post)
router.get('/login', userController.login.get)
router.post('/login', userController.login.post)
router.get('/', authentication.isAuth, homeController.index.get)
router.get('/logout',userController.logout.get)
router.post('/file-upload', fileController.fileUpload.post)
router.get('/file/:id', authentication.isAuth, fileController.fileDetails.get )



module.exports = router