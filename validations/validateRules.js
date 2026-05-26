const { body } = require("express-validator")
const strings = require("../utils/strings")
const modelCategory = require("../models/categoryModel")
validateRules = {}



validateRules.createUser = () => {
    return [
        body("*").escape().trim(),
        body("name").notEmpty().withMessage(strings.NAME_NOT_EMPTY),
        body("email").notEmpty().withMessage(strings.EMAIL_NOT_EMPTY).isEmail().withMessage(strings.EMAIL_BAD_FORMAT),
        body("password").notEmpty().withMessage(strings.PASSWORD_NOT_EMPTY).isLength({ min: 5 }).withMessage(strings.PASSWORD_SHORT),
    ]
}
validateRules.updateUser = () => {
    return [
        body("*").escape().trim(),
        body("name").notEmpty().withMessage(strings.NAME_NOT_EMPTY),
        body("email").notEmpty().withMessage(strings.EMAIL_NOT_EMPTY).isEmail().withMessage(strings.EMAIL_BAD_FORMAT)
    ]
}
validateRules.addCategory = () => {
    return [
        body("*").escape().trim(),
        body("name").notEmpty().withMessage(strings.NAME_NOT_EMPTY).isLength({ max: 40 }).withMessage(strings.LONG_NAME_CATEGORY)
    ]
}

module.exports = validateRules