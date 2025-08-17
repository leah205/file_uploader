const queries = require('../db/queries')

const homeController = {
    index: {
        get: async (req, res, next) => {
            try{
                const files = await queries.getFiles(req.user.id);
                const folders  = await queries.getFolders()
                 res.render("index", {files: files, folders: folders})
                
            } catch (err){
                next(err)
            }
           
        }
    }
}


module.exports = homeController