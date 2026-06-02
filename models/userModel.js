const { use } = require('passport')
const db = require('./db.js')


const collection = "users"
const model = {}



model.updateUser = async function (id, user) {
    let update = await db.updateByID(collection, id, user)
    return update
}
model.insertUser = async function (user) {
    let result = await db.insertData(collection, user)
    return result

}

model.getUserById = async function (id) {
    let user = await db.getByID(collection, id)
    return user
}
model.getUserByEmail = async function (email) {
    let user = await db.getOne(collection, { username: email })
    return user
}
model.getGithubUser = async function (ghId) {
    let user = await db.getOne(collection, { githubId: ghId })
    return user
}
module.exports = model

