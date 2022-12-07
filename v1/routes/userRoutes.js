const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../../database/dbUsers/passportConfig")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const config = require("../../config");


router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      jwt.sign(
        { user: req.user },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            return res.json({
              token: null,
            });
          }
          res.json({
            token,
          });
        }
      );
    }
  );


// Redirect the user to the Google signin page 
router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] }),
    (req, res, next) => {

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      next();
   
    }
  );

  // Retrieve user data using the access token received , this was before using JWT 
  // router.get(
  //   "/google/callback",
  //   passport.authenticate("google", { session: false }),
  //   (req, res) => {
  //     res.redirect("/api/v1/auth/profile");
  //   }
  // );

// profile route after successful sign in

// router.get(
//     "/profile",
//     passport.authenticate("jwt",{ session: false }),
//     (req, res, next) => {
// res.send(`welcome, ${req.user.google.name.toUpperCase()}!`)

//     }
//   );


//logout
//implement logout here


module.exports = router;

