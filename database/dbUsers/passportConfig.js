const GoogleStrategy = require("passport-google-oauth2").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const config = require("../../config");
const User = require("./userModel");
require("dotenv").config();


module.exports = (passport) => {


    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `${config[process.env.NODE_ENV].url}/api/v1/auth/google/callback`,
        passReqToCallback   : true,
        proxy:true
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ 'google.id': profile.id });
            // if user exists return the user 
            if (existingUser) {
              return done(null, existingUser);
            }
            // if user does not exist create a new user 
            console.log('Creating new user...');
            const newUser = new User({
              method: 'google',
              google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
              }
            });
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
      }
    ));

      passport.use(
        new JwtStrategy(
          {
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: process.env.JWT_SECRET_KEY, 
          },
          async (jwtPayload, done) => {
            try {
             // Extract userem> 
              const user = jwtPayload.user;
              let existingUser = await User.findOne({'google.id': jwtPayload.user.google.id })             
              return    done(null, existingUser)
          
            } catch (error) {
              done(error, false);
            }
          }
        )
      );


}