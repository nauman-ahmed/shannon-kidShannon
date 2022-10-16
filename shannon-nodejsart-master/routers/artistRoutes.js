const artistController = require('./../controller/artistController');
const authController =require('./../controller/authController');

const express = require("express");
const router = express.Router();

router.post("/register",artistController.register);
router.post("/login",artistController.login);

router.post("/updateArtist",authController.authAdmin,artistController.updateArtist);


router.post("/create",authController.authAdmin,artistController.create);

router.post("/orderArtist",artistController.orderArtistAll);
router.post("/getAll",authController.authAdmin,artistController.getAll);
router.post("/getAllClient",artistController.getAllClient);

router.post("/singleDelete",authController.authAdmin,artistController.singleDelete);


router.post("/singleUpdate",authController.authAdmin,artistController.singleUpdate);
router.post("/updateBio",authController.authAdmin,artistController.updateBio);

router.post("/forgetPassword",artistController.forgetPassword);



module.exports = router;