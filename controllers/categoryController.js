require('dotenv').config();
const { env } = require('node:process');
const controller = {}
const e = require("express");
const utils = require("../utils/utils.js")
const strings = require("../utils/strings.js")
const modelCategory = require("../models/categoryModel.js")
const { ObjectId } = require('mongodb');
const { error } = require('node:console');

controller.addCategory = async function (req, res, next) {
    const category = { name: req.body.name, user: new ObjectId(req._id), date: new Date() }
    let result;
    const categoryExists = await modelCategory.getCategoryByUserAndName(category.user, category.name)
    if (categoryExists) {
        return next(utils.constructError(strings.CATEGORY_EXISTS, 422))
    }
    try {
        result = await modelCategory.insertCategory(category)
        res.status(200).json({ status: true, id: result.insertedId })
    } catch {
        next(strings.ERROR_CREATING_CATEGORY)
    }

}

controller.getCategoriesByUser = async function (req, res, next) {
    let categories
    try {
        categories = await modelCategory.getCategoriesByUser(req._id)
    } catch {
        return next(utils.constructError(strings.GET_CATEGORIES_ERROR))
    }
    console.log(categories)
    res.status(200).json(categories)

}
controller.removeCategory = async function (req, res, next) {
    const id = req.params.id;
    let remove
    try {
        remove = await modelCategory.removeCategoryByUserAndId(new ObjectId(req._id), new ObjectId(id))
    } catch {
        return next(strings.ERROR_DELETING_CATEGORY)
    }

    if (remove.deletedCount == 1) {
        res.status(200).json(utils.sendSuccess(strings.CATEGORY_DELETED))
    } else {
        next(utils.constructError(strings.CATEGORY_NOT_FOUND, 404))
    }


}



module.exports = controller