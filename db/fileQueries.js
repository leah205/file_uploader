const { PrismaClient } = require("../generated/prisma");
const { name } = require("ejs");
const prisma = new PrismaClient();

const fileQueries = {
    createFile: async (originalname,  userid, size, folderid) => {
    try {
      await prisma.file.create({
        data: {
          user: {
            connect: {
              id: userid,
            },
          },
          parentFolder: {
            connect: {
              id: folderid
            }
          },
          originalname: originalname,
          size: size
        },
      });
    } catch (err) {
      throw new Error(err);
    }
    
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
    
  },
  getFile: async (id, userid) =>{
    console.log(id);
    console.log(userid)
    try {
      const file = await prisma.file.findUnique({
        where: {
          id: parseInt(id),
          userid: userid
        }
      })
     
      return file
    } catch (err){
      console.error(err)
    }

  },
  deleteFile:  async (fileid) => {
    await prisma.file.delete({
      where: {
        id: fileid
      }
    })

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