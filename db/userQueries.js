const bcrypt = require("bcryptjs");

const { PrismaClient } = require("../generated/prisma");
const { name } = require("ejs");
const prisma = new PrismaClient();


const userQueries = {
    createUser: async (username, password) => {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await prisma.user.create({
            data: {
              username: username,
              password: hashedPassword,
            },
          });
          return user 
      },
      isUsernameTaken: async (username) => {
        const user = await prisma.user.findUnique({
            where: {username: username}
        })
        return Boolean(user)
      }
}

module.exports = userQueries