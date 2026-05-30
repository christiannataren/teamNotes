const express = require("express")
const router = new express.Router();
const validator = require("../validations/validator")
const validateRules = require("../validations/validateRules")
const controller = require("../controllers/noteController")

router.post("/", validateRules.createNote(), validator.validateData, controller.createNote)
router.get("/", controller.getNotes)


router.delete("/:id", validateRules.validateId(), validator.validateData, controller.deleteNote)

router.put("/:id", validateRules.validateId(), validateRules.updateNote(), validator.validateData, controller.updateNote)





module.exports = router