require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 8080,
    accessTokenTtl: process.env.ACCESS_TOKEN_LIMIT,
    refreshTokenTtl: process.env.REFRESH_TOKEN_LIMIT,
    saltWorkFactor: 10,//parseInt(process.env.SALT_WORK_FACTOR),
    cookieDomain: process.env.COOKIE_DOMAIN,
    cookieSamSite: process.env.COOKIE_SAMSITE,
    cookieSecure:process.env.COOKIE_SECURE,
    origin:  process.env.ORIGIN_URL,
    database_connection_string: process.env.DATABASE_URL,
     publicKey: process.env.PUBLIC_RSA_KEY,
     privateKey: process.env.PRIVATE_RSA_KEY,
     googleClientId: process.env.CLIENT_ID,
     googleClientIdSecret:process.env.CLIENT_SECRET,
     jwt_secret_key: process.env.JWT_SECRET_KEY,


}

