import { findAndUpdateUser, getGoogleOAuthTokens, getGoogleUser, validatePassword } from "../services/user.service";
import jwt from 'jsonwebtoken';
import { createSession, findSessions, updateSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "../../config/default";




const accessTokenCookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",// SET TO CONFIG FOR PROD
    path: "/",
    sameSite: "strict", // strict in prod  lax in dev ? 
    secure: config.cookieSecure, // env-dev =false) | env-prod = true
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
        {...user, session: session._id},
        {expiresIn: config.accessTokenTtl}
    );

    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn:config.refreshTokenTtl}
    )

    // set a cookie 

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.send({accessToken, refreshToken});

}

export async function getUserSessionsHandler(req, res) {
  

  const userId = res.locals.user._id;
  
    const sessions = await findSessions({ user: userId, valid: true });
  
    return res.send(sessions);
  }

  
  
export async function deleteSessionHandler(req, res) {

    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });
  
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    // -1 setting up request as expired and re-requesting before display again. 
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    res.send({
        accessToken: null,
        refreshToken: null,
      });
      console.log("SESSION CLSOED OK")
  return res.end();
}






export async function googleOAuthHandler(req, res) {

    try {

        //get the code from the query
        const code = req.query.code;

        // get id and access token with the code
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    
        // get user with tokens
        const googleUser = await getGoogleUser({ id_token, access_token });   //jwt.decode(id_token); other way to ge tthe user

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
                name: googleUser.name,
                picture: googleUser.picture,
       
            },
            {
                upsert: true,
                new: true,
            }
        )
        console.log("user created/updated...")

        //create a session
        const session = await createSession(user._id, req.get("user-agent") || "");
        // create access and refresh token
        
        const accessToken = signJwt(
            {...user.toJSON(), session: session._id},
            {expiresIn: config.accessTokenTtl}
        );

        const refreshToken = signJwt(
            {...user.toJSON(), session: session._id},
            {expiresIn:config.refreshTokenTtl}
        )
 

        // set a cookie 

        res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  
        // redirect back to client

        //res.redirect(process.env.ORIGIN_URL);
       // res.send({"message": "deliverResult", result: 'user update/created' })
        res.send("<script>window.close();</script > ");

    } catch (error) {
        console.log(error, "Failed to authorize Google user");
        return res.redirect(`${config.origin}/oauth/error`);

    }


}