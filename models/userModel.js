const db = require('./db.js')


const collection = "users"
model = {}



model.updateUser = async function (id, user) {
    let update = await db.updateByID(collection, id, user)
    return update
}
model.insertUser = async function (user) {
    let result = await db.insertData(collection, user)
    return result

}


model.getUserByEmail = async function (email) {
    let user = await db.getOne(collection, { email: email })
    return user
}
module.exports = model

