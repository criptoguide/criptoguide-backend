const { json } = require("express");
const Business = require("../database/dbBusiness/businessModel");
const DB = require("./db.json");


const getAllBusinesses = async (filterParams) => {

    try {

        let business = await Business.find();

        if (!business) {
            throw new Error;
        }

        if (filterParams.lang) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.lang))
        }//check 

        if (filterParams.location) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.location))
        }
        if (filterParams.country) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.country))
        }

        if (filterParams.category) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.category))
        }

        return business;

    } catch (error) {

        throw new Error({ status: 500, message: error })
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
        throw new Error({ status: 500, message: error })
    }
}


const deleteBusiness = async (businessId) => {
    try {

        await Business.findByIdAndDelete(businessId);

        return;
    } catch (error) {

    }
}

module.exports = { getAllBusinesses, createBusiness, deleteBusiness }