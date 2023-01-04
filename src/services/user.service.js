import axios from 'axios';
import qs from 'qs';
import User from '../database/dbUsers/userModel';
import { omit } from "lodash";


export async function createUser(input ) {
    try {
      const user = await User.create(input);
  
      return omit(user.toJSON(), "password");
    } catch (e) {
      throw new Error(e);
    }
  }

export async function validatePassword({
    email,
    password,
}) {
    const user = await User.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) return false;
    return omit(user.toJSON(), "password");

};

export async function findUser(query) {
    return User.findOne(query).lean();
  }

export async function getGoogleOAuthTokens({ code }) {

    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: "authorization_code",
    };

    try {

        const res = await axios.post(
            url,
            qs.stringify(values),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return res.data;

    } catch (error) {
        console.log(error, "Failed to fetch Google Oauth Tokens");
        throw new Error(error.message)

    }

}


export async function getGoogleUser({ id_token, access_token }) {


    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`
                }
            })
        return res.data;
    } catch (error) {
        console.log(error, "Error fetching google user")
        throw new Error;
    }

}


export async function findAndUpdateUser(query,
    update,
    options) {
    return User.findOneAndUpdate(query, update, options);

}

