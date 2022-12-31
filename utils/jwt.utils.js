import jwt from 'jsonwebtoken';
import { defaults } from '../src/config';

const privateKey = defaults.privateKey;
const publicKey = defaults.publicKey;


export function signJwt(object, options){

    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256",
    });
}

export function verifyJwt(token) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }catch(e){
        console.log(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded:null,
        };
    }
}



