const express = require("express")
const router = new express.Router();
const userController = require("../controllers/userController")
const validator = require("../validations/validator")
const validateRules = require("../validations/validateRules")

router.post('/', validateRules.createUser(), validator.validateData, userController.createUser)
router.put('/', validateRules.updateUser(), validator.validateData, userController.updateUser)
// router.get('/:id', contactsCtrl.getByID)
// router.get('/insert', contactsCtrl.insert)
// router.put('/:id', validatorRules.createUser(), validator.validateContact, contactsCtrl.updateContact)
// router.post('/create', validatorRules.createUser(), validator.validateContact, contactsCtrl.create)
// router.delete('/:id', contactsCtrl.deleteContact)


module.exports = router