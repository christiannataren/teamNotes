const express = require("express")
const router = new express.Router();
const validator = require("../validations/validator")
const validateRules = require("../validations/validateRules")
const categoryController = require("../controllers/categoryController")

router.post('/create', validateRules.addCategory(), validator.validateData, categoryController.addCategory)


module.exports = router