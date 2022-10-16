const contactController = require('./../controller/contactController');
const authController = require('./../controller/authController');
const express = require("express");
const router = express.Router();

router.post("/create",  contactController.Create);
router.post("/findId", authController.authAdmin, contactController.findById);
router.post("/deleteId", authController.authAdmin, contactController.deleteById);
router.post("/getAll", authController.authAdmin, contactController.getAll);
router.post("/updateSingle", authController.authAdmin, contactController.updateSingle);

module.exports = router;