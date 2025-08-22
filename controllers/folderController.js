const filedb = require("../db/fileQueries")
const folderdb = require("../db/folderQueries")
const folderController = {
   newFolder: {
        post: async (req, res, next) => {
          
            try{
                await folderdb.createFolder(req.body.name, req.user.id, false)
            } catch(err) {
                next(err)
            }
            res.redirect('/')
            
        }
   },
   folder: {
    get: async (req, res, next) => {
        try{
            const files = await filedb.getFolderFiles(Number(req.params.id))
            res.render('folder', {files: files})
            //get folder parents to display tree
            } catch(err) {
                next(err)
            }
        
    }
   }

}


module.exports = folderController