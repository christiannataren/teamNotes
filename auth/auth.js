const strings = require("../utils/strings")
const utils = require("../utils/utils")
auth = {}

const ObjectId = require("mongodb")

let publicPaths = [
    { path: "/users", method: "POST" },
    { path: "/users/", method: "POST" },
    { path: "/api-docs/", method: "POST" },
    { path: "/api-docs/", method: "GET" }
    // {path: "/use", method: "POST"}
]

auth.verifySesion = async function (req, res, next) {
    //////////CHANGE WHen IMPLEMENT AAUTHORIZATION
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        req._id = token
    }
    let publicAccess = publicPaths.some(url =>
        url.path == req.path && url.method == req.method
    )
    if (req.path.includes("api-docs")) {
        try {
            console.log(req.path.split("/")[1])
            if (req.path.split("/")[1] == "api-docs") {
                publicAccess = true
            }
        } catch {

        }
    }
    // console.log(req.path + ": " + publicAccess)
    req._id = "6a17aa0b60810d552f91b154"
    if (req._id || publicAccess) {
        next()
    } else {
        next(utils.constructError(strings.UNAUTHORIZED, 401))
    }
}





module.exports = auth
