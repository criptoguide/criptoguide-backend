import { get } from "lodash";
import { signJwt, verifyJwt } from "../../utils/jwt.utils";
import { defaults } from "../config";
import SessionModel from "../database/dbSessions/sessions.model";
import { findUser } from "./user.service";




export async function createSession(userId, userAgent) {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();

}


export async function findSessions(query) {


    return SessionModel.find(query).lean();
}



export async function reIssueAccessToken({
    refreshToken,
}) {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: defaults.accessTokenTtl } // 15 minutes
    );

    return accessToken;
}

export async function updateSession(query, update) {
    return SessionModel.updateOne(query, update);
}