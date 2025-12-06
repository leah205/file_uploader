const multer  = require('multer')
const filedb = require("../db/fileQueries")
const supabasedb = require('../db/supabase')
const folderdb = require('../db/folderQueries')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

console.log(["a", "b"].join("/"))



async function getFilePath(id, filename){
   
    let folderid = id;
    const folderPath = []
    while(folderid){
        let folder = await folderdb.getFolderFromId(folderid);
        folderPath.unshift(folderid)
        folderid = folder.parentid
    }
  
    return folderPath.join("/")  + "/" + filename
}

const fileController = {
    fileUpload: {
        
        post: [upload.single('file'), async (req, res, next) => {
                const originalname = req.file.originalname
                const size = req.file.size
                const folderid = Number(req.params.id)
                
                try {
                    await supabasedb.uploadFile(await getFilePath(folderid, originalname), req.user.id,  req.file.buffer, req.file.mimetype)
                     await filedb.createFile(originalname, req.user.id, size, folderid);
                } catch(err){
                    console.log('error');
                   next(err);
                   return;
                }
            res.redirect('/folder/' + req.params.id)
        }]
    },
    fileDetails: {
        get: async (req, res, next) => {
            try {
                const file = await filedb.getFile(req.params.fileid, req.user.id)
                 const folderid = Number(req.params.id)
                if(!file){
                    return next('Resource not Found')
                }
                const url = await supabasedb.getUrl(await getFilePath(folderid, file.originalname), req.user.id);
                console.log(url)
                res.render('file-details', {file: file, url: url})
            } catch (err){
                next(err)
            }   
        },
        delete: async (req, res, next) => {
              const folderid = Number(req.params.id)
              //get original name
            try {
                const file = await filedb.getFile(req.params.fileid, req.user.id)
                await filedb.deleteFile(parseInt(req.params.fileid))
                await supabasedb.deleteFile(await getFilePath(folderid, file.originalname), req.user.id)
                res.redirect('/folder/' + req.params.id)
            } catch(err){
                next(err)
            }   
        }
    }
}

module.exports = fileController