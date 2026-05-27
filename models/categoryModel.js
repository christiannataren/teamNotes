const db = require("../models/db")
const collection = "categories"
const { ObjectId } = require("mongodb")
const model = {}


model.getCategoryByUserAndName = async function (user, name) {
    //we receive the user in ObjectId format
    const cat = await db.getOne(collection, { user: user, name: name })
    return cat;
}



model.insertCategory = async function (category) {
    const cat = await db.insertData(collection, category)
    return cat
}

model.removeCategoryByUserAndId = async function (user_id, id) {
    const category = await db.deleteBy(collection, { _id: id, user: user_id })
    return category
}
model.getCategoriesByUser = async function (id) {
    const cats = await db.getAllFilter(collection, { user: new ObjectId(id) })
    return cats
}


module.exports = model