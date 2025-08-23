const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const filedb = require("../db/fileQueries")

const fileController = {
    fileUpload: {
        post: [upload.single('file'), async (req, res, next) => {
                const originalname = req.file.originalname
                const filename = req.file.filename
                const size = req.file.size
                const folderid = Number(req.params.id)
                try {
                     await filedb.createFile(originalname, filename, req.user.id, size, folderid)
                } catch(err){
                   next(err)
                }
            res.redirect('/folder/' + req.params.id)
        }]
    },
    fileDetails: {
        get: async (req, res) => {
            try {
                const file = await filedb.getFile(req.params.id)
                res.render('file-details', {file: file})
            } catch{
                next(err)
            }   
        },
        delete: async (req, res, next) => {
            try {
                await filedb.deleteFile(parseInt(req.params.id))
                res.redirect('/')
            } catch(err){
                next(err)
            }   
        }
    }
}

module.exports = fileController