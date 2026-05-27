const { body, param } = require("express-validator")
const strings = require("../utils/strings")
const modelCategory = require("../models/categoryModel")
const validateRules = {}



validateRules.createUser = () => {
    return [
        body("*").isString().escape().trim(),
        body("name").notEmpty().withMessage(strings.NAME_NOT_EMPTY),
        body("email").notEmpty().withMessage(strings.EMAIL_NOT_EMPTY).isEmail().withMessage(strings.EMAIL_BAD_FORMAT),
        body("password").notEmpty().withMessage(strings.PASSWORD_NOT_EMPTY).isLength({ min: 5 }).withMessage(strings.PASSWORD_SHORT),
    ]
}
validateRules.addMember = () => {
    return [
        body("*").isString().escape().trim(),
        body("email").notEmpty().withMessage(strings.EMAIL_NOT_EMPTY).isEmail().withMessage(strings.EMAIL_BAD_FORMAT)
    ]
}
validateRules.updateUser = () => {
    return [
        body("*").isString().escape().trim(),
        body("name").notEmpty().withMessage(strings.NAME_NOT_EMPTY),
        body("email").notEmpty().withMessage(strings.EMAIL_NOT_EMPTY).isEmail().withMessage(strings.EMAIL_BAD_FORMAT)
    ]
}
validateRules.addCategory = () => {
    return [
        body("*").isString().escape().trim(),
        body("name").notEmpty().withMessage(strings.NAME_NOT_EMPTY).isLength({ max: 40 }).withMessage(strings.LONG_NAME_CATEGORY)
    ]
}

validateRules.createTeam = () => {
    return [

        body("*").isString().escape().trim(),
        body("name").notEmpty().withMessage(strings.NAME_NOT_EMPTY).isLength({ max: 40 }).withMessage(strings.LONG_NAME_CATEGORY),
        body("description").isString().escape().trim()

    ]
}

validateRules.validateId = () => {
    return [
        param("id").isString().escape().trim().isMongoId().withMessage(strings.BAD_REQUEST)
    ]
}
validateRules.validateIdMember = () => {
    return [
        param("id_member").isString().escape().trim().isMongoId().withMessage(strings.BAD_REQUEST)
    ]
}

module.exports = validateRules