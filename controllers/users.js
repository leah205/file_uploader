const db = require("../db/queries")
const passport = require("../passport")

const {validationResult} = require('express-validator')

const userController = {
    signup: {
        get: (req, res) => {
            res.render('signup')
        },
        post: async (req, res, next) => {
             const errors = validationResult(req)
             if(!errors.isEmpty()){
                return res.status(400).render("signup", {
                    errors: errors.array()
                })
            }
             try {
                await db.createUser(req.body.username, req.body.password)
                res.redirect('/login')
            } catch (err) {
                    next(err)
            }
        }
    },
    login: {
        get: (req, res) => {
               res.render("login", {errors: [{msg: req.flash('error')[0]}]})
        },
        post:  passport.authenticate("local", {
                    successRedirect: "/",
                    failureRedirect: "/login",
                    failureFlash: true
})
    }


}



module.exports = userController