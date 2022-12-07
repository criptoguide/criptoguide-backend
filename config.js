const env = process.env.NODE_ENV; // dev or prod
require("dotenv").config();

const dev = {
    passPortCallBackUrl:process.env.GOOGLE_CALLBACK_URL_DEV,

};

const prod = {
    passPortCallBackUrl:process.env.GOOGLE_CALLBACK_URL_PROD,

}

const config = {
    dev,
    prod
}

module.exports = config;