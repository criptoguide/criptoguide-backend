// we'll be handling our api logic like transforming data structures and communicating with our Database Layer.

const Business = require("../database/dbBusiness/businessModel");


const getAllBusinesses = (filterParams) => {

    try {

        const allBusinesses = Businesses.getAllBusinesses(filterParams);
        return allBusinesses;
    } catch (error) {
        throw error;
    }

}


const createBusiness = async (business) => {
    try {
        console.log('Creating new business...');
        const newBusiness = new Business({
            business: {
                name: business.name,

          }

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