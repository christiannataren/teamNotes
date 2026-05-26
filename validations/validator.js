const { validationResult } = require("express-validator")
const utils = require("../utils/utils")
validator = {}

validator.validateData = async (req, res, next) => {
    let errors = []
    errors = validationResult(req)

    if (!errors.isEmpty()) {
        // console.log(errors)
        next(utils.constructError(errors, 422))

    } else {
        next();
    }
}


module.exports = validator