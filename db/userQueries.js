const bcrypt = require("bcryptjs");

const { PrismaClient } = require("../generated/prisma");
const { name } = require("ejs");
const prisma = new PrismaClient();

const userQueries = {
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
}

module.exports = userQueries