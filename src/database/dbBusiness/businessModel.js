const moongose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = moongose;

const BusinessSchema = new Schema({

  id: {
    type: String,
  },

  formatted_address: { type: String },
  geometry: {
    location: [],
    viewport: {type: Object}
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
  }




  // AddressComponent[];
  //   adr_address:           string;
  //   formatted_address:     string;
  //   geometry:              Geometry;
  //   icon:                  string;
  //   icon_background_color: string;
  //   icon_mask_base_uri:    string;
  //   name:                  string;
  //   place_id:              string;
  //   plus_code:             PlusCode;
  //   reference:             string;
  //   types:                 string[];
  //   url:                   string;
  //   utc_offset:            number;
  //   html_attributions:     any[];
  //   utc_offset_minutes:    number;

  // id: {
  //   type: String,
  // },
  // lang: {
  //   type: String,
  // },
  // translation:[
  // {
  //   lang: String,
  //     name: String,
  //     description: String,
  //   }
  //     ],
  // name: {
  //   type: String,
  //   required: true,
  // },
  // location: {
  //   type: String,
  //   required: true,
  // },
  // address: {
  //   type: String,
  // },
  // description: {
  //   type: String,
  // },
  // category: {
  //   type: String,

  // },
  // lat: {
  //   type: Number,
  // },
  // long: {
  //   type: Number,
  // },
  // poc: {
  //   type: String,
  //   required: true,
  // }

});

const Business = moongose.model('Business', BusinessSchema);

module.exports = Business;


// export interface Business_type {
//   address_components:    AddressComponent[];
//   adr_address:           string;
//   formatted_address:     string;
//   geometry:              Geometry;
//   icon:                  string;
//   icon_background_color: string;
//   icon_mask_base_uri:    string;
//   name:                  string;
//   place_id:              string;
//   plus_code:             PlusCode;
//   reference:             string;
//   types:                 string[];
//   url:                   string;
//   utc_offset:            number;
//   html_attributions:     any[];
//   utc_offset_minutes:    number;
// }

// export interface AddressComponent {
//   long_name:  string;
//   short_name: string;
//   types:      string[];
// }

// export interface Geometry {
//   location: Location;
//   viewport: Viewport;
// }

// export interface Location {
//   lat: number;
//   lng: number;
// }

// export interface Viewport {
//   south: number;
//   west:  number;
//   north: number;
//   east:  number;
// }

// export interface PlusCode {
//   compound_code: string;
//   global_code:   string;
// }