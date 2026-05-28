const { ObjectId } = require("mongodb")
const utils = require("../utils/utils")
const strings = require("../utils/strings")
const model = require("../models/noteModel")
const modelTeam = require("../models/teamModel")
const e = require("express")
const controller = {}


controller.isMember = function (user_id, team) {
    return team.user.toString == user_id.toString() || team.members.some(member => member._id.toString() == user_id.toString())
}


controller.isOwner = function (user_id, team) {
    return team.user.toString() == user_id.toString()
}
controller.createNote = async function (req, res, next) {
    const note = {
        content: req.body.content,
        category: req.body.category,
        createdBy: new ObjectId(req._id),
        lastEditor: new ObjectId(req._id),
        teamId: new ObjectId(req.body.team),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    try {
        const team = await modelTeam.getTeamById(note.teamId)
        if (!team) {
            return next(utils.constructError(strings.TEAM_NOT_FOUND))
        }
        const isMember = controller.isMember(req._id, team) || controller.isOwner(req._id, team)
        if (!isMember) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }
        const result = await model.createNote(note)
        if (result.insertedId) {
            res.status(200).json({ status: true, id: result.insertedId })
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_ADDING_NOTE))
    }
}

controller.deleteNote = async function (req, res, next) {
    try {
        const user_id = new ObjectId(req._id)
        const note_id = new ObjectId(req.params.id)

        const note = await model.getNote(note_id)
        if (!note) {
            return next(utils.constructError(strings.NOTE_NOT_FOUND, 404))
        }

        const team = await modelTeam.getTeamById(new ObjectId(note.teamId))
        console.log(team)
        const isOwner = controller.isOwner(req._id, team)
        const isCreator = note.createdBy.toString() === user_id.toString()

        if (!isOwner && !isCreator) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }

        const result = await model.deleteNote(note_id)
        if (result.deletedCount === 1) {
            res.status(200).json(utils.sendSuccess(strings.NOTE_DELETED))
        } else {
            return next(utils.constructError(strings.NOTE_NOT_FOUND, 404))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_REMOVING_NOTE))
    }
}
controller.updateNote = async function (req, res, next) {
    try {
        const user_id = new ObjectId(req._id)
        const note_id = new ObjectId(req.params.id)
        const content = req.body.content

        const note = await model.getNote(note_id)
        if (!note) {
            return next(utils.constructError(strings.NOTE_NOT_FOUND, 404))
        }

        const team = await modelTeam.getTeamById(new ObjectId(note.teamId))
        const isOwner = controller.isOwner(req._id, team)
        const isCreator = note.createdBy.toString() === user_id.toString()

        if (!isOwner && !isCreator) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }

        const result = await model.updateNote(note_id, { content, updatedAt: new Date(), lastEditor: user_id })
        if (result.modifiedCount == 1) {
            res.status(200).json(utils.sendSuccess(strings.NOTE_UPDATED))
        } else {
            return next(utils.constructError(strings.ERROR_UPDATING_NOTE))
        }



    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_UPDATING_NOTE))
    }
}

controller.getTeamNotes = async function (req, res, next) {
    const idTeam = req.params.id
    try {
        const team = await modelTeam.getTeamById(new ObjectId(idTeam))
        if (!team) {
            return next(utils.constructError(strings.TEAM_NOT_FOUND, 404))
        }
        const readRights = controller.isMember(req._id, team) || controller.isOwner(req._id, team)
        if (!readRights) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION))
        }
        const notes = await model.getNotesByTeam(new ObjectId(idTeam))
        res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_NOTES))
    }




}

module.exports = controller