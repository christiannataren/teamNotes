require('dotenv').config();
const { env } = require('node:process');
const controller = {}
const e = require("express");
const utils = require("../utils/utils.js")
const strings = require("../utils/strings.js")
const modelCategory = require("../models/categoryModel.js")
const { ObjectId } = require('mongodb');

controller.addCategory = async function (req, res, next) {
    let category = { name: req.body.name, user: new ObjectId(req.body.user), date: new Date() }
    let result;
    try {
        result = await modelCategory.insertCategory(category)
        console.log(result)
        res.status(200).json(result)
    } catch {
        next(strings.ERROR_CREATING_CATEGORY)
    }

}



module.exports = controller