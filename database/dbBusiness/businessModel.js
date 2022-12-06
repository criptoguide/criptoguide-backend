const moongose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = moongose;

const BusinessSchema = new Schema({

  id: {
    type: String,
  },
  lang: {
    type: String,
  },
  translation:[
  {
    language: String,
      name: String,
      description: String,
    }
      ],
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,

  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  poc: {
    type: String,
    required: true,
  }

});

const Business = moongose.model('Business', BusinessSchema);

module.exports = Business;