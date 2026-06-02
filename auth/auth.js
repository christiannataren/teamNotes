const strings = require("../utils/strings")
const utils = require("../utils/utils")
auth = {}

const userModel = require("../models/userModel")
const ObjectId = require("mongodb")
const { use } = require("passport")



let publicPaths = [
    { path: "/users", method: "POST" },
    { path: "/users/", method: "POST" },
    { path: "/api-docs/", method: "POST" },
    { path: "/api-docs/", method: "GET" },
    { path: "/login/", method: "POST" },
    { path: "/login", method: "GET" },
    { path: "/github/callback/", method: "GET" },
    { path: "/", method: "GET" },
    { path: "/github/callback", method: "GET" }
    // {path: "/use", method: "POST"}
]

auth.verifySesion = async function (req, res, next) {
    const user = req.session.user
    if (user) {
        const ghId = await userModel.getGithubUser(user.id)
        if (ghId) {
            req._id = ghId._id
        }
    }
    let publicAccess = publicPaths.some(url =>
        url.path == req.path && url.method == req.method
    )
    if (req.path.includes("api-docs")) {
        try {
            if (req.path.split("/")[1] == "api-docs") {
                publicAccess = true
            }
        } catch {

        }

    }
    if (req._id || publicAccess) {
        next()
    } else {
        next(utils.constructError(strings.UNAUTHORIZED, 401))
    }
}





module.exports = auth
