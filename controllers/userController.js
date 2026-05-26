require('dotenv').config();
const { env } = require('node:process');
const controller = {}
const e = require("express");
const utils = require("../utils/utils.js")
const strings = require("../utils/strings.js")

const userModel = require("../models/userModel.js");
const password = require("../auth/password.js")




controller.updateUser = async function (req, res, next) {
    let user = { name: req.body.name, email: req.body.email, password: req.body.password }
    /***************CAMBIAR POR JWT PARA UPDATE USER */
    let mUser = await userModel.getUserByEmail(user.email);
    // console.log(mUser)
    if (mUser) {
        let id = mUser._id.toString()
        let status = await userModel.updateUser(id, user)
        res.status(200).json(status)

    } else {
        next(utils.constructError(strings.USER_NOT_FOUND), 404)
    }
}
controller.createUser = async function (req, res, next) {
    let user = { name: req.body.name, email: req.body.email, password: req.body.password }
    let userExists
    try {
        userExists = await userModel.getUserByEmail(user.email)
    } catch {
        next(utils.constructError(strings.ERROR_GETTING_USER))
    }


    if (!userExists) {
        user.password = await password.hashPassword(user.password)
        user.createdAt = new Date()
        try {
            let inserted = await userModel.insertUser(user)
            res.status(200).json(utils.sendSuccess(strings.USER_CREATED))
        } catch {
            next(utils.constructError(strings.ERROR_CREATING_USER))
        }
    } else {
        next(utils.constructError(strings.EMAIL_EXISTS), 409)
    }

}


module.exports = controller
