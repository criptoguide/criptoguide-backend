
const Business = require("../database/dbBusiness/businessModel");
const adminDB = require("../database/admin");

const getUserAdminBusinesses = async (filterParams) => {

    try {

        const allUserAdminBusinesses = await adminDB.getUserAdminBusinesses(filterParams);
        return allUserAdminBusinesses;
    } catch (error) {
        throw error;
    }

}

const publishBusiness = async (place_id) => {


    try {
        let res = await Business.findByIdAndUpdate(place_id, { published: true });

        return res;
    } catch (e) {
        throw error;
    }


}


module.exports = {
    getUserAdminBusinesses,
    publishBusiness,

}