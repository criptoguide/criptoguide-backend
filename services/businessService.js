// we'll be handling our api logic like transforming data structures and communicating with our Database Layer.
const Businesses = require("../database/business")


const getAllBusinesses = (filterParams) => {

    try {

        const allBusinesses = Businesses.getAllBusinesses(filterParams);
        return allBusinesses;
    } catch (error) {
        throw error;
    }


}




module.exports = {
    getAllBusinesses
}