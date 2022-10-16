const bipocController = require('../controller/bipocController');

const express = require("express");
const router = express.Router();


router.get("/getAllBlack",bipocController.getAllBipocArtistBlack);
router.get("/getAllAsian",bipocController.getAllBipocArtistAsian);
router.get("/getAllLatino",bipocController.getAllBipocArtistLatino);
router.get("/getAllCentralAsia",bipocController.getAllBipocArtistCentralAsia);
router.get("/getAllIndigenous",bipocController.getAllBipocArtistIndigenous);

module.exports = router;