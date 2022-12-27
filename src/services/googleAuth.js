require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../database/dbUsers/userModel")


const client = new OAuth2Client(process.env.CLIENT_ID);

async function verifyGoogleToken(token) {

    try {

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID

      });
      
      const payload = await ticket.getPayload();
      return payload;

    } catch (error) {
      return {error: "Invalid user detected. Please try again" };
    }
  }



async function createNewUser(profile){
    let existingUser = await User.findOne({ 'google.id': profile.sub });
    // if user exists return the user 
    if (existingUser) {
      return {error: "User already exist"}
    }
  // if user does not exist create a new user 
  console.log('Creating new user...');
  const newUser = new User({
    method: 'google',
    google: {
      id: profile.sub,
      firstName: profile.firstName,
      lastName: profile.lastName,
      picture:profile.picture,
      email: profile.email,

    }
  });
  await newUser.save();
  return newUser;

  }
  module.exports = {verifyGoogleToken, createNewUser};