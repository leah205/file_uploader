const filedb = require("../db/fileQueries")
const folderdb = require("../db/folderQueries")
const folderController = {
   newFolder: {
        post: async (req, res, next) => {
          
            try{
                await folderdb.createFolder(req.body.name, req.user.id, Number(req.params.id))
            } catch(err) {
                next(err)
            }
            res.redirect('/folder/' + req.params.id)
            
        }
   },
   folder: {
    get: async (req, res, next) => {
        try{
            console.log(req.params.id)
            const folder = await folderdb.getFolderFromId(Number(req.params.id), req.user.id)
            if(!folder){
                console.log(typeof req.next)
                return next(new Error('resource not found'))
            }
            const childrenFolders = await folderdb.getChildrenFolders(Number(req.params.id))
            const childrenFiles = await folderdb.getChildrenFiles(Number(req.params.id))
            res.render(`folder`, {files: childrenFiles, folders: childrenFolders, folder: folder})
            //get folder parents to display tree
            } catch(err) {
                console.log("ooooh")
                next(err)
            }
        
    }
   }

}


module.exports = folderController