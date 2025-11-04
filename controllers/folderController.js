const { Db } = require("mongodb");
const filedb = require("../db/fileQueries")
const folderdb = require("../db/folderQueries")

async function getFolderPath(id){
    let folderid = id;
    const folderPath = []
    while(folderid){
        let folder = await folderdb.getFolderFromId(folderid);
        folderPath.unshift([folder.name, folder.id])
        folderid = folder.parentid
    }
    return folderPath
}
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
   editFolder: {
    post: async (req, res, next) => {
        try {
            await folderdb.updateFolder(Number(req.body.id), req.body.name)
            console.log('editing folder');
            res.redirect('/folder/' + req.params.id)
        } catch (err) {
            next(err)
        }
    }
   },
   folder: {
    delete: async (req, res, next) => {
        try {
            
            await folderdb.deleteFolder(Number(req.body.id))
            
            res.redirect('/folder/' + req.params.id)
        } catch(err){
            next(err)
        }
    },
    get: async (req, res, next) => {

        try{
            const nest = await getFolderPath(Number(req.params.id))
            const folder = await folderdb.getFolderFromId(Number(req.params.id), req.user.id)
            if(!folder){
                return next(new Error('resource not found'))
            }
            const childrenFolders = await folderdb.getChildrenFolders(Number(req.params.id))
            const childrenFiles = await folderdb.getChildrenFiles(Number(req.params.id))
            res.render(`folder`, {files: childrenFiles, folders: childrenFolders, folder: folder, nest: nest})
            //get folder parents to display tree
            } catch(err) {
                return next(new Error('resource not found'))
            }
    }
   }

}


module.exports = folderController