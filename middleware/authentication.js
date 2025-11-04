
authentication = {
    isAuth:(req, res, next) => {
        console.log("auth")
        if(req.isAuthenticated()){
        next()
        } else {
        res.redirect(`/login`)
    }
}
}

module.exports = authentication