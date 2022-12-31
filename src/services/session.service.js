import Session from "../database/dbUsers/session.schema";






export async function createSession(userId, userAgent){
    const session = await Session.create({user: userId, userAgent});
    return session.toJSON();

}

