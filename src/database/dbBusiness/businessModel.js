const moongose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = moongose;

const BusinessSchema = new Schema({

  id: {
    type: String,
  },

  formatted_address: { type: String },
  formatted_phone_number: { type: String },
  reviews: { type: [] },
  rating: { type: Number },

  geometry: {
    location: [],
    viewport: { type: Object }
  },
  name: {
    type: String,
  },
  place_id: {
    type: String,
  },
  types: { type: [] },
  url: { type: String },
  photos: [],
  poc: {
    type: String,
    // required: true,
  },
  website: {type: String},
  published: {type: Boolean}


});

const Business = moongose.model('Business', BusinessSchema);

module.exports = Business;

