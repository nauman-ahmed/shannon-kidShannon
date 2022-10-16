const keywordController = require('./../controller/keywordController');
const authController =require('./../controller/authController');

const express = require("express");
const router = express.Router();

router.post("/create",authController.authAdmin,keywordController.Create);
router.post("/findId",authController.authAdmin,keywordController.findById);
router.post("/deleteId",authController.authAdmin,keywordController.deleteById);
router.post("/getAll",authController.authAdmin,keywordController.getAll);
router.post("/getAllClient",keywordController.getAllClient);

router.post("/getIllustration",keywordController.getAllIllustration);
router.post("/getMotion",keywordController.getAllIllustration);
router.post("/getCgi",keywordController.getAllIllustration);
router.post("/getMedical",keywordController.getAllIllustration);
router.post("/getPhotography",keywordController.getAllPhotography);

module.exports = router;