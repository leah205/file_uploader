const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const queries = require('../db/queries')

const fileController = {
    fileUpload: {
        post: [upload.single('file'), async (req, res, next) => {
                const originalname = req.file.originalname
                const filename = req.file.filename
                const size = req.file.size
                
              
                try {
                     await queries.createFile(originalname, filename, req.user.id, size)
                } catch(err){
                   next(err)
                }
            res.redirect('/')
        }]
    }
}

module.exports = fileController