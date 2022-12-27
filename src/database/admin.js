const Business = require("../database/dbBusiness/businessModel");


const getUserAdminBusinesses = async (filterParams) => {

    try {

        let business = await Business.find();

        if (!business) {
            throw new Error;
        }

        if (filterParams.userPOC) {
            return business.filter((bs) => bs.poc === filterParams.userPOC );
        }

        return business;

    } catch (error) {
        throw error;
    }

}

module.exports = { getUserAdminBusinesses};