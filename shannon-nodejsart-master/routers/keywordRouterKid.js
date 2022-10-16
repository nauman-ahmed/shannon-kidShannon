const keywordController = require('../controller/keywordController');


const express = require("express");
const router = express.Router();

router.post("/getAllClientKid",keywordController.getAllClientKid);
router.post("/getKeywordKidShanon",keywordController.getKeywordKidShanon);

module.exports = router;