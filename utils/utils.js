

utils = {}

utils.constructError = function (message, error = 500) {

    message = message.errors || message
    return {
        message: message,
        status: error
    }
}

utils.sendSuccess = function (message) {
    return { status: true, message: message }
}


module.exports = utils