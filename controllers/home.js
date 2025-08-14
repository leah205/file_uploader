const queries = require('../db/queries')

const homeController = {
    index: {
        get: async (req, res, next) => {
            try{
                const files = await queries.getFiles(req.user.id);
                 res.render("index", {files: files})
                
            } catch (err){
                next(err)
            }
           
        }
    }
}


module.exports = homeController