const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
import {verifyGoogleToken,  createNewUser } from "../services/googleAuth";




// SIGN UP WITH GOOGLE 

router.post("/google/signup", async (req, res) => {

  try {
if(req.body.credential){

  const verificationResponse = await verifyGoogleToken(req.body.credential);
  if(verificationResponse.error){
    return res.status(400).json({
      message: verificationResponse.error,
    });


  }
const profile = verificationResponse;
if(profile){
let response = createNewUser(profile);

if(response.error){
  return res.status(500).json({
    message: response.error,
  });
}
}
res.status(201).json({
  message: "Signup was successful",
  user: {
    firstName: profile?.given_name,
    lastName: profile?.family_name,
    picture: profile?.picture,
    email: profile?.email,
    token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    }),
  },
});

}




  }catch(e){
res.status(500).json({
  message: "An error ocurred. Registration Failed.",
  error: e,
})
  }
})




module.exports = router;

