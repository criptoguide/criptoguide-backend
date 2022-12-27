
const mongoose = require("mongoose");

//
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
//
require('dotenv').config();

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true })
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

module.exports = {database}

