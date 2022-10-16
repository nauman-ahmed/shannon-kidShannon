const worldDataController = require('../controller/worldDataController');

const express = require("express");
const router = express.Router();


router.post("/getStateCity",worldDataController.getAllStatesCities);

module.exports = router;