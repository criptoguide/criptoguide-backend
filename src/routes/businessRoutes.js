//api/v1/business?location=${location}
const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController")
const passport = require("passport");
const { default: requireUser } = require("../../middleware/requireUser");


router.get("/",  businessController.getAllBusinesses)

router.get("/owner",requireUser,   businessController.getUserOwnBusiness); // required user



router.post("/create",requireUser,  businessController.createBusiness); // required user

router.delete("/delete/:id", businessController.deleteBusiness); // required user

module.exports = router;

