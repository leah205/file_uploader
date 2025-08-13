const db = require("../db/queries")


const userController = {
    signup: {
        get: (req, res) => {
            res.render('signup')
        },
        post: async (req, res, next) => {
             try {
                await db.createUser(req.body.username, req.body.password)
                res.redirect('/login')
            } catch (err) {
                    next(err)
            }
        }
    }

}

module.exports = userController