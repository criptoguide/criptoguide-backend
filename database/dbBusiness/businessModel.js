const moongose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema} = moongose;

const BusinessSchema = new Schema({
    business: {
      id: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      description: {
        type: String,
      },
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
      poc: {
        type: Number,
      }
    },
});

const Business = moongose.model('Business', BusinessSchema);

module.exports = Business;