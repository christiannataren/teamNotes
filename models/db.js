
require('dotenv').config();
const { env } = require('node:process');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require("mongodb")
const uri = env.DATABASE_URL;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let database = null
const db = {}

db.connect = async function () {
    if (!database) {
        await client.connect();
        database = client.db(env.DATABASE)
    }
    return database;
}

db.getDB = async function () {
    let da = await db.connect();
    return da;
}


db.getCollection = async function (collection) {
    const col = (await db.getDB()).collection(collection);
    return col;
}

db.updateByID = async function (collection, id, data) {
    ///////////always 
    const col = await db.getCollection(collection);
    let result = await col.updateOne({ _id: id }, { $set: data })
    return result;
}

db.getByID = async function (collection, id) {
    const col = await db.getCollection(collection);
    let result = await col.findOne({ _id: id });
    return result;
}
db.deleteByID = async function (collection, id) {
    const col = await db.getCollection(collection);
    let result = await col.deleteOne({ _id: new ObjectId(id) });
    return result;
}
db.deleteBy = async function (collection, filter) {
    const col = await db.getCollection(collection);
    let result = await col.deleteOne(filter);
    return result;
}

db.insertData = async function (collection, data) {
    const col = await db.getCollection(collection);
    let result = await col.insertOne(data);
    return result;
}
db.getOne = async function (collection, filter = {}) {
    //ppas in the filter the data to search {email: "email@email.com"}
    const col = await db.getCollection(collection);
    let result = await col.findOne(filter);
    return result;
}

db.getAll = async function (collection) {
    let col = await db.getCollection(collection);
    let cursor = await col.find();
    let result = await cursor.toArray();
    return result;
}
db.getAllFilter = async function (collection, filter) {
    let col = await db.getCollection(collection);
    let cursor = await col.find(filter);
    let result = await cursor.toArray();
    return result;
}


db.close = async function () {
    if (database) {
        await client.close();
        database = null;
        console.log('Desconectado de MongoDB');
    }
}




module.exports = db

