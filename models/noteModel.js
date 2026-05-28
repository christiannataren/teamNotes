const db = require("../models/db")
const collection = "notes"

const model = {}

model.createNote = async function (note) {
    const result = await db.insertData(collection, note)
    return result
}

model.getNote = async function (id) {
    const note = await db.getByID(collection, id)
    return note
}

model.deleteNote = async function (id) {
    const result = await db.deleteByID(collection, id)
    return result
}

model.updateNote = async function (id, data) {
    const update = await db.updateByID(collection, id, data)
    return update
}

model.getNotesByTeam = async function (idTeam) {

    const notes = await db.getAllFilter(collection, { teamId: idTeam })
    return notes
}

module.exports = model