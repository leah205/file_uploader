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
  createFolder: async(name, userid) => {
    console.log(name)
    await prisma.folder.create({
      data: {
        name: name,
        user: {
          connect: {
            id: userid
          }
        }
      }
    })
    
    await prisma.$disconnect()
  },
}

module.exports = folderQueries