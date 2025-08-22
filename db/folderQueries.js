const { PrismaClient } = require("../generated/prisma");
const { name } = require("ejs");
const prisma = new PrismaClient();

const folderQueries = {
    getChildrenFolders: async (parentid) => {
    const folders = await prisma.folder.findMany({
        where: {
          parentid: parentid
        }
      
    })
    return folders
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
  createFolder: async(name, userid, isRoot) => {
    await prisma.folder.create({
      data: {
        name: name,
        root: isRoot,
        user: {
          connect: {
            id: userid
          }
        }
      }
    })
  },
  getFolderFromId: async (id) => {
    const folder = await prisma.folder.findUnique({
      where: {
        id: id
      }
    })
    return folder
  }
 
}

module.exports = folderQueries