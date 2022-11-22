const moongose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema} = moongose;

const UserSchema = new Schema({
    google: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      data: {
        type: Array,
      }
    },
});

const User = moongose.model('User', UserSchema);

module.exports = User;