const controller = {}
const { ObjectId } = require("mongodb")
const model = require("../models/teamModel")
const userModel = require("../models/userModel")
const utils = require("../utils/utils")
const strings = require("../utils/strings")

controller.createTeam = async function (req, res, next) {

    const team = { name: req.body.name, description: req.body.description, user: new ObjectId(req._id), members: [], createdAt: new Date() }
    try {
        const exist = await model.getTeamByUserAndName(new ObjectId(req._id), team.name);
        if (exist) {
            return next(utils.constructError(strings.TEAM_EXISTS, 422))
        }

    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.TEAM_EXISTS))
    }
    try {
        const insert = await model.createTeam(team)
        if (insert) {
            res.status(200).json({ status: true, id: insert.insertedId })
        } else {
            next(utils.constructError(strings.ERROR_CREATING_TEAM, 500))
        }
    } catch (error) {
        console.log(error)
        next(utils.constructError(strings.ERROR_CREATING_TEAM, 500))
    }



}


controller.getTeam = async function (req, res, next) {
    const teamId = req.params.id
    try {
        const team = await model.getTeamById(new ObjectId(teamId))
        const userId = req._id
        if (team) {
            if (utils.isMemberTeam(userId, team) || utils.isOwnerTeam(userId, team)) {
                res.status(200).json(team)
            } else {
                return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
            }
        } else {
            return next(utils.constructError(strings.TEAM_NOT_FOUND, 404))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_TEAM))
    }

}
controller.deleteTeam = async function (req, res, next) {
    const id = req.params.id
    try {
        const team = await model.deleteByUserAndId(new ObjectId(req._id), new ObjectId(id));
        if (team.deletedCount == 1) {
            res.status(200).json({ status: true, message: strings.TEAM_DELETED })
        } else {
            next(utils.constructError(strings.TEAM_NOT_FOUND, 404))
        }
    } catch (error) {
        console.log(error)
        next(utils.constructError(strings.ERROR_GETTING_TEAM))
    }
}
controller.getTeams = async function (req, res, next) {
    try {
        const teams = await model.getTeamsByUserId(new ObjectId(req._id));
        res.status(200).json(teams)
    } catch (error) {
        console.log(error)
        next(utils.constructError(strings.ERROR_GETTING_TEAM + "s", 500))
    }
}


controller.addMember = async function (req, res, next) {
    const id_team = req.params.id
    const username = req.body.username
    try {

        const team = await model.getTeamByUserAndId(new ObjectId(req._id), new ObjectId(id_team))
        if (team) {
            const invited = await userModel.getUserByEmail(username)
            if (!invited) {
                return next(utils.constructError(strings.USER_NOT_FOUND, 404))
            } else {
                if (invited._id.toString() == req._id) {
                    return next(utils.constructError(strings.ERROR_OWN_GROUP, 422))
                }
                const isMember = team.members.some(member =>
                    member._id.toString() == invited._id.toString()
                )
                if (isMember) {
                    return next(utils.constructError(strings.ALREADY_MEMBER))
                }
            }
            team.members.push({ _id: invited._id })
            const members = { members: team.members }
            const update = await model.updateTeam(team._id, members)
            if (update.matchedCount == 1) {
                res.status(200).json(utils.sendSuccess(strings.USER_ADDED))
            } else {
                return next(utils.constructError(strings.ERROR_ADDING_USER))
            }

        } else {
            return next(utils.constructError(strings.ERROR_TEAM_OWNERSHIP, 400))
        }
    } catch (error) {
        console.log(error)
        next(utils.constructError(strings.ERROR_GETTING_TEAM))
    }

}
controller.updateTeam = async function (req, res, next) {
    const id_team = req.params.id
    const { name, description } = req.body
    try {

        const team = await model.getTeamByUserAndId(new ObjectId(req._id), new ObjectId(id_team))
        if (team) {
            const update = await model.updateTeam(new ObjectId(id_team), { name, description })
            if (update.matchedCount == 1) {
                res.status(200).json(utils.sendSuccess(strings.TEAM_UPDATED))
            } else {
                return next(utils.constructError(strings.ERROR_UPDATING_TEAM))
            }



        } else {
            return next(utils.constructError(strings.ERROR_TEAM_OWNERSHIP, 400))
        }
    } catch (error) {
        console.log(error)
        next(utils.constructError(strings.ERROR_GETTING_TEAM))
    }

}
controller.deleteMember = async function (req, res, next) {
    const id_team = req.params.id
    const id_member = req.params.id_member
    try {
        const team = await model.getTeamByUserAndId(new ObjectId(req._id), new ObjectId(id_team))
        if (team) {
            const isMember = team.members.some(member =>
                member._id.toString() == id_member
            )
            if (isMember) {
                const members = team.members.filter(member =>
                    member._id.toString() != id_member
                )
                const update = await model.updateTeam(new ObjectId(id_team), { members: members })
                if (update.matchedCount == 1) {
                    res.status(200).json(utils.sendSuccess(strings.USER_REMOVED))
                } else {
                    return next(utils.constructError(strings.ERROR_REMOVING_USER))
                }
            } else {
                return next(utils.constructError(strings.USER_NOT_MEMBER))
            }

        } else {
            return next(utils.constructError(strings.ERROR_TEAM_OWNERSHIP, 400))
        }
    } catch (error) {
        console.log(error)
        next(utils.constructError(strings.ERROR_GETTING_TEAM))
    }

}


// controller.updateTeam = async function (res, req, next) {


// }

module.exports = controller