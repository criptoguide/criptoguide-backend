// we'll be handling our api logic like transforming data structures and communicating with our Database Layer.

const Business = require("../database/dbBusiness/businessModel");
const BusinessDB = require("../database/business.js");

const getAllBusinesses = async (filterParams) => {

    try {

        const allBusinesses = await BusinessDB.getAllBusinesses(filterParams);
        return allBusinesses;
    } catch (error) {
        throw new Error;
    }

}

const createBusiness = async (business) => {
    try {

        await BusinessDB.createBusiness(business);

    } catch (error) {
        throw new Error;
    }
}


const deleteBusiness = async (id) => {

    try {
        await BusinessDB.deleteBusiness(id);
    } catch (error) {
        throw new Error;
    }
}


module.exports = {
    getAllBusinesses,
    createBusiness,
    deleteBusiness
}