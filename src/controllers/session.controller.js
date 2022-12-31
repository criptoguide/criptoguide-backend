import { findAndUpdateUser, getGoogleOAuthTokens, getGoogleUser, validatePassword } from "../services/user.service";
import jwt from 'jsonwebtoken';
import { createSession } from "../services/session.service";
import { signJwt } from "../../utils/jwt.utils";


const accessTokenCookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
  };
  const refreshTokenCookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 year
  };


export async function createUserSessionHandler(req, res) {

    const user = await validatePassword(req.body);

    if(!user ){
        return res.status(401).send("Invalid email or password");
    }

    const session = await createSession(user._id, req.get("user-agent") || "");
    const accessToken = signJwt(
        {...user.toJSON(), session: session._id},
        {expiresIn: process.env.ACCESS_TOKEN_TLIMIT}
    );

    const refreshToken = signJwt(
        {...user.toJSON(), session: session._id},
        {expiresIn:process.env.REFRESH_TOKEN_TLIMIT}
    )

    // set a cookie 

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.send({accessToken, refreshToken});

}

export async function getUserSessionsHandler(req, res) {

}
export async function deleteSessionHandler(req, res) {

}






export async function googleOAuthHandler(req, res) {

    try {

        //get the code from the query
        const code = req.query.code;

        // get id and access token with the code
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });
        console.log({ id_token, access_token });

        // get user with tokens
        const googleUser = await getGoogleUser({ id_token, access_token });   //jwt.decode(id_token); other way to ge tthe user

        // CHECK THIS COS GOOGLE SHOULD NOT BE FPOUND BY EMAIL

        if (!googleUser.email) {
            return res.status(403).send("Google account is not verified");
        }
        //upsert the user
        const user = await findAndUpdateUser(
            {
                email: googleUser.email,
            },
            {
                email: googleUser.email,
                first_name: googleUser.name,
                picture: googleUser.picture,
            },
            {
                upsert: true,
                new: true,
            }
        )
        console.log("user created...")

        //create a session

        const session = await createSession(user._id, req.get("user-agent") || "");

        // create access and refresh token

        
        const accessToken = signJwt(
            {...user.toJSON(), session: session._id},
            {expiresIn: process.env.ACCESS_TOKEN_TLIMIT}
        );

        const refreshToken = signJwt(
            {...user.toJSON(), session: session._id},
            {expiresIn:process.env.REFRESH_TOKEN_TLIMIT}
        )
 

        // set a cookie 

        res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  
        // redirect back to client

        res.redirect(process.env.ORIGIN_URL);

    } catch (error) {
        console.log(error, "Failed to authorize Google user");
        return res.redirect(`${process.env.ORIGIN_URL}/oauth/error`);

    }


}