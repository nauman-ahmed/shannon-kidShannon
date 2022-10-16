const imageArtistController = require('./../controller/imageOfArtistController');
const express = require("express");
const router = express.Router();


router.post("/getAllKeywordKid",imageArtistController.getAllKeywordBasedKid);
router.post("/getKeywordBasedKid",imageArtistController.getKeywordBasedKid);
router.post("/getAllStatusOneKid",imageArtistController.getAllStatusOneKid);

module.exports = router;