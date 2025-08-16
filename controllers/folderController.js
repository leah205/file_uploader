const db = require("../db/queries")

const folderController = {
   newFolder: {
        post: async (req, res, next) => {
          
            try{
                await db.createFolder(req.body.name)
            } catch(err) {
                next(err)
            }
            res.redirect('/')
            
        }
   }
}


module.exports = folderController