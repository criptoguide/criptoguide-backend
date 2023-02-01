
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