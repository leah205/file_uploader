const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const fileController = {
    fileUpload: {
        post: [upload.single('file'), (req, res) => {
                const filename = req.file.filename
                console.log(req.file)
                console.log(req.body)
                res.redirect('/')
        }]
    }
}

module.exports = fileController