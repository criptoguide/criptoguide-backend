import { get } from "lodash";
import config from "../../config/default";
import { reIssueAccessToken } from "../services/session.service";
import { verifyJwt } from '../utils/jwt.utils';


const deserializeUser = async (
  req,
  res,
  next
) => {

  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");


  // if (!accessToken) {
  //   return next();
  // }
 if (!accessToken && !refreshToken) {
  return next();
 }

  const { decoded, expired } = verifyJwt(accessToken);


  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

   if ((expired && refreshToken) || (!accessToken && refreshToken)) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: config.cookieDomain, // set environment
        path: "/",
        sameSite: config.cookieSamSite, // lax ? dev - strict-prod
        secure: config.cookieSecure, // set environmet to true in prod
      });
    }

    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;