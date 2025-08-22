const { PrismaClient } = require("../generated/prisma");
const { name } = require("ejs");
const prisma = new PrismaClient();

const folderQueries = {
    getFolders: async (userid) => {
    const folders = await prisma.folder.findMany({
      
        where: {
          userid: userid
        }
      
    })
    return folders
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
 
}

module.exports = folderQueries