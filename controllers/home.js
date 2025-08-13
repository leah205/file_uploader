const homeController = {
    index: {
        get: (req, res) => {
            res.render("index")
        }
    }
}


module.exports = homeController