const { PrismaClient } = require("../generated/prisma");
const { name } = require("ejs");
const prisma = new PrismaClient();

const folderQueries = {
    updateFolder: async (id, name) => {
      await prisma.folder.update({
        where: {
          id: id,
        },
        data: {
          name: name
        }
      })
    },


    getChildrenFolders: async (parentid, userid) => {
     
    const folders = await prisma.folder.findMany({
        where: {
          parentid: parentid,
          userid: userid
        }
      
    })
    return folders
  },
  getChildrenFiles: async (folderid, userid) => {
    const files = await prisma.file.findMany({
        where: {
          folderid: folderid,
          userid: userid
        }})
    return files
  },
  getRootFolder: async (userid) => {
    
    const rootFolder = await prisma.folder.findMany({
      where: {
        userid: userid,
        root: true
      }
    })
    
    return rootFolder[0]
  },
  createFolder: async(name, userid, parentid) => {
    await prisma.folder.create({
      data: {
        name: name,
        root: false,
        parent: {
          connect: {
            id: parentid
          }
        },
        user: {
          connect: {
            id: userid
          }
        }
      }
    })
  },
  createRootFolder: async(name, userid) => {
    await prisma.folder.create({
      data: {
        name: name,
        root: true,
        user: {
          connect: {
            id: userid
          }
        }
      }
    })
  },
  getFolderFromId: async (id, userid) => {
     console.log(userid)
    const folder = await prisma.folder.findUnique({
      where: {
        id: id,
        userid:userid
      }
    })
    return folder
  },

 
}

module.exports = folderQueries