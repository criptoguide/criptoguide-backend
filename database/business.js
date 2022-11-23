const { json } = require("express");
const Business = require("../database/dbBusiness/businessModel");
const DB = require("./db.json");


const getAllBusinesses = async (filterParams) => {

    try {

        let business = await Business.find();

        if (!business) {
            throw error;
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

        throw ({ status: 500, message: error })
    }

}
module.exports = { getAllBusinesses }