const moongose = require("mongoose");
const { Schema } = moongose;

const UserSchema = new Schema({

  id: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    minlength: 6,
  },
  data: {
    type: Array,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  }


});

const User = moongose.model('User', UserSchema);

module.exports = User;