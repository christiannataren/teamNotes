const db = require("../models/db")
const collection = "categories"
const {ObjectId} = require("mongodb")
model = {}


model.getCategoryByNameAndUser = async function (user,name) {
    const cat = await db.getOne(collection, { user: new ObjectId(user), name: name })
    return cat;
}



model.insertCategory = async function (category) {
    const cat = await db.insertData(collection, category)
    return cat
}



module.exports = model