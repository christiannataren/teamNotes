const db = require('./db.js')


const collection = "teams"
const model = {}


model.createTeam = async function (team) {
    const insert = await db.insertData(collection, team)
    return insert

}

model.getTeamByUserAndName = async function (user_id, name) {
    const team = await db.getOne(collection, { user: user_id, name: name })
    return team

}
model.getTeamById = async function (id) {
    const team = await db.getByID(collection, id)
    return team
}


model.getTeamsByUserId = async function (id) {
    const filter = {
        $or: [
            { user: id },
            { "members._id": id }
        ]
    }
    const teams = await db.getAllFilter(collection, filter)
    return teams
}

model.deleteByUserAndId = async function (user_id, id) {
    const team = await db.deleteBy(collection, { user: user_id, _id: id })
    return team
}

model.getTeamByUserAndId = async function (user_id, id) {
    const team = await db.getOne(collection, { user: user_id, _id: id })
    return team
}

model.updateTeam = async function (id, data) {
    const update = await db.updateByID(collection, id, data)
    return update
}


module.exports = model