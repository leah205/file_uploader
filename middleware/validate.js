
const {body} = require('express-validator')
const userdb = require('../db/userQueries')
const validation = {
    signup: [
        
    body("username").trim()
    .notEmpty().withMessage('username is required')
    .custom(async (value, req) => {
        const isTaken = await userdb.isUsernameTaken(value)
        if(isTaken){
            throw new Error("username is taken")
        }
        return true
    }),
    body("password").trim()
    .isLength({min: 5, max: 20}).withMessage('password must be between 5 and 20 characters'),
    body("password_confirm").trim()
    .custom((value, {req}) => {
        return value == req.body.password
    }).withMessage('Passwords must match')
    ]
}

module.exports = validation