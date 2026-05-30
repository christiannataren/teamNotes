

const utils = {}

utils.constructError = function (message, error = 500) {

    message = message.errors || message
    return {
        message: message,
        status: error,
        custom: true
    }
}

utils.sendSuccess = function (message) {
    return { status: true, message: message }
}


utils.isMemberTeam = function (user_id, team) {
    return team.user.toString == user_id.toString() || team.members.some(member => member._id.toString() == user_id.toString())
}


utils.isOwnerTeam = function (user_id, team) {
    return team.user.toString() == user_id.toString()
}


module.exports = utils