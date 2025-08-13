
const {body} = require('express-validator')

const validation = {
    signup: [
        
    body("username").trim()
    .notEmpty().withMessage('username is required'),
    body("password").trim()
    .isLength({min: 5, max: 20}).withMessage('password must be between 5 and 20 characters'),
    body("password_confirm").trim()
    .custom((value, {req}) => {
        return value == req.body.password
    }).withMessage('Passwords must match')
    ]
}

module.exports = validation