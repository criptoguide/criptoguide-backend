//api/v1/business?location=${location}
const express = require("express");
const router = express.Router();
const businessController = require("../../controllers/businessController")


router.get("/", businessController.getAllBusinesses)



module.exports = router;

