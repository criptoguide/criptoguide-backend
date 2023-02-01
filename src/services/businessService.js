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


const getOwnBusiness = async(id) => {

try{

    let ownerBusinesess = Business.find({poc:id})

    return ownerBusinesess;
    
}catch(error){
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } })

}


}


const createBusiness = (business) => {

    try {

        return BusinessDB.createBusiness(business);

    } catch (error) {
        throw error;
    }

}


const deleteBusiness =  (params) => {

    try {
         BusinessDB.deleteBusiness(params);
    } catch (error) {
        throw error;

    }
}


module.exports = {
    getAllBusinesses,
    getOwnBusiness,
    createBusiness,
    deleteBusiness
}