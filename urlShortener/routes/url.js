const express = require("express");
const {handleGenerateNewShortID , handleGetAnalytics} = require("../controller/url");

const router = express.Router();

router.post("/" , handleGenerateNewShortID);
router.get("/analytics/:shortId" , handleGetAnalytics );

module.exports = router ;

