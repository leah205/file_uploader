const bcrypt = require("bcryptjs")
const pool = require('../db/pool')


const queries = {
    createUser: async(username, password) => {
         try{
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(typeof hashedPassword)
        await pool.query( `
            INSERT INTO "User" (username, password) 
            VALUES ($1, $2)
            `, [username, hashedPassword])
    } catch (err) {
        throw new Error(err)
    }  
    }

} 

module.exports = queries