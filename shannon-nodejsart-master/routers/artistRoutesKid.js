const artistController = require('../controller/artistController');
const authController =require('../controller/authController');

const express = require("express");
const router = express.Router();

router.post("/getAllClientKid",artistController.getAllClientKid);



module.exports = router;