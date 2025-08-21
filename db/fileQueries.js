const { PrismaClient } = require("../generated/prisma");
const { name } = require("ejs");
const prisma = new PrismaClient();

const fileQueries = {
    createFile: async (originalname, name, userid, size) => {
    try {
      await prisma.file.create({
        data: {
          user: {
            connect: {
              id: userid,
            },
          },
          originalname: originalname,
          name: name,
          size: size
        },
      });
    } catch (err) {
      throw new Error(err);
    }
    await prisma.$disconnect();
  },
  getFiles: async (id) => {
    try {
        const files = await prisma.file.findMany({
            where: {
                userid: id
            },
          
        })
        return files
    } catch(err) {
        console.error(err)
    }
    await prisma.$disconnect();
  },
  getFile: async (id) =>{

    try {
      const file = await prisma.file.findUnique({
        where: {
          id: parseInt(id)
        }
      })
     
      return file
    } catch (err){
      console.error(err)
    }
    await prisma.$disconnect()
  },
  deleteFile:  async (fileid) => {
    await prisma.file.delete({
      where: {
        id: fileid
      }
    })
    await prisma.$disconnect()
  },

  getFolderFiles: async (folderid) => {
    
      const files = await prisma.file.findMany({
      where: {
        folderid: folderid
      } 
        })
   
  return files


}
}

module.exports = fileQueries