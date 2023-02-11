//api/v1/business?location=${location}
const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController")
const passport = require("passport");
const { default: requireUser } = require("../middleware/requireUser");
const { default: requireUserAdmin } = require("../middleware/requireUserAdmin");


router.get("/",  businessController.getAllBusinesses)

router.get("/owner",requireUser,   businessController.getUserOwnBusiness); // required user



router.post("/create",requireUser,  businessController.createBusiness); // required user

router.delete("/delete/:id", businessController.deleteBusiness); // required user


//router.post("/business/exist", businessController.findBusinessById);

router.get("/busi",requireUserAdmin,  async function(req, res){ 
try {


    res.send("OK you are an admin hehe")
}catch(e){
    res.status(403).send(e, 'error not authenticated admin');
}
   

}); // required user

module.exports = router;

