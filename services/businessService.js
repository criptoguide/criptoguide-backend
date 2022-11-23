// we'll be handling our api logic like transforming data structures and communicating with our Database Layer.

const Business = require("../database/dbBusiness/businessModel");
const BusinessDB = require("../database/business.js");

const getAllBusinesses = async (filterParams) => {

    try {

        const allBusinesses = await BusinessDB.getAllBusinesses(filterParams);
        return allBusinesses;
    } catch (error) {
        throw error;
    }

}

const createBusiness = async (business) => {
    try {
        console.log('Creating new business...');
        const newBusiness = new Business({
            // add the rest of the schema
            // add the rest of the schema
            // add the rest of the schema  ** name, location, address, description, category, lat, long, poc, lang
            name: business.name,
            location: business.location,


        });

        await newBusiness.save();
        return;

    } catch (error) {
        throw error;
    }
}




module.exports = {
    getAllBusinesses,
    createBusiness,
}