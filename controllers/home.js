const filedb = require('../db/fileQueries')
const folderdb = require('../db/folderQueries')

const homeController = {
    index: {
        get: async (req, res, next) => {
            try{
                const files = await filedb.getFiles(req.user.id);
                const folders  = await folderdb.getFolders(req.user.id)
                 res.render("index", {files: files, folders: folders})
                
            } catch (err){
                next(err)
            }
           
        }
    }
}


module.exports = homeController