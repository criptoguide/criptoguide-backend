const moongose = require("mongoose");
const { Schema } = moongose;

const SessionSchema = new Schema({

  body: {
  email: {
    type: String,
    required_error: "Email is required"
    
  },
  },
  password: {
    type: String,
    required_error: "Password is required",

},

});

const Session = moongose.model('SessionSchema', SessionSchema);

module.exports = Session;