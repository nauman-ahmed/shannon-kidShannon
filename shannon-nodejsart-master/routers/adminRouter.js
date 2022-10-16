const adminController = require('./../controller/AdminController');
const authController =require('./../controller/authController');

const express = require("express");
const router = express.Router();

// router.post("/register",adminController.register);
router.post("/login",adminController.login);

router.post("/updadeProfile",authController.authAdmin,adminController.updateProfile);
  

router.post("/register",authController.authAdmin,adminController.create);
router.post("/getAll",authController.authAdmin,adminController.getAll);
router.post("/singleDelete",authController.authAdmin,adminController.singleDelete);
router.post("/singleUpdate",authController.authAdmin,adminController.singleUpdate);

router.post("/forgetPassword",adminController.forgetPassword);


module.exports = router;