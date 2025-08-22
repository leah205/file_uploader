const filedb = require('../db/fileQueries')
const folderdb = require('../db/folderQueries');
const { folder } = require('./folderController');

const homeController = {
    index: {
        get: async (req, res, next) => {
            try{
                const rootFolder = await folderdb.getRootFolder(req.user.id)
              
                res.redirect(`/folder/${rootFolder.id}`)
                //const files = await filedb.getFiles(req.user.id);
                //const folders  = await folderdb.getChildrenFolders(parentid)
                 //res.render("index", {files: files, folders: folders})
                
            } catch (err){
                next(err)
            }
           
        }
    }
}


module.exports = homeController