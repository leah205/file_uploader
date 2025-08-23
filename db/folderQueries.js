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