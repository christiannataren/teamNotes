const express = require("express")
const router = new express.Router();
const controller = require("../controllers/teamController")
const validator = require("../validations/validator")
const validateRules = require("../validations/validateRules")
const noteController = require("../controllers/noteController")

router.get("/", controller.getTeams)


router.get("/:id/notes", validateRules.validateId(), validator.validateData, noteController.getTeamNotes)

router.get("/:id", validateRules.validateId(), validator.validateData, controller.getTeam)


router.post("/", /*
      #swagger.parameters['body'] = {
        in: 'body',
        schema: {
          $name: 'name',
          $description: 'description'
        }
      }
    */ validateRules.createTeam(), validator.validateData, controller.createTeam)
router.delete("/:id", validateRules.validateId(), validator.validateData, controller.deleteTeam)

router.put("/:id", validateRules.validateId(), validateRules.createTeam(), validator.validateData, controller.updateTeam)

router.post("/:id/members/",/*
      #swagger.parameters['body'] = {
        in: 'body',
        schema: {
          $email: 'email'
        }
      }
    */  validateRules.validateId(), validateRules.addMember(), validator.validateData, controller.addMember)
router.delete("/:id/members/:id_member", validateRules.validateId(), validateRules.validateIdMember(), validator.validateData, controller.deleteMember)







module.exports = router