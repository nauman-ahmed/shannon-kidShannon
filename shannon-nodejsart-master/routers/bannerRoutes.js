const bannerController = require('./../controller/bannerController');
const authController =require('./../controller/authController');
const uploader = require('./../controller/multerControllerBanner');
const express = require("express");
const uploadFirebase = require('./../controller/fileUploader');
const router = express.Router();

router.post("/create",uploader.single('banner'),uploadFirebase,bannerController.Create);
router.post("/findId",authController.authAdmin,bannerController.findById);
router.post("/deleteId",authController.authAdmin,bannerController.deleteById);


router.post("/singleUpdate",uploader.single('banner'),uploadFirebase,bannerController.singleUpdate);
router.post("/getAll",bannerController.getAll);

module.exports = router;