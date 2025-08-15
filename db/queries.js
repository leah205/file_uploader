const bcrypt = require("bcryptjs");

const { PrismaClient } = require("../generated/prisma");
const { name } = require("ejs");
const prisma = new PrismaClient();

const queries = {
  createUser: async (username, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
    await prisma.$disconnect();
  },
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
};

module.exports = queries;
