//api/v1/business?location=${location}
const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController")
const passport = require("passport");

router.get("/", businessController.getAllBusinesses)


router.post("/create",passport.authenticate("jwt", { session: false }), businessController.createBusiness);

router.delete("/delete/:id",passport.authenticate("jwt", { session: false }), businessController.deleteBusiness);

module.exports = router;

