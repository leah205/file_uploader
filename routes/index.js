var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.js');
const homeController = require('../controllers/home.js');
const fileController = require('../controllers/file')
const validation = require("../middleware/validate.js")
const authentication = require("../middleware/authentication.js")
const folderController = require('../controllers/folderController.js')


//user queries
router.get('/signup', userController.signup.get)
router.post('/signup', validation.signup, userController.signup.post)
router.get('/login', userController.login.get)
router.post('/login', userController.login.post)
router.get('/logout',userController.logout.get)

//folder queries
router.get('/', authentication.isAuth, homeController.index.get)
router.post('/folder/:id/new-folder', folderController.newFolder.post)
router.get('/folder/:id', folderController.folder.get)
router.post('/folder/:id/edit-folder', folderController.editFolder.post)
router.post('/folder/:id/delete/:deleteid', folderController.folder.delete)

//file queries
router.post('/folder/:id/file-upload', fileController.fileUpload.post)
router.get('/folder/:id/file/:fileid', authentication.isAuth, fileController.fileDetails.get )
router.post('/folder/:id/file/:fileid/delete', fileController.fileDetails.delete)





module.exports = router