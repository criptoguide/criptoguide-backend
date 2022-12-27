const env = process.env.NODE_ENV; // dev or prod
require("dotenv").config();

const dev = {
    url:process.env.URL_DEV,

};

const prod = {
    url:process.env.URL_PROD,

}

const config = {
    dev,
    prod
}

module.exports = config;