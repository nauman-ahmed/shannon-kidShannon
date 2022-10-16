const imageArtistController = require('./../controller/imageOfArtistController');
const uploader = require('./../controller/multerControllerArtist');
const authController =require('./../controller/authController');
const uploadImage =require('./../controller/artistImageuploader');

const express = require("express");
const router = express.Router();

router.post("/create",uploader.array('artistImage',3),uploadImage,imageArtistController.Create);



router.post("/findId",imageArtistController.getById);
router.post("/orderPortfolio",imageArtistController.orderArtistPortfolio);


router.post("/deleteId",authController.authAdmin,imageArtistController.deleteById);
router.post("/getAll",authController.authAdmin,imageArtistController.getAll);

router.post("/getByImageId",imageArtistController.getByImageId);
 

router.post("/changeStatus",authController.authAdmin,imageArtistController.changeStatus);
router.post("/updateData",authController.authAdmin,imageArtistController.updateData);



router.post("/getAllStatusOne",imageArtistController.getAllStatusOne);

router.post("/getAllKeyword",imageArtistController.getAllKeywordBased);
router.post("/getKeywordBased",imageArtistController.getKeywordBased);


module.exports = router;