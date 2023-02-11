
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

const publishBusiness = async (place_id, value) => {

    try {
        let res = await Business.findOneAndUpdate({ id: place_id }, { published: value });

        return res;
    } catch (e) {
        throw e;
    }


}


module.exports = {
    getUserAdminBusinesses,
    publishBusiness,

}