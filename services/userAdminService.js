// we'll be handling our api logic like transforming data structures and communicating with our Database Layer.

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






module.exports = {
    getUserAdminBusinesses,

}