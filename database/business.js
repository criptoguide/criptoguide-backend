const { json } = require("express");
const Business = require("../database/dbBusiness/businessModel");
const DB = require("./db.json");
const mongoose = require("mongoose");


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

        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }

}


const createBusiness =  (business) => {

    try {
        console.log('Creating new business...');
        const newBusiness = new Business({
            // add the rest of the schema  ** name, location, address, description, category, lat, long, poc, lang
            name: business.name,
            location: business.location,
            poc: business.poc,


        });

     return newBusiness.save().then(()=> console.log("sucess!!"));
    } catch (error) {
        return error;
    }


}

const deleteBusiness = async (businessId) => {
    try {

        await Business.findByIdAndDelete(businessId);

        return;
    } catch (error) {
        return error;
    }
}

module.exports = { getAllBusinesses, createBusiness, deleteBusiness }