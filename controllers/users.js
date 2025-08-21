
const passport = require("../passport")
const userdb = require("../db/userQueries")
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
                await userdb.createUser(req.body.username, req.body.password)
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
    },
    logout: {
        get: (req, res, next) => {
        req.logout((err) => {
        if (err){
            return next(err)
        }
        res.redirect("/")
    })

        }
    }
    
    

}



module.exports = userController