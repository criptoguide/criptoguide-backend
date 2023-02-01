
const mongoose = require("mongoose");
const config = require("../../config/default");


mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const mongoString = config.database_connection_string;

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true })
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

module.exports = {database}

