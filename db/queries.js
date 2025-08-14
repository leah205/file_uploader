const bcrypt = require("bcryptjs")

const {PrismaClient} = require("../generated/prisma")
const prisma = new PrismaClient()

const queries = {
    createUser: async (username, password) => {
         try{
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            },
        })
        
        } catch (err) {
        throw new Error(err)
     }  
          await prisma.$disconnect()
     }
 

} 

module.exports = queries