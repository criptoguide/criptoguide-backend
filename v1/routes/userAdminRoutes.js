
const express = require("express");
const passport = require("passport");
require("../../database/dbUsers/passportConfig")
const router = express.Router();
const User = require("../../database/dbUsers/userModel");




router.put("/add", passport.authenticate("jwt", { session: false }),

    async (req, res, next) => {

        try {
            // Extract userem> 

            let existingUser = await User.findOneAndUpdate({ 'google.id': req.user.google.id }, { 'google.data': req.body.data }, { new: true });
            // if user exists return the user with the updated data
            return existingUser

        } catch (error) {
            res.status(400).send({ error: error.message })
        }

    }
);




module.exports = router;