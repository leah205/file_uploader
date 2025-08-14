const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const queries = require('../db/queries')

const fileController = {
    fileUpload: {
        post: [upload.single('file'), async (req, res, next) => {
                const filename = req.file.originalname
                console.log(req.file)
                try {
                     await queries.createFile(filename, req.user.id)
                } catch(err){
                   next(err)
                }
            res.redirect('/')
        }]
    }
}

module.exports = fileController